var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
// const { fetchAsyncQuestionPropertyQuestionProperty } = require("inquirer/lib/utils/utils");

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
// View all employees currently entered. 
function viewAllEmployees() {
    var query = "SELECT * FROM employee"

    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i =0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name);
        }
        runSearch();
    });
}
// Want to search for employee based on role. Currently showing each employee and their roles. 
// Want to include ""
function empRoleSearch() {
        connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
        function(err, res) {
            if (err) throw err
            console.table(res)
            runSearch();
        });
}

// Want to search employees based on department.
function empDeptSearch() {
    connection.query("SELECT employee.first_name, employee.last_name, department.dept_name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        runSearch();
    });
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
            name:"empRole",
            type:"input",
            message: "Enter employee's role ID:"
        }
    ]).then(function(answer) {

        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.empRole,
            manager_id: answer.empMgr
        }, 
        function(err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
        
    });
};

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Please enter role name:",

            },
            {
                name: "salary",
                type: "input",
                message: "Please enter role salary:"
            },
            {
                name: "deptId",
                type: "input",
                message: "Please enter department ID:"
            }
        ])
        .then(function (answer) {

            connection.query("INSERT INTO role SET ?", 
            {
               title: answer.title, 
               salary: answer.salary, 
               department_id: answer.deptId
            
            }, function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            })
    });
};

function addDept() {


    inquirer.prompt([
        {
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"
        },
        {
            name: "deptId",
            type: "input",
            message: "Please enter department ID:"
        }
    ]).then(function(answer){

        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            runSearch();
        });
    });
}
function updateEmpRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "empUpdate"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
        // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
        //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
        //console.log(query);
  
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.empUpdate],function(err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        });
      });
  }