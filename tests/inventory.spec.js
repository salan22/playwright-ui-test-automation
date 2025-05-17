import { test, expect } from "./setup";
import { getUser } from "../config/users";

test("TC4 - User can add one item to cart", async ({loginPage, menuPage, inventoryPage, cartPage, page}) => {
    const { username, password } = getUser('standard');
    const productItem = "Sauce Labs Backpack";

    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for URL to change to the inventory page
    await page.waitForURL(`${process.env.BASE_URL}/inventory.html`);

    // Add assertions to validate the login
    expect(page.url()).toBe(`${process.env.BASE_URL}/inventory.html`);

    //Verify menu link is available
    await menuPage.isCartLinkVisible();

    //Add product item to cart
    await inventoryPage.addItemToCart(productItem); 

    //The price of the product 
    const expectedProductPrice = 29.99;

    //Go to cart page
    await menuPage.clickCartLink();

    await menuPage.verifyNumberOfItems(1);
    
    //Verify the product in cart 
    await cartPage.verifyProductItemPrice(productItem, expectedProductPrice);
});

test("TC5 - User can add many product items to cart", async ({loginPage, menuPage, inventoryPage, cartPage, page}) => {
    const { username, password } = getUser('standard');
    const productItems = [
        { name: "Sauce Labs Backpack", price: 29.99},
        { name: "Sauce Labs Bike Light", price: 9.99},
        { name: "Sauce Labs Onesie", price: 7.99},
        { name: "Sauce Labs Fleece Jacket", price: 49.99}
    ];

    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for URL to change to the inventory page
    await page.waitForURL(`${process.env.BASE_URL}/inventory.html`);

    // Add assertions to validate the login
    expect(page.url()).toBe(`${process.env.BASE_URL}/inventory.html`);

    //Verify menu link is available
    await menuPage.isCartLinkVisible();

    //Add product items to cart
    await inventoryPage.addItemsToCart(...productItems); 

    //Verify the product item count is increased
    await menuPage.verifyNumberOfItems(productItems.length);

    //Go to cart page
    await menuPage.clickCartLink();
    
    //Verify the product in cart 
    await cartPage.verifyProductItems(...productItems);
});

test("TC7 - Can sort product items by price ascending", async ({loginPage, menuPage, inventoryPage, cartPage, page}) => {
    const { username, password } = getUser('standard');
 
    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for URL to change to the inventory page
    await page.waitForURL(`${process.env.BASE_URL}/inventory.html`);    

    //Verify menu link is available
    await menuPage.isCartLinkVisible();

    const productItems = await inventoryPage.readProductItems();

    //Sort the productItems array by price
    productItems.sort((a,b) => a.price - b.price);
    
    //Click on sort by price
    await inventoryPage.sortProductBy('Price (low to high)');

    const sortedProductItems = await inventoryPage.readProductItems();

    //Verify the product has been sorted
    expect(sortedProductItems).toEqual(productItems);
});