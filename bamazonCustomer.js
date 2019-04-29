// import packages 
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");

// establish database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "bamazon"
});
// check for if database successfully connected 
connection.connect(function(err) {
  if(err) throw err;
  console.log("Connected as ID: " + connection.threadId);
});
// create a function to show all the products in inventory with names, department, price and quantity
var showProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;
    // loop thru response to print out products and their information 
    for(var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " ||| " + "Product Name: " + res[i].product_name + " ||| " + "Department: " + res[i].dept_name + " ||| " + "Price: " + res[i].price + " ||| " + "QTY: " + res[i].stock_quant);
    }
    // use inquirer to ask user what the ID is of product they would like to buy and the quantity 
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the ID Number of the product you'd like to buy",
        // validate whether the ID entered is actually valid
        validate: function(userInput) {
          if(isNaN(userInput) == false && parseInt(userInput) <= res.length && parseInt(userInput) > 0) {
            return true;
          }
          else {
            return false;
          }
        }
      },
      {
        // use inquirer to ask user what quantity of the product selected they would like to buy
        type: "input",
        name: "quantity",
        message: "Enter the quantity you would like to buy",
        // validate whether the quantity entered is a number 
        validate: function(userInput) {
          if(isNaN(userInput)){
            return false;
          }
          else {
            return true;
          }
        }
      }
    ]).then(function (inputs) {
      console.log("works so far");
    })
  });
}

showProducts();