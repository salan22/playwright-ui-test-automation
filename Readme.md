1. Install Node JS

2. Clone git project to your local

3. Go to your project folder

4. Install Playwright by running below command
npm init playwright@latest
https://playwright.dev/docs/intro#installing-playwright

5. Remember to choose Javascript

6. Install DOTENV
npm install dotenv

7. Create .env file in the root folder of your project with content
STANDARD_USER=standard_user
PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com

8. Run all test
npx playwright test

9. show report
   npx playwright show-report

10 If you want to debug the test, can use VS Code + Playwright extension

TEST STRUCTURE 
spec file are located in tests folder, and the pages file are in pages subfolder
-- tests \
----------pages \ 
