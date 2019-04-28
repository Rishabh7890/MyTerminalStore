DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INTEGER(15) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  dept_name VARCHAR(250) NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  stock_quant INTEGER (250),
  PRIMARY KEY (id)
);
