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

var showProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;

    for(var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " ||| " + "Product Name: " + res[i].product_name + " ||| " + "Department: " + res[i].dept_name + " ||| " + "Price: " + res[i].price + " ||| " + "QTY: " + res[i].stock_quant);
    }
    
  });
}

showProducts();