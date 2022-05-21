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
    console.log('Connected to the employee database.')
);


// connect to the mysql server and sql database
db.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    prompt();
});

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
                "Exit"]
        })
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
                    exit();
                }
        })
};

function viewAllDepartments() {
    db.query("SELECT * FROM department",
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
};

function viewAllRoles() {
    db.query("SELECT * FROM role",
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
};

function viewAllEmployees() {
    db.query("SELECT * FROM employee",
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
};

function addADepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What department would you like to add?"
        }
    ]).then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                prompt();
            }
        )
    })
};

function addARole() { 
    db.query("SELECT role.title AS title, role.salary AS salary FROM role",   function(err, res) {
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
  
          } 
      ]).then(function(res) {
          db.query(
              "INSERT INTO role SET ?",
              {
                title: res.title,
                salary: res.salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  prompt();
              }
          )
  
      });
    });
};

var employeeArr = [];
function selectEmployee() {
  db.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      employeeArr.push(res[i].first_name);
    }

  })
  return employeeArr;
}

var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

function addAnEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter the employee's first name "
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter the employee's last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats the employee's managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
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
          console.table(val)
          prompt()
      })

  })
};

// function updateEmployeeRole() {
//     db.query("SELECT employee.first_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
//     // console.log(res)
//      if (err) throw err
//      console.log(res)
//     inquirer.prompt([
//           {
//             name: "firstName",
//             type: "rawlist",
//             choices: function() {
//               var firstName = [];
//               for (var i = 0; i < res.length; i++) {
//                 firstName.push(res[i].first_name);
//               }
//               return firstName;
//             },
//             message: "What is the employee's first name? ",
//           },
//           {
//             name: "role",
//             type: "rawlist",
//             message: "What is the employees new role? ",
//             choices: selectRole()
//           },
//       ]).then(function(val) {
//         var roleId = selectRole().indexOf(val.role) + 1
//         db.query("UPDATE employee SET WHERE ?", {
        
//           first_name: val.firstName
           
//         }, 
//         {
//           role_id: roleId
           
//         }, 
//         function(err){
//             if (err) throw err
//             console.table(val)
//             prompt()
//         })
  
//     });
//   });

// };

// const updateEmployeeRole = () => {
//     let upEmpRo =       `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
//                     FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
//     db.promise().query(upEmpRo, (error, response) => {
//       if (error) throw error;
//       let employeeNamesArray = [];
//       response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

//       let sql =     `SELECT role.id, role.title FROM role`;
//       connection.promise().query(sql, (error, response) => {
//         if (error) throw error;
//         let rolesArray = [];
//         response.forEach((role) => {rolesArray.push(role.title);});

//         inquirer
//           .prompt([
//             {
//               name: 'chosenEmployee',
//               type: 'list',
//               message: 'Which employee has a new role?',
//               choices: employeeNamesArray
//             },
//             {
//               name: 'chosenRole',
//               type: 'list',
//               message: 'What is their new role?',
//               choices: rolesArray
//             }
//           ])
//           .then((answer) => {
//             let newTitleId, employeeId;

//             response.forEach((role) => {
//               if (answer.chosenRole === role.title) {
//                 newTitleId = role.id;
//               }
//             });

//             response.forEach((employee) => {
//               if (
//                 answer.chosenEmployee ===
//                 `${employee.first_name} ${employee.last_name}`
//               ) {
//                 employeeId = employee.id;
//               }
//             });

//             let sqls =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
//             connection.query(
//               sqls,
//               [newTitleId, employeeId],
//               (error) => {
//                 if (error) throw error;
//                 console.log(chalk.greenBright.bold(`====================================================================================`));
//                 console.log(chalk.greenBright(`Employee Role Updated`));
//                 console.log(chalk.greenBright.bold(`====================================================================================`));
//                 promptUser();
//               }
//             );
//           });
//       });
//     });
// };