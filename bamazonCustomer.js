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
        selectedItemID = "";
        selectedProdName = "";
        selectedDeptName = "";
        selectedPrice = 0;
        selectedStockQty = 0;

        var itemFound = false;
        for (var i = 0; i < res.length; i++) {
            if (answer1.purchaseID == res[i].item_id) {
                itemFound = true;
                selectedItemID = res[i].item_id;
                selectedProdName = res[i].product_name;
                selectedDeptName = res[i].department_name;
                selectedPrice = res[i].price;
                selectedStockQty = res[i].stock_quantity;
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
        else if (selectedStockQty == 0) {
            console.log("\nSORRY, THAT ITEM IS CURRENTLY OUT OF STOCK!".red);
            products(res);
        }
        else if (answer2.purchaseQty > selectedStockQty) {
            console.log("\nSORRY, INSUFFICIENT QUANTITY! ".red + selectedStockQty + " in stock. Please enter a lower amount:");
            quantity(res);
        }
        else {
            var selectedPurchaseQty = answer2.purchaseQty;
            makePurchase(selectedStockQty, selectedPurchaseQty);
        };
    });
  };


  function makePurchase(selectedStockQty, selectedPurchaseQty) {
    var query = "UPDATE products SET stock_quantity = (stock_quantity - " + selectedPurchaseQty + ") WHERE item_id = " + selectedItemID + ";";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("\nCongratulations!".yellow)
        if (selectedPurchaseQty == 1) {
            console.log("You purchased 1 '" + selectedProdName + "'. " + (selectedStockQty - selectedPurchaseQty) + " remaining in stock.");
        }
        else {
            console.log("You purchased " + selectedPurchaseQty + " of '" + selectedProdName + "'. " + (selectedStockQty - selectedPurchaseQty) + " remaining in stock.");
        }
        console.log(("Your total cost is $" + selectedPurchaseQty + selectedPrice).yellow)
        connection.end();
    });

};