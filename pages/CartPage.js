import { expect } from '@playwright/test';

export class CartPage {
    constructor (page) {
        this.page = page
        this.cartItems = this.page.locator('.cart_item')   
        this.checkoutButton = this.page.locator('#checkout')     
    }

    async verifyProductItemPrice (productName, productPrice) {
        await expect(this.cartItems.locator('.inventory_item_name')).toHaveText(productName)

        await expect(this.cartItems
            .filter({ hasText: productName})
            .locator('.inventory_item_price'))
            .toHaveText("$"+productPrice)        
    }

    async verifyProductItems(...productItems) {
        // Loop through each product detail (assuming it's an array of objects with name and price)
        for (const { name, price } of productItems) {
            // Verify the product name
            await expect(
                this.cartItems.locator('.inventory_item_name')
                    .filter({ hasText: name })
            ).toHaveText(name);
    
            // Verify the product price
            await expect(
                this.cartItems
                    .filter({ hasText: name })
                    .locator('.inventory_item_price')
            ).toHaveText("$" + price);
        }
    }
    
    async removeProductItems (...productItems){
        //Count the cart item length before remove
        const cartItemLength = await this.cartItems.count()

        //Click Remove button on any product item that match the input
        for (const { name } of productItems)
        {
            await this.cartItems.filter( { hasText: name }).getByRole( 'button', { name: 'Remove' }).click()
        }

        const updatedCartItemLength = await this.cartItems.count()
        await expect(updatedCartItemLength).toEqual(cartItemLength - productItems.length)
    }

    async clickCheckOut (){
        await this.checkoutButton.click()
    }
}