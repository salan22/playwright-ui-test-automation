Project Setup Instructions
1. Install Node.js
Make sure you have Node.js installed on your system.

2. Clone the Project
Clone this Git repository to your local machine.

git clone https://github.com/salan22/Playwright-demo.git

3. Navigate to Your Project Folder
Change directory to the project folder:
cd your-project

5. Install Playwright
Initialize Playwright by running the following command:

npm init playwright@latest
For more information, visit the official Playwright documentation.

Note: Make sure to select JavaScript during the setup process.

5. Install DOTENV
To manage environment variables, install the dotenv package:

npm install dotenv

6. Create a .env File
(If .env doesn't exist). In the root folder of your project, create a .env file with the following content:

STANDARD_USER=standard_user
PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com

7. Running Tests
To execute all Playwright tests, use the following command:

npx playwright test

8. View Test Reports
To view the test report after execution, run:

npx playwright show-report

9. Debugging Tests
If you want to debug your tests, you can use VS Code along with the Playwright extension.

10. Project Structure
Test Files: Located in the tests folder.
Page Files: Located in the pages subfolder.

Project folder structure:
-- tests
-- pages
