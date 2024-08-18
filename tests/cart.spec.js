import { test, expect } from "./setup";

const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;
const baseURL = process.env.BASE_URL;

test ("TC6 - User can remove product in cart", async ({loginPage, menuPage, inventoryPage, cartPage, page}) => {
    const productItems = [
        { name: "Sauce Labs Backpack", price: 29.99},
        { name: "Sauce Labs Bike Light", price: 9.99},
        { name: "Sauce Labs Onesie", price: 7.99},
        { name: "Sauce Labs Fleece Jacket", price: 49.99}
    ]

    const removedProductItem = {name: "Sauce Labs Bike Light", price: 9.99}

    await loginPage.goto()

    //login in with standard username and password
    await loginPage.login(standardUser, password)

    // Wait for URL to change to the inventory page
    await page.waitForURL(`${baseURL}/inventory.html`);
    
    //Add product items to cart
    await inventoryPage.addItemsToCart(...productItems); 

    //Go to cart page
    await menuPage.clickCartLink()
    
    //Verify the product in cart 
    await cartPage.verifyProductItems(...productItems)

    //Remove item from cartPage
    await cartPage.removeProductItems(removedProductItem)
})