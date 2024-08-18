1. Install Node JS

2. Check out git project to your local

3. Go to your project folder

4. Install Playwright by running below command
npm init playwright@latest
https://playwright.dev/docs/intro#installing-playwright

5. Install DOTENV
npm install dotenv

6. Create .env file in the root folder of your project with content
STANDARD_USER=standard_user
PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com

7. Run all test
npx playwright test 

7.1 If you want to debug the test, can use VS Code + Playwright extension