// requiring in the npm functionality of mysql2, inquirer, and console.table

const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'root',
        database: 'employeedb'
    },
    // console.log('Connected to the employee database.')
);


// Connect to the mysql server and sql database
db.connect(function (err) {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    prompt();
});

// This function initiates the choice selection for database manipulation
function prompt() {
    inquirer
        .prompt({
            type: "list",
            name: "choices",
            message: "Please choose an option:",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Exit"
            ]
        })
        // ...and then redirects the choice to appropriate function associated with the choice
        .then ((answers) => {
            
            const {choices} = answers;

                if (choices === "View All Departments") {
                    viewAllDepartments();
                }

                if (choices === "View All Roles") {
                    viewAllRoles();
                }

                if (choices === "View All Employees") {
                    viewAllEmployees();
                }

                if (choices === "Add a Department") {
                    addADepartment();
                }

                if (choices === "Add a Role") {
                    addARole();
                }

                if (choices === "Add an Employee") {
                    addAnEmployee();
                }

                if (choices === "Update an Employee Role") {
                    updateEmployeeRole();
                }

                if (choices === "Exit") {
                    console.log('Be well!')
                    setTimeout((function() {
                        return process.exit(22);
                    }), 1000);
                }
        })
};

// vv This function shows the table of all the departments in the database vv

function viewAllDepartments() {
    db.query("SELECT * FROM department",
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
};

// vv This function shows the table of all the roles in the database vv

function viewAllRoles() {
    db.query("SELECT * FROM role",
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
};

// vv This function shows the table of all the employees in the database vv

function viewAllEmployees() {
    db.query("SELECT * FROM employee",
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
};

// vv This function allows the user the ability to add a new department into the database vv

function addADepartment() { 
    // inquirer asks for the new department name
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What department would you like to add?"
        }
    ])
    // ...then the name is inserted into the department table in column 'name'
    .then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                // ...and the console.table shows the user exactly what he or she is adding
                console.table(res);
                // ...before taking us back to the top menu
                prompt();
            }
        )
    })
};

// vv This function allows the user the ability to add a new role into the database vv

function addARole() { 
    // inquirer asks for the new role name- but also the salary for that role
    // db.query("SELECT role.title FROM role JOIN department ON role.department_id = department.id",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is the role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
  
          },
          {
            name: "department",
            type: "list",
            message: "What is the department for this role?",
            choices: selectDepartment()
  
          } 
      ])
      // ...then the name is inserted into the role table in columns 'title' and 'salary'
      .then(function(res) {
        var departmentId = selectRole().indexOf(res.department) + 1
          db.query(
              "INSERT INTO role SET ?",
              {
                title: res.title,
                salary: res.salary,
                department_id: departmentId
              },
              function(err) {
                  if (err) throw err
                  // ...and the console.table shows the user exactly what he or she is adding
                  console.table(res);
                  // ...before taking us back to the top menu
                  prompt();
              }
          )
  
      });
    };
;

//  vv This small function iterates and distributes all of the department names into the array 'departmentArr'

var departmentArr = [];
function selectDepartment() {
  db.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      departmentArr.push(res[i].name);
    }

  })
  return departmentArr;
};

//  vv This small function iterates and distributes all of the employees' first names into the array 'employeeArr'

var employeeArr = [];
function selectEmployee() {
  db.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      employeeArr.push(res[i].first_name);
    }

  })
  return employeeArr;
};

//  vv This small function iterates and distributes all of the employees' roles into the array 'roleArr'

var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
};

//  vv This small function iterates and distributes all of the managers' first names into the array 'managerArr'

var managerArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerArr.push(res[i].first_name);
    }

  })
  return managerArr;
};

// vv This function allows the user the ability to add a new employee into the database vv


function addAnEmployee() { 
    // inquirer asks for the new employee's first name
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter the employee's first name "
        },
        // ...and last name...
        {
          name: "lastName",
          type: "input",
          message: "Enter the employee's last name "
        },
        // ...and lists the choices for roles from the role array (accounting for any additions to the roles)...
        {
          name: "role",
          type: "list",
          message: "What is the employee's role? ",
          choices: selectRole()
        },
        // ...and lists the choices for namagers from the manager array (accounting for any additions to the managers)...
        {
            name: "choice",
            type: "rawlist",
            message: "Whats the employee's managers name?",
            choices: selectManager()
        }
    ])
    // ...then the new employee information is inserted into the employee table in columns 'first_name' and 'last_name' 'role_id' and 'manager_id'
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      db.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          // ...and the console.table shows the user exactly what he or she is adding...
          console.table(val)
            // ...before taking us back to the top menu
          prompt()
      })

  })
};

// vv This function allows the user the ability to change an aemployee's role within the existing table in the database vv

function updateEmployeeRole() {
    db.query("SELECT employee.first_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
    // inquirer asks for the first name of the employee whose role is changing from the generated list of emplyee first names
    inquirer.prompt([
          {
            name: "firstName",
            type: "list",
            choices: function() {
              var firstName = [];
              for (var i = 0; i < res.length; i++) {
                firstName.push(res[i].first_name);
              }
              return firstName;
            },
            message: "What is the employee's first name? ",
          },
          // ...and then asks for the role the employee is changing into from the generated list of roles...
          {
            name: "role",
            type: "list",
            message: "What is the employees new role? ",
            choices: selectRole()
          },
      ])
      // ...then the new employee role information is inserted into the employee table in column'role_id'
      .then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        // ...but I am unclear on why there needs to be a .promise() before the query
        db.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE first_name = '${val.firstName}'`)
        .then(console.log("Update Successful!"))
        .catch(err => console.log(err))
        // ...again, the console.table shows the user exactly what he or she is adding...
            console.table(val)
            // ...before taking us back to the top menu
            prompt()
        })
  
    });
  };
;
