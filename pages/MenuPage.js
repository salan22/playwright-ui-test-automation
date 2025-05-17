import { expect } from '@playwright/test';

export class MenuPage {
    constructor(page) {
      this.page = page;
      this.cartLink = this.page.locator('.shopping_cart_link')
      this.numOfItems = this.page.locator('.shopping_cart_badge')
      this.menuLink = this.page.locator('#react-burger-menu-btn');
      this.menuList = this.page.locator('.bm-menu-wrap')
      this.menuItems = this.page.locator('.menu-item')
    }

    async isCartLinkVisible(){
        return expect(this.cartLink).toBeVisible()
    }

    async isMenuLinkVisible(){
        return expect(this.menuLink).toBeVisible()
    }

    async clickCartLink (){
      await this.cartLink.click()
    }

    async verifyNumberOfItems(expectedNum){
      const numOfItemsText = await this.numOfItems.textContent();

      const numOfItems = parseInt(numOfItemsText);
      
      return expect(numOfItems).toEqual(expectedNum)
    }

    async clickMenu (){
      await this.menuLink.click()
    }

    async isMenuListVisible(){
      await expect(this.menuList).toBeVisible()
    }

    async clickOnMenuItem (item) {
      await this.menuItems.filter({hasText: item}).click()
    }
  }
  