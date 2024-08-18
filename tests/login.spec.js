import { test, expect } from "./setup";

const standardUser = "standard_user"
const password = "secret_sauce";
const lockedUser = "locked_out_user"
const problemUser = "problem_user"
const performanceGlitchUser = "performance_glitch_user"
const errorUser = "error_user"
const visualUser = "visual_user"
const lockedOutErrorText = "Epic sadface: Sorry, this user has been locked out."
const passwordIsRequiredErrorText = "Epic sadface: Password is required"
const usernameIsRequiredErrorText = "Epic sadface: Username is required"
const wrongLoginInformationErrorText = "Epic sadface: Username and password do not match any user in this service"

test ('TC1 - Login successfully with standard user', async ({loginPage, menuPage}) => {
    await loginPage.goto()
    await loginPage.login(standardUser, password)
    await menuPage.isCartLinkVisible()
    await menuPage.isMenuLinkVisible()
});

test ('TC2 - Locked user can not loggging in', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login(lockedUser, password)
    await loginPage.checkErrorText(lockedOutErrorText)
});

test ('TC3 - Clear Error message display when login without providing password', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login(standardUser, "")
    await loginPage.checkErrorText(passwordIsRequiredErrorText)
});

test ('Clear Error message display when login without providing username', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login( "" , password)
    await loginPage.checkErrorText(usernameIsRequiredErrorText)
});

test ('Clear Error message display when login with wrong password', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login( standardUser , "random")
    await loginPage.checkErrorText(wrongLoginInformationErrorText)
});

test ('Clear Error message display when login with wrong username', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login( "random" , password)
    await loginPage.checkErrorText(wrongLoginInformationErrorText)
});

test ('TC10 - User can logout after logging in', async ({loginPage, menuPage, page}) => {
    await loginPage.goto()
    await loginPage.login(standardUser, password)

    await menuPage.isCartLinkVisible()
    await menuPage.isMenuLinkVisible()

    await menuPage.clickMenu()

    //Verify the menu list is open
    await menuPage.isMenuListVisible()

    //click on "Logout"
    await menuPage.clickOnMenuItem("Logout")

    expect(page.url()).toBe('https://www.saucedemo.com/')
})


