var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");

var item = [];
var productList = [];

var table = new Table({
  head: ['ID', 'Product Name', 'Department', 'Price']
, colWidths: [4, 40, 20, 8]
});

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  start();
  connection.end();
});

function start() {
    var query = "SELECT * FROM products ORDER BY department_name, product_name;";
    connection.query(query, function(err, res) {
        productList = [];
        for (var i = 0; i < res.length; i++){
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price]);
        };
        products(res);

        

    });

};

    
function products(res){

    console.log(" ");
          
    console.log(table.toString());

    console.log(" ");
    inquirer.prompt(
        {
            name: "purchaseID",
            type: "text",
            message: "What is the ID number of the product you would like to purchase?"
        }
    )
    .then(function(answer1) {
        userItemID = "";
        userProdName = "";
        userDeptName = "";
        userPrice = 0;
        userStockQty = 0;
        console.log("answer.purchaseID=" + answer1.purchaseID);

        var itemFound = false;
        for (var i = 0; i < res.length; i++) {
            if (answer1.purchaseID == res[i].item_id) {
                itemFound = true;
                userItemID = res[i].item_id;
                userProdName = res[i].product_name;
                userDeptName = res[i].department_name;
                userPrice = res[i].price;
                userStockQty = res[i].stock_quantity;
                console.log("userItemID=" + userItemID);
                console.log("userProdName=" + userProdName);
                console.log("userDeptName=" + userDeptName);
                console.log("userPrice=" + userPrice);
                console.log("userStockQty=" + userStockQty);
            }
        }
        if (!itemFound) {
            console.log("\n INVALID ENTRY:".yellow + " Please enter the ID number of a product.".cyan)
            products(res);
        }
        else {
            quantity(res)

        };

    });

};



function quantity(res){
    console.log(" ");
    inquirer.prompt(
        {
            name: "purchaseQty",
            type: "text",
            message: "How many would you like to purchase?"
        }
    )
    .then(function(answer2) {
        if (answer2.purchaseQty < 1 || answer2.purchaseQty < '1' || answer2.purchaseQty > 999 || answer2.purchaseQty > '999') {
            console.log("\nINVALID ENTRY!".yellow)
            quantity(res);
        }
        else if (answer2.purchaseQty > userStockQty) {
            console.log("\n\nINSUFFICIENT QUANTITY!".red + " Please try another order:\n".cyan);
            products(res);
        }
        else {
            console.log("userItemID=" + userItemID);
            console.log("userProdName=" + userProdName);
            console.log("userDeptName=" + userDeptName);
            console.log("userPrice=" + userPrice);
            console.log("userStockQty=" + userStockQty);
        };
    });
  };