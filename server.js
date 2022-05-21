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
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is the roles title?"
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
