const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        port: 3001,
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
            name: "choice",
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