// Requiring our dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")


// Configuring our connection to our database; make sure it matches your local instance
const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "@Kayliekeza2018",
    database: "bamazon"
});

// Connecting to our database, running the table which will start the app
connection.connect(function (err) {
    if (err) throw err;
    console.log("connection successful!");
    makeTable();
});

function makeTable() {
    // Displaying an initial list of products for the user, calling promptSupervisor
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptSupervisor();
    });
}

function promptSupervisor() {
    // Giving the user some options for what to do next
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: ["View Product Sales by Department", "Create New Department", "Quit"]
            }
        ])
        .then(function (val) {
            // Checking to see what option the user chose and running the appropriate function
            if (val.choice === "View Product Sales by Department") {
                viewSales();
            }
            else if (val.choice === "Create New Department") {
                addDepartment();
            }
            else {
                console.log("Goodbye!");
                process.exit(0);
            }
        });
}

function addDepartment() {
    // Asking the user about the department they would like to add
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?"
            },
            {
                type: "input",
                name: "overhead",
                message: "What is the overhead cost of the department?",
                validate: function (val) {
                    return val > 0;
                }
            }
        ])
        .then(function (val) {
            // Using the information the user provided to create a new department
            connection.query(
                "INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)",
                [val.name, val.overhead],
                function (err) {
                    if (err) throw err;
                    // If successful, alert the user, run makeTable again
                    console.log("ADDED DEPARTMENT!");
                    makeTable();
                }
            );
        });
}

