// import packages 
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");

// establish database connection
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "bamazon"
});
// check for if database successfully connected 
database.connect(function(err) {
  if(err) throw err;
  console.log("Connected as ID: " + database.threadId);
});