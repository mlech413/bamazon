var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");

var table = new Table({
  head: ['ID', 'Product Name', 'Department', 'Price']
, colWidths: [4, 50, 20, 8]
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
  
});

function start() {
    var query = "SELECT * FROM products ORDER BY department_name, product_name;";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++){
            if (res[i].stock_quantity > 0){
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price]);
            }
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

        var itemFound = false;
        for (var i = 0; i < res.length; i++) {
            if (answer1.purchaseID == res[i].item_id) {
                itemFound = true;
                userItemID = res[i].item_id;
                userProdName = res[i].product_name;
                userDeptName = res[i].department_name;
                userPrice = res[i].price;
                userStockQty = res[i].stock_quantity;
                // console.log("userItemID=" + userItemID);
                // console.log("userProdName=" + userProdName);
                // console.log("userDeptName=" + userDeptName);
                // console.log("userPrice=" + userPrice);
                // console.log("userStockQty=" + userStockQty);
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
        if (answer2.purchaseQty == 0) {
            products(res);
        }
        else if (answer2.purchaseQty < 1 || answer2.purchaseQty < '1' || answer2.purchaseQty > 999 || answer2.purchaseQty > '999') {
            console.log("\nINVALID ENTRY!".yellow)
            quantity(res);
        }
        else if (userStockQty == 0) {
            console.log("\nSORRY, THAT ITEM IS CURRENTLY OUT OF STOCK!".red);
            products(res);
        }
        else if (answer2.purchaseQty > userStockQty) {
            console.log("\nSORRY, INSUFFICIENT QUANTITY!".red + " Please enter a lower amount:".cyan);
            quantity(res);
        }
        else {
            var userPurchaseQty = answer2.purchaseQty;
            // console.log("userItemID=" + userItemID);
            // console.log("userProdName=" + userProdName);
            // console.log("userDeptName=" + userDeptName);
            // console.log("userPrice=" + userPrice);
            // console.log("userStockQty=" + userStockQty);
            makePurchase(userStockQty, userPurchaseQty);
        };
    });
  };


  function makePurchase(userStockQty, userPurchaseQty) {
    var query = "UPDATE products SET stock_quantity = (stock_quantity - " + userPurchaseQty + ") WHERE item_id = " + userItemID + ";";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("\nCongratulations!".yellow)
        if (userPurchaseQty == 1) {
            console.log("You purchased 1 '" + userProdName + "'. " + (userStockQty - userPurchaseQty) + " remaining in stock.");
        }
        else {
            console.log("You purchased " + userPurchaseQty + " of '" + userProdName + "'. " + (userStockQty - userPurchaseQty) + " remaining in stock.");
        }
        connection.end();
    });

};