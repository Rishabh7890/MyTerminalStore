// import packages 
const inquirer = require("inquirer");
const mysql = require("mysql");

// establish database connection
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "bamazon"
});