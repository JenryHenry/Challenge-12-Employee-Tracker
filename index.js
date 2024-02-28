const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
let db;
// functions to store table data from database in variables
const getDepartments = async function () {
  const [results] = await db.query("SELECT * FROM department");

  return results;
};

const getRoles = async function () {
  const [results] = await db.query("SELECT * FROM role");
  return results;
};

const getEmployees = async function () {
  const [results] = await db.query("SELECT * FROM employee");
  return results;
};
// const employee = db.query("SELECT * FROM employee", function (err, results) {
//   if (err) {
//     console.log(err);
//   }
//   return results;
// });

// questions for inquirer
const promptQuestions = [
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "depName",
  },
];

async function showDepartments() {
  const deptData = await getDepartments();
  console.table(deptData);
  mainMenu();
}
async function showRoles() {
  //retrieve roles table from database and return it
  const roleData = await getRoles();
  console.table(roleData);
  mainMenu();
}
async function showEmployees() {
  //retrieve employees table from database and return it.
  const empData = await getEmployees();
  console.table(empData);
  mainMenu();
}
async function promptForDepartment() {
  // inquirer.prompt()
  const response = await inquirer.prompt(promptQuestions[0]);
  await db.query("INSERT INTO department (name) VALUES (?)", response.depName);
  console.log("Success!");
  await showDepartments();
}
async function promptForRole() {
  const roleQuestions = [
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
      choices: (await getDepartments()).map((dep) => {
        return {
          name: dep.name,
          value: dep.id,
        };
      }),
    },
  ];
  const response = await inquirer.prompt(roleQuestions);
  await db.query(
    `INSERT INTO role (title, department, salary) VALUES (?, ?, ?)`,
    [response.roleName, response.roleDep, response.roleSalary]
  );
  console.log("Success!");
  await showRoles();
}
async function promptForEmployee() {
  const employeeQuestions = [
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
      choices: (await getRoles()).map((roles) => {
        return {
          name: roles.title,
          value: roles.id,
        };
      }),
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: (await getEmployees()).map((employees) => {
        return {
          name: employees.first_name + employees.last_name,
          value: employees.id,
        };
      }),
    },
  ];
  const response = await inquirer.prompt(employeeQuestions);
  await db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [response.firstName, response.lastName, response.empRole, response.manager]
  );
  console.log("Success!");
  await showEmployees();
}
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

async function init() {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nakkyj-kowHe8-kipb1j",
    database: "business_db",
  });
  mainMenu();
}
async function mainMenu() {
  const response = await inquirer.prompt(question);
  const goal = response.goal;
  if (goal == "view all departments") {
    await showDepartments();
  } else if (goal == "view all roles") {
    showRoles();
  } else if (goal == "view all employees") {
    showEmployees();
  } else if (goal == "add a department") {
    await promptForDepartment();
  } else if (goal == "add a role") {
    promptForRole();
  } else if (goal == "add an employee") {
    promptForEmployee();
  } else if (goal == "update an employee role") {
    promptForEmployeeAndRole();
  }
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
