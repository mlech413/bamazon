# bamazon

## Customer Interface

### This application uses console line commands to replicate a storefront. Prompts are issued via npm inquirer and cli-table packages, and a MySQL database stores the data using the npm mysql package.

## Instructions

### This application runs MySQL using the <a href='https://www.mamp.info/en/downloads/'>MAMP</a> local server environment installed on the user's computer. The application is initiated with the command 'node bamazonCustomer.js'.

### The bamazon application displays an inventory of products. Each item displays an item ID, description, department, and price. The user is prompted to enter the item which they would like to purchase, followed by a second prompt asking the quantity. If the current product quantity is in stock, the application makes the purchase, calculating the users total cost and updating the number of available items remaining in stock. If the user is requesting a quantity that exceeds the current product quantity in stock, the user is alerted and asked to adjust their quantity.

### After entering the console command 'node bamazonCustomer.js', the user is shown a list of available items, and asked to pick the ID of an item to purchase. In this example, there are 10 items available. The user is entering item '5' for Bounce Dryer Sheets:

![GitHub Logo](/images/Img1.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/1.jpg]


### The user is them prompted a second time, to enter the quantity of that item that they which to purchase. Here the user is entering a quantity of 5:
![GitHub Logo](/images/Img2.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/2.jpg]

### The purchase has been made, as item 5 (Bounce Dryer Sheets) has been purchased. the user is imformed of the quantity purchased (5), and the remaining stock. In this case, there were only 5 available originally and all 5 were purchased, so there are now 0 items remaining. The total cost of $62.45 is displayed ($12.49 price * 5 quantity):
![GitHub Logo](/images/Img3.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/3.jpg]

### 
![GitHub Logo](/images/Img4.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/4.jpg]

### 
![GitHub Logo](/images/Img5.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/5.jpg]

### 
![GitHub Logo](/images/Img6.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/6.jpg]

### 
![GitHub Logo](/images/Img7.jpg)
[https://github.com/mlech413/bamazon/blob/master/images/7.jpg]