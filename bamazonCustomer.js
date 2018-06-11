var mysql = require("mysql");
var inquirer = require('inquirer');

/* var pucharseId = "";
var purchaseUnit = "" ;
var stock = ""; */


var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
  
    // Your username
    user: "root",
  
    // Your password
    password: "@Kayliekeza2018",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts()
  });

  

  function readProducts() {
    console.log("Available  product for sale!...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
    //   console.log(res);
      for (i = 0; i<res.length;i++){
        
        console.log( res[i].id + "||"+res[i].product_name + "||" + res[i].department_name + "||" +res[i].price + "||" + res[i].stock_quantity + "\n");
       
      }
      
     promptCustomer(res) ;
    });

}

var promptCustomer = function(res) {
    inquirer.prompt([
      {
        type: "input",
        name: "choice",
        message: "what would you like to purchase?"}]).then (function(answer){
          var correct = false;
          for (var i=0; i<res.length;i++) {
            if(res[i].product_name==answer.choice) {
              correct=true;
              var product=answer.choice;
              var id=i;
            }
          }
              inquirer.prompt([{
                type: "input",
                name: "quantity",
                message: "How many item would you like to buy?",
                validate: function(value) {
                  if(isNaN(value)==false) {
                    return true;
                  } else {
                    return false;
                  }
                }
              }]).then(function(answer) 
              {
                if ((res[id].stock_quantity - answer.quantity) > 0) {
                  let queryStr = "UPDATE products SET stock_quantity=" + (res[id].stock_quantity - parseInt(answer.quantity)) + " WHERE product_name='" + product + "';";
                 
                  connection.query(queryStr, function (err, res2) {
                    console.log("Product Bought!");
                    readProducts();
                  })
                } else {
                  console.log("NOT a Valid selection!");
                  promptCustomer(res);
                }
              })
     
              })
            
          
       

    }

