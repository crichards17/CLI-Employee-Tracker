const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  // host: process.env.DB_HOST,
  // port: process.env.PORT || 3306,
  // user: process.env.USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE_NAME
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Squ3al?!",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  promptNext();
});

function promptNext() {
  inquirer.prompt({
      name: "nextAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employees",
        "Add Departments",
        "Add Roles",
        "Update Employee Role",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.nextAction) {
        case "View All Employees":
          searchAllEmployees();
          break;
        case "View All Departments":
          searchDepartment();
          break;
        case "View All Roles":
          searchRole();
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "Add Departments":
          addDeptartment();
          break;
        case "Add Roles":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};

function searchAllEmployees() {
  connection.query(
    "SELECT employee.employeeID, employee.firstName, employee.lastName, role.title, department.name AS department, role.salary, CONCAT(manager.firstName, ' ', manager.lastName) AS manager FROM employee LEFT JOIN role on employee.roleID = role.roleID LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.managerID = employee.managerID;",
    function(err, res) {
      if (err) throw err;
      console.table(res);
      promptNext();
    }
  );
};

function searchDepartment() {
  connection.query("SELECT * from department", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptNext();
  });
};

function searchRole() {
  connection.query("SELECT * from role", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptNext();
  });
};

function updateEmpManager (empID, roleID){
connection.query("UPDATE employee SET roleID = ? WHERE employeeID = ?", [roleID, empID])
};

function addEmployee() {
  const questions = [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName"
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName"
    },
    {
      type: "input",
      message: "What is the employee's role?",
      name: "roleID"
    },
    {
      type: "input",
      message: "Who is the employee's manager?",
      name: "managerID"
    }
  ];
  inquirer.prompt(questions).then(function(answer) {
    connection.query(
      "INSERT INTO employee SET ?",
      {
        firstName: answer.firstName,
        lastName: answer.lastName,
        roleID: answer.roleID,
        managerID: answer.managerID,
      },
      function(error) {
        if (error) throw error;
        updateEmpManager(answer.roleID, answer.managerID);
        searchAllEmployees();
      }
    );
  });
};

function addDeptartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the new department?",
      name: "department"
    })
    .then(function(answer) {
        console.log(answer.department);
      connection.query("INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function(err, res) {
          if (err) throw err;
          promptNext();
        });
    });
};

function addRole() {
  const questions = [
    {
      type: "input",
      message: "What role would you like to add?",
      name: "roleTitle"
    },
    {
      type: "input",
      message: "What is the department for the new role?",
      name: "department"
    },
    {
      type: "input",
      message: "What is the role's salary?",
      name: "salary"
    }
  ];

  inquirer.prompt(questions).then(function(answer) {
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answer.roleTitle,
        department_id: answer.department,
        salary: answer.salary
      },
      function(error, res) {
        if (error) throw error;
        promptNext();
      }
    );
  });
};



function updateEmployeeRole() {
  const questions = [
    {
      type: "input",
      message: "What is the employee number of the employee you would like to update?",
      name: "employeeID"
    },
    {
      type: "input",
      message: "Which Role ID should the user have?",
      name: "newRole",
    },
  ];

  inquirer.prompt(questions).then(function(answer) {
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          roleID: answer.newRole,
        },
        {
          employeeID: answer.employeeID,
        },
      ],
      function(error, res) {
        if (error) throw error;
        promptNext();
      }
    );
  });
};