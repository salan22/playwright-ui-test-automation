import { test, expect } from "./setup";
import { USERS } from "../config/users";

const lockedOutErrorText = "Epic sadface: Sorry, this user has been locked out."
const passwordIsRequiredErrorText = "Epic sadface: Password is required"
const usernameIsRequiredErrorText = "Epic sadface: Username is required"
const wrongLoginInformationErrorText = "Epic sadface: Username and password do not match any user in this service"

test ('TC1 - Login successfully with standard user', async ({loginPage, menuPage}) => {
    await loginPage.goto()
    await loginPage.login(USERS.standard.username, USERS.standard.password)
    await menuPage.isCartLinkVisible()
    await menuPage.isMenuLinkVisible()
});

test ('TC2 - Locked user can not loggging in', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login(USERS.locked.username, USERS.locked.password)
    await loginPage.checkErrorText(lockedOutErrorText)
});

test ('TC3 - Clear Error message display when login without providing password', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login(USERS.standard.username, "")
    await loginPage.checkErrorText(passwordIsRequiredErrorText)
});

test ('Clear Error message display when login without providing username', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login( "" , USERS.standard.password)
    await loginPage.checkErrorText(usernameIsRequiredErrorText)
});

test ('Clear Error message display when login with wrong password', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login( USERS.standard.username , "random")
    await loginPage.checkErrorText(wrongLoginInformationErrorText)
});

test ('Clear Error message display when login with wrong username', async ({loginPage}) => {
    await loginPage.goto()
    await loginPage.login( "random" , USERS.standard.password)
    await loginPage.checkErrorText(wrongLoginInformationErrorText)
});

test ('TC10 - User can logout after logging in', async ({loginPage, menuPage, page}) => {
    await loginPage.goto()
    await loginPage.login(USERS.standard.username, USERS.standard.password)

    await menuPage.isCartLinkVisible()
    await menuPage.isMenuLinkVisible()

    await menuPage.clickMenu()

    //Verify the menu list is open
    await menuPage.isMenuListVisible()

    //click on "Logout"
    await menuPage.clickOnMenuItem("Logout")

    expect(page.url()).toBe(`${process.env.BASE_URL}/`)
})


