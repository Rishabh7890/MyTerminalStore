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
  if (err) throw err;
  console.log("Connected as ID: " + connection.threadId);
});
// create a function to show all the products in inventory with names, department, price and quantity
var showProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // loop thru response to print out products and their information
    for (var i = 0; i < res.length; i++) {
      console.log(
        "ID: " +
          res[i].id +
          " ||| " +
          "Product Name: " +
          res[i].product_name +
          " ||| " +
          "Department: " +
          res[i].dept_name +
          " ||| " +
          "Price: " +
          res[i].price +
          " ||| " +
          "QTY: " +
          res[i].stock_quant
      );
    }
    // use inquirer to ask user what the ID is of product they would like to buy and the quantity
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "Enter the ID Number of the product you'd like to buy",
          // validate whether the ID entered is actually valid
          validate: function(userInput) {
            if (
              isNaN(userInput) == false &&
              parseInt(userInput) <= res.length &&
              parseInt(userInput) > 0
            ) {
              return true;
            } else {
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
            if (isNaN(userInput)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ])
      .then(function(inputs) {
        var whatItem = inputs.id - 1;
        var itemQuant = parseInt(inputs.quantity);
        var total = parseFloat((res[whatItem].price * itemQuant).toFixed(2));
        // console.log(whatItem);
        // console.log(itemQuant);

        // check to see if there is enough stock to complete transaction
        if (res[whatItem].stock_quant >= itemQuant) {
          // update quantites to reflect after the purchase is made
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quant: res[whatItem].stock_quant - itemQuant
              },
              {
                id: inputs.id
              }
            ],
            function(err, result) {
              if (err) throw err;
              console.log(
                "Thank you for your purchase! Your total is $" +
                  total.toFixed(2) +
                  "."
              );
            }
          );
        } else {
          console.log(
            "Sorry we currently don't have that many of your selected product in stock. Please enter a valid amount or check back later to see if we restocked."
          );
        }
        // run buyAgain() function to ask user if they would like to purchase another item
        buyAgain();
      });
  });
};

// create function to ask user if they would like to buy another product. If yes, run showProducts() function again, if no, send closing message
function buyAgain() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to buy another item?"
  }]).then(function(userResponse) {
    if(userResponse.reply){
      showProducts();
    }
    else {
      console.log("Thank you for visiting! Come Again!");
    }
  });
}

showProducts();
