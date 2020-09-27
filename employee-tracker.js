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
connection.connect(function (err) {
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
                "View roles",
                "View departments",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View departments":
                    viewAllDepts();
                    break;

                case "View roles":
                    viewAllRoles();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;
                
                case "Add department":
                    addDept();
                    break;

                case "Add role":
                    addRole();
                    break;
                
                case "Add employee":
                    addEmployee();
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

// Want to search employees based on department.
function viewAllDepts() {
    var query = "SELECT * FROM department"

    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | Name: " + res[i].dept_name);
        }
        runSearch();
    });
}

function viewAllRoles() {
    var query = "SELECT * FROM role"

    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Role ID: " + res[i].id + " | Title: " + res[i].title + " | Salary: " + res[i].salary + " | Department ID: " + res[i].department_id);
        }
        runSearch();
    });
}

// View all employees currently entered. 
function viewAllEmployees() {
    var query = "SELECT * FROM employee"

    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name);
        }
        runSearch();
    });
}

function addDept() {
    inquirer.prompt([
        {

            type: "input",
            message: "Please enter department name:",
            name: "deptName"
        }
    ]).then(function (answer) {

        connection.query("INSERT INTO department SET ?",
            {
                dept_name: answer.deptName
            },
            function (err, res) {
                if (err) throw err;
                console.table(res)
                runSearch();
            })
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

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter employee's first name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee's last name:"
            },
            {
                name: "empRole",
                type: "input",
                message: "Enter employee's role ID:"
            }
        ]).then(function (answer) {

            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.empRole,
                    manager_id: answer.empMgr
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSearch();
                });

        });
};

// Write functions to  
function updateEmpRole() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].first_name + " " + res[i].last_name);
                        }
                        return choiceArray;
                    },
                    message: "Please select the employee you wish to update:"
                },
                {
                    type: "input",
                    message: "Please enter the employee's new role:",
                    name: "updateRole"
                }
            ])
            .then(function (answer) {

                connection.query("UPDATE employee SET ?",
                    {
                        role_id: answer.updateRole,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        runSearch();
                    });
            });
    });
};
