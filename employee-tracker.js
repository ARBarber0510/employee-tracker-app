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
    var query = "SELECT * FROM employee"

    connection.query(query, function(err, res) {

        if (err) throw err;

        console.table(res);

        runSearch();
    });
}

function empRoleSearch() {
        connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
        function(err, res) {
            if (err) throw err
            console.table(res)
            runSearch();
        });
}

function empDeptSearch() {
    connection.query("SELECT employee.first_name, employee.last_name, department.dept_name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        runSearch();
    });
}

var roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

var managerArr = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }
    })
    return managerArr;
}

function addEmployee() {
    inquirer
    .prompt([
        {
            name:"firstName",
            type:"input",
            message: "Enter employee's first name:"
        },
        {
            name:"lastName",
            type:"input",
            message: "Enter employee's last name:"
        },
        {
            name:"empDept",
            type:"input",
            message: "Enter employee's department:"
        },
        {
            name:"empRole",
            type:"input",
            message: "Enter employee's role:"
        }, 
        {
            name: "choice",
            type: "rawlist",
            message: "Select managers name:",
            choices: selectManager()
        }
    ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
        },     
        function(err) {
            if (err) throw err
            console.table(val)
            runSearch()
        })
    })
}

