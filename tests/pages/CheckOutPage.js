import { expect } from '@playwright/test';

export class CheckOutPage {
    constructor (page) {
        this.page = page
        this.firstNameInput = this.page.locator('#first-name')
        this.lastnameInput = this.page.locator('#last-name')     
        this.postalCodeInput = this.page.locator('#postal-code')
        this.continueButton = this.page.locator('#continue')
        this.errorText = this.page.locator('h3[data-test="error"]')
        this.cartItems = this.page.locator('.cart_item')
        this.subTotalLable = this.page.locator('.summary_subtotal_label')
        this.taxTotalLable = this.page.locator('.summary_tax_label')
        this.totalLable = this.page.locator('.summary_total_label')
        this.finishButton = this.page.locator('#finish')
        this.completeHeader = this.page.locator('.complete-header')
    }

    async fillCheckOutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName)
        await this.lastnameInput.fill(lastName)
        await this.postalCodeInput.fill(postalCode)
    }

    async clickContinue() {
        await this.continueButton.click()
    }

    async verifyPriceInformation (productItems) {
        //Loop through productItems then count the subtotal price
        var subtotalPrice = 0;

        for (let i=0; i< productItems.length; i++)
        {
            subtotalPrice += productItems[i].price
        }

        //calculate the tax total is 8% 
        var taxPrice = await this.calculateTax(subtotalPrice)

        //calculate the total price
        var totalPrice = parseFloat(taxPrice) + parseFloat(subtotalPrice)

        const expectedSubtotal = await this.subTotalLable.textContent()
        const expectedTax = await this.taxTotalLable.textContent()
        const expectedTotal = await this.totalLable.textContent()

        //verify these value
        expect(expectedSubtotal).toBe(`Item total: $${subtotalPrice}`)
        expect(expectedTax).toBe(`Tax: $${taxPrice}`)
        expect(expectedTotal).toBe(`Total: $${totalPrice}`)
    }

    //Calculate Tax price
    async calculateTax(subtotal) {
        // Convert subtotal to a number
        const subtotalNumber = parseFloat(subtotal);
        
        // Calculate tax at 8%
        const tax = subtotalNumber * 0.08;
        
        // Format tax to xx.xx
        const formattedTax = tax.toFixed(2);
        
        return formattedTax;
    }
      
    //Read all items in inventory pages and return the product Items
    async readCartItems() {
        // Array to hold product items
        const cartItems = [];
        
        // Get the total number of inventory items
        const itemCount = await this.cartItems.count();
        
        // Loop through each item by index
        for (let i = 0; i < itemCount; i++) {
          // Access the item at index i
          const item = this.cartItems.nth(i);
          
          // Extract text content for name and price directly
          const name = await item.locator('.inventory_item_name').textContent();
          let price = await item.locator('.inventory_item_price').textContent();
          
          // Remove the $ sign from the price and convert it to a number
          price = price.replace('$', '').trim();
          
          // Push the name and price to the productItems array
          cartItems.push({
            name: name.trim(),  // Remove extra spaces if necessary
            price: parseFloat(price)  // Convert price to a number
          });
        }
        
        return cartItems;
      }
    
    async clickFinish(){
        await this.finishButton.click()
    }

    async verifyCompleteHeader () {
        const header = await this.completeHeader.textContent()
        expect(header).toBe('Thank you for your order!')
    }

    async verifyErrorText (error) {
        const errorText = await this.errorText.textContent()
        expect(errorText).toBe(error)
    }
}