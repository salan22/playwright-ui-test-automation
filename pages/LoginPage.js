import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
      this.page = page;
      this.userNameInput = this.page.locator('#user-name');
      this.passwordInput = this.page.locator('#password');
      this.loginButton = this.page.locator('#login-button');
      this.errorText = this.page.locator('h3[data-test="error"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    async login(userName, passworld) {
      await this.userNameInput.fill(userName);
      await this.passwordInput.fill(passworld);
      await this.loginButton.click()
    }
  
    async checkErrorText(text){
      await expect(this.errorText).toHaveText(text);
    }
  }
  