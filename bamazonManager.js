var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,

    // Your username
    user: "root",

    // Your password
    password: "@Kayliekeza2018",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then(function (ans) {
        switch (ans.doThing) {
            case "View Products for Sale": viewProducts();
                break;
            case "View Low Inventory": viewLowInventory();
                break;
            case "Add to Inventory": addToInventory();
                break;
            case "Add New Product": addNewProduct();
                break;
            case "End Session": console.log('Bye!');
        }
    });
}
//view all inventory
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("Id\tProduct_N\tDepartment_N\tPrice\tStock_Q");
        console.log("..........................................................");
        for (i = 0; i < res.length; i++) {
            console.log(res[i].id + "||" + "\t" + res[i].product_name + "||" + "\t" + res[i].department_name + "||" + "\t" + res[i].price + "||" + "\t" + res[i].stock_quantity);
        }
        console.log("..........................................................");
    });
}

//views inventory lower than 5
function viewLowInventory() {
    console.log('>>>>>>Viewing Low Inventory<<<<<<');

    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        console.log('----------------------------------------------------------------------------------------------------')

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].stock_quantity);
                console.log('--------------------------------------------------------------------------------------------------');
            }
        }

        start();
    });
}

//displays prompt to add more of an item to the store and asks how much
function addToInventory() {
    console.log('>>>>>>Adding to Inventory<<<<<<');

    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        var itemArray = [];
        //pushes each item into an itemArray
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
        }

        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: itemArray,
            message: "Which item would you like to add inventory?"
        }, {
            type: "input",
            name: "qty",
            message: "How much would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) { return true; }
                else { return false; }
            }
        }]).then(function (ans) {
            var currentQty;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === ans.product) {
                    currentQty = res[i].stock_quantity;
                }
            }
            connection.query('UPDATE Products SET ? WHERE ?', [
                { stock_quantity: currentQty + parseInt(ans.qty) },
                { product_name: ans.product }
            ], function (err, res) {
                if (err) throw err;
                console.log('The quantity was updated.');
                start();
            });
        })
    });
}

//allows manager to add a completely new product to store
function addNewProduct() {
    console.log("Adding New Product!!");
    var deptNames = [];

    //grab name of departments
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            deptNames.push(res[i].department_name);
        }
    })

    inquirer.prompt([{
        type: "input",
        name: "product",
        message: "what's the name of the product?",
        validate: function (value) {
            if (value) { return true; }
            else { return false; }
        }
    }, 
    {
        type: "list",
        name: "department",
        message: "Which department does thius item fit into?",
        choices: deptNames
    }, 
    {
        type: "input",
        name: "price",
        message: "What's the price of the product",
        validate: function (value) {
            if (isNaN(value) === false) { return true; }
            else { return false; }
        }
    }, 
    {
        type: "input",
        name: "quantity",
        message: "How many products are available for sale?",
        validate: function (value) {
            if (isNaN(value) == false) { return true; }
            else { return false; }
        }
    }]).then(function (answer) {
        connection.query("INSERT INTO Products SET ?", {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }, function (err, res) {
            if (err) throw err;
            console.log("Another item was added to the store.");
        })
        start();
    });
}

start();



 