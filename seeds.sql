CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INT(15) NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("bannana" , "food" , 2 , 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("coffee" , "food" , 15 , 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("adidas" , "shoes" , 150 , 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("hoodie" , "clothes" , 35 , 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("t-shirt" , "clothes" , 10 , 75);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("watch" , "accessories" , 200 , 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("necklace" , "accessories" , 50 , 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("ipad" , "tech" , 400 , 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("laptop" , "tech" , 1400 , 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("nike" , "shoes" , 145 , 50);


CREATE TABLE Departments(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(department_id));


SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 20000),
  ("Food and Drink", 500),
  ("clothing", 5000),
  ("accessories", 11000),
  ("shoes", 11000),
 
