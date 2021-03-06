# bamazon

## Customer Interface

#### This application uses console line commands to replicate a storefront. Prompts are issued via the npm inquirer package, products displayed with the cli-table package, color console messages from the npm colors package, and a MySQL database that stores the data using the npm mysql package.

## Instructions

#### This application runs MySQL using the [MAMP](https://www.mamp.info/en/downloads/) local server environment installed on the user's computer. The application is initiated with the command `node bamazonCustomer.js` in the console.

#### The bamazon application displays an inventory of products. Each item displays an item ID, description, department, and price. The user is prompted to enter the item which they would like to purchase, followed by a second prompt asking the quantity. If the current product quantity is in stock, the application makes the purchase, calculating the users total cost and updating the number of available items remaining in stock. If the user is requesting a quantity that exceeds the current product quantity in stock, the user is alerted and asked to adjust their quantity.

## Process

#### After entering the console command 'node bamazonCustomer.js', the user is shown a list of available items, and asked to pick the ID of an item to purchase. In this example, there are 10 items available. The user is entering item '5' for Bounce Dryer Sheets:
![Img1.jpg](./images/Img1.jpg)


#### Next, the user is prompted a second time to enter the quantity of the item that they would like to purchase. Here, the user is entering a quantity of 5:
![Img2.jpg](/images/Img2.jpg)

#### After entering a quantity that is in stock, the item is purchased. Following this example, item #5 (Bounce Dryer Sheets) has been purchased. The user is informed of the quantity purchased (5), as well as the remaining count still in stock. In this case, there were only 5 available originally and all 5 were purchased, so there are now 0 items remaining. The total cost of $62.45 is also displayed ($12.49 price * 5 quantity):
![Img3.jpg](/images/Img3.jpg)

#### Items that are out of stock will no longer appear in the initial product display. In our example, item 5 (Bounce Dryer Sheets) are now sold out, so they are *NOT* displayed when the application is run again:
![Img4.jpg](/images/Img4.jpg)

#### The application will only accept numbers of actual products. It will *NOT* accept:
* any numbers that are not a displayed item ID,
* pressing Enter with no value, and
* all non-numeric characters.
#### In all of these cases, a message is displayed and the product list is displayed again:
![Img5.jpg](/images/Img5.jpg)

#### When the user requests a quantity that exceeds the amount that the store has in stock, they are told of the insufficient quantity and the number available in stock:
![Img6.jpg](/images/Img6.jpg)

#### A user-entered quantity of 0 indicates the user does not which to purchase that item, so the product display will refresh and start again with the first prompt:
![Img7.jpg](/images/Img7.jpg)