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

INSERT INTO products
  (product_name, dept_name, price, stock_quant)
VALUES
  ("Dragonball Z Budokai 3 PS2", "Electronics", 9.99, 5),
  ("Attack on Titan Season 3 Blu-Ray", "Electronics", 29.99, 100),
  ("YAMAHA Piano", "Musical Instruments", 599.99, 12),
  ("Red Dog Collar", "Pets", 4.99, 200),
  ("Apple Airpods", "Electronics", 129.99, 100),
  ("Grand Theft Auto 4 PS3", "Electronics", 19.99, 10),
  ("Magic Fiber Microfiber Cloths (5 Pack)", "Cleaning", 12.99, 15),
  ("Poland Springs 30 Pack Waterbottles", "Food/Drink", 5.99, 200),
  ("Spalding Basketball", "Sports Equipment", 39.99, 40),
  ("Air Fryer", "Appliances", 99.99, 50);

SELECT * FROM products;