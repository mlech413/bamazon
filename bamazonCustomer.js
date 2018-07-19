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
            //Loop through the query results, but ONLY DISPLAY PRODUCTS THAT ARE IN STOCK
            if (res[i].stock_quantity > 0){
                //Populate and format the product list using npm cli-table
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price]);
            }
        };
        products(res);

        

    });

};

//products() displays the full product list and then asks user to pick a product for purchase
function products(res){

    console.log(" ");

    //Display the product list in the cli-table      
    console.log(table.toString());

    console.log(" ");
    //Prompt user to select a product to buy
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
            //Populate variables with the product that the user selected
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
            //No item was returned, so display message that user entry was invalid
            console.log("\n INVALID ENTRY:".yellow + " Please enter the ID number of a product.".cyan)
            products(res);
        }
        else {
            //User selected and item and it was returned by the query
            quantity(res)

        };

    });

};


//Asks user for the quantity of the product that they would like to purchase
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
            //User selected 0 products to purchase, so exit this question and go back up to the products selection
            products(res);
        }
        else if (answer2.purchaseQty < 1 || answer2.purchaseQty < '1' || answer2.purchaseQty > 999 || answer2.purchaseQty > '999') {
            //User made invalid selections, so display a message and ask for the quantity again
            console.log("\nINVALID ENTRY!".yellow)
            quantity(res);
        }
        else if (selectedStockQty == 0) {
            //The item selected is out of stock (out of stock items were already not displayed, but this is a safeguard)
            console.log("\nSORRY, THAT ITEM IS CURRENTLY OUT OF STOCK!".red);
            products(res);
        }
        else if (answer2.purchaseQty > selectedStockQty) {
            //User selected a quantity that is greater than what is in stock, so display qhat is in stock, and ask quantity again
            console.log("\nSORRY, INSUFFICIENT QUANTITY! ".red + selectedStockQty + " in stock. Please enter a lower amount:");
            quantity(res);
        }
        else {
            //User entered valid quantity, proceed to complete the purchase
            var selectedPurchaseQty = answer2.purchaseQty;
            makePurchase(selectedStockQty, selectedPurchaseQty);
        };
    });
  };

  //Completes the purchase by updating total and displaying amount purchased and total cost
  function makePurchase(selectedStockQty, selectedPurchaseQty) {
    //deduct number that user purchased and update table with the new quantity
    var query = "UPDATE products SET stock_quantity = (stock_quantity - " + selectedPurchaseQty + ") WHERE item_id = " + selectedItemID + ";";
    connection.query(query, function(err, res) {
        if (err) throw err;
        //display messages for the purchase
        console.log("\nCongratulations!".yellow);
        //Show user how many they purchased, and how many remain in stock
        console.log("You purchased " + selectedPurchaseQty + " of '" + selectedProdName + "'. " + (selectedStockQty - selectedPurchaseQty) + " remaining in stock.");
        //Show the user their total cost for the purchase, and exit the transaction
        console.log("Your total cost is $" + (selectedPurchaseQty * selectedPrice));
        connection.end();
    });

};