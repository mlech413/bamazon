DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40),
    department_name VARCHAR(20),
    price DECIMAL(6,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keurig Single-Serve K-Cup Box", "Coffee", 7.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot Black Smart Speaker", "Electronics", 49.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle E-Reader", "Electronics", 89.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roku Streaming Stick", "Electronics", 69.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bounce Dryer Sheets", "Laundry", 12.49, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Laundry Detergent", "Laundry", 9.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crest Toothpaste", "Personal Care", 3.49, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jurassic World Pteranodon Figure", "Toys", 19.76, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jurassic World Stegosaurus Figure", "Toys", 17.97, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jurassic World T-Rex Figure", "Toys", 32.82, 3);
