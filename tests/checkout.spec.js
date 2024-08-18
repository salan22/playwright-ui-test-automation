import { test, expect } from "./setup";

const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;
const baseURL = process.env.BASE_URL;

test ("TC8 - User can checkout successfully", async ({loginPage, menuPage, inventoryPage, cartPage, checkoutPage, page}) => {
    const productItems = [
        { name: "Sauce Labs Backpack", price: 29.99},
        { name: "Sauce Labs Bike Light", price: 9.99},
        { name: "Sauce Labs Onesie", price: 7.99}
    ]

    const customerDetail = {
        firstName: "Yen",
        lastName: "Dinh",
        postalCode: "70000"
    }

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

    //Click checkout
    await cartPage.clickCheckOut()

    //Verify user in checkout page
    expect(page.url()).toBe(`${baseURL}/checkout-step-one.html`)

    //Fill in checkout information
    await checkoutPage.fillCheckOutInformation(customerDetail.firstName, customerDetail.lastName, customerDetail.postalCode)

    await checkoutPage.clickContinue()

    //Verify user in checkout page
    expect(page.url()).toBe(`${baseURL}/checkout-step-two.html`);

    //Verify the productItems to be same with cartItems
    const cartItems = await checkoutPage.readCartItems()
    expect(cartItems).toEqual(productItems)

    //Verify the subtotal, tax, total price information
    await checkoutPage.verifyPriceInformation(productItems)

    //Click finish
    await checkoutPage.clickFinish()

    expect(page.url()).toBe(`${baseURL}/checkout-complete.html`)

    //verify header
    await checkoutPage.verifyCompleteHeader()
})

test ("TC9 - User can not checkout if lastName are not filled", async ({loginPage, menuPage, inventoryPage, cartPage, checkoutPage, page}) => {
    const productItems = [
        { name: "Sauce Labs Backpack", price: 29.99},
        { name: "Sauce Labs Bike Light", price: 9.99},
        { name: "Sauce Labs Onesie", price: 7.99}
    ]

    const customerDetail = {
        firstName: "Yen",
        lastName: "",
        postalCode: "70000"
    }

    const errorText = "Error: Last Name is required"

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

    //Click checkout
    await cartPage.clickCheckOut()

    //Fill in checkout information
    await checkoutPage.fillCheckOutInformation(customerDetail.firstName, customerDetail.lastName, customerDetail.postalCode)

    await checkoutPage.clickContinue()

    //Verify error in the lastname field
    await checkoutPage.verifyErrorText(errorText)
})