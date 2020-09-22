var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Sea91Mar0510!",
    database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by role",
          "View all employees by department",
          "Add employee",
          "Add role",
          "Add department",
          "Update employee role",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;
  
        case "View all employees by role":
          empRoleSearch();
          break;
  
        case "View all employees by department":
          empDeptSearch();
          break;
  
        case "Add employee":
          addEmployee();
          break;

        case "Add role":
            addRole();
            break;

        case "Add department":
            addDept();
            break;
        
        case "Update employee role":
            updateEmpRole();
            break;
  
        case "exit":
          connection.end();
          break;
        }
      });
}

function viewAllEmployees() {
    var query = "SELECT * FROM employees"

    connection.query(query, function(err, res) {

        if (err) throw err;

        console.table(res);

        runSearch();
    });
}

function empRoleSearch() {
    inquirer
    .prompt({
        name: "role",
        type: "input",
        message: "Please enter the role you'd like to review"
    })
    .then(function(answer) {
        console.log(answer.role);
        connection.query("SELECT * FROM employee ", {role: answer.role}, function(err, res) {
            console.log(
                "First Name: " +
                res[0].first_name +
                "Last Name: " +
                res[0].last_name +
                "Role: " +
                res[0].role_id
            );
            runSearch();
        });
    });
}

