import { test, expect } from "./setup";
import { getUser } from "../config/users";

test("TC6 - User can remove product in cart", async ({loginPage, menuPage, inventoryPage, cartPage, page}) => {
    const { username, password } = getUser('standard');
    const productItems = [
        { name: "Sauce Labs Backpack", price: 29.99},
        { name: "Sauce Labs Bike Light", price: 9.99},
        { name: "Sauce Labs Onesie", price: 7.99},
        { name: "Sauce Labs Fleece Jacket", price: 49.99}
    ];

    const removedProductItem = {name: "Sauce Labs Bike Light", price: 9.99};

    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for URL to change to the inventory page
    await page.waitForURL(`${process.env.BASE_URL}/inventory.html`);
    
    //Add product items to cart
    await inventoryPage.addItemsToCart(...productItems); 

    //Go to cart page
    await menuPage.clickCartLink();
    
    //Verify the product in cart 
    await cartPage.verifyProductItems(...productItems);

    //Remove item from cartPage
    await cartPage.removeProductItems(removedProductItem);
});