const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nakkyj-kowHe8-kipb1j",
  database: "business_db",
});
const department = db.query(
  "SELECT * FROM department",
  function (err, results) {
    if (err) {
      console.log(err);
    }
    return results;
  }
);

const role = db.query("SELECT * FROM role", function (err, results) {
  if (err) {
    console.log(err);
  }
  return results;
});

const employee = db.query("SELECT * FROM employee", function (err, results) {
  if (err) {
    console.log(err);
  }
  return results;
});

const promptQuestions = [
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "depName",
  },
  {
    type: "input",
    message: "What is the name of the new role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the salary of this role?",
    name: "roleSalary",
  },
  {
    type: "list",
    message: "Which department does this role belong to?",
    name: "roleDep",
    choices: department,
  },
  {
    type: "input",
    message: "What is the first name of the new employee?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the last name of the new employee?",
    name: "lastName",
  },
  {
    type: "list",
    message: "What is the new employee's role?",
    name: "empRole",
    choices: role,
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager",
    choices: [employee, null],
  },
];

function showDepartments() {
  console.log(department);
}
function showRoles() {
  //retrieve roles table from database and return it
  console.log(role);
}
function showEmployees() {
  //retrieve employees table from database and return it.
  console.log(employee);
}
function promptForDepartment() {
  // inquirer.prompt()
  inquirer.prompt(promptQuestions[0]).then((response) => {
    db.query(
      `INSERT INTO department (name) VALUES (${response})`,
      function (err, results) {
        console.log("Success!" + results);
      }
    );
  });
}
// promptForRole(){};
// promptForEmployee(){};
// promptForEmployeeAndRole(){};

const question = {
  type: "list",
  message: "What do you want to do?",
  name: "goal",
  choices: [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role",
  ],
};

function init() {
  inquirer.prompt(question).then((response) => {
    const goal = response.goal;
    if (goal == "view all departments") {
      showDepartments();
    } else if (goal == "view all roles") {
      showRoles();
    } else if (goal == "view all employees") {
      showEmployees();
    } else if (goal == "add a department") {
      promptForDepartment();
    } else if (goal == "add a role") {
      promptForRole();
    } else if (goal == "add an employee") {
      promptForEmployee();
    } else if (goal == "update an employee role") {
      promptForEmployeeAndRole();
    }
  });
}

init();
// PSEUDOCODE:
// NEED TO RUN NPM START AND HAVE PROGRAM RUN INDEX.JS

// NEED TO SHOW USER PROMPTS IN COMMAND LINE:
// view all departments
// view all roles
// view all employees

// add a department -> call function:
// - prompt to enter name of department
// department is added to database

// add a role -> call function:
// - prompt to enter name, salary, and department
// role is added to database

// add an employee -> call function:
// - prompt to enter first name, last name, role, and manager
// employee is added to database

// update an employee role -> call function:
// - prompt to select an employee and select their new role
// - that employee's role is changed to the new role

//
//
//
