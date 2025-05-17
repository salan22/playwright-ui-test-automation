import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryListItem = this.page.locator('.inventory_list .inventory_item_description')
        this.productSortSelector = this.page.locator('select.product_sort_container')
    }

    //Add once item to cart with item = product Name
    async addItemToCart (productItem){
        await this.inventoryListItem
            .filter({ hasText: productItem })
            .getByRole('button', { name: 'Add to cart' })
            .click();     
         
        //Verify button change to "Remove" after click Add to cart
        await expect(this.inventoryListItem.filter({ hasText: productItem }).getByRole('button', { name: 'Remove' })).toBeVisible()
    }

    //Add may items to cart 
    async addItemsToCart(...productDetails) {
        // Loop through each product item
        for (const { name } of productDetails) {
            // Add the item to the cart
            await this.inventoryListItem
                .filter({ hasText: name })
                .getByRole('button', { name: 'Add to cart' })
                .click();
            
            // Verify that the button changes to "Remove" after adding the item to the cart
            await expect(
                this.inventoryListItem
                    .filter({ hasText: name })
                    .getByRole('button', { name: 'Remove' })
            ).toBeVisible();
        }
    }   
    
    //Read all items in inventory pages and return the product Items
    async readProductItems() {
        // Array to hold product items
        const productItems = [];
        
        // Get the total number of inventory items
        const itemCount = await this.inventoryListItem.count();
        
        // Loop through each item by index
        for (let i = 0; i < itemCount; i++) {
          // Access the item at index i
          const item = this.inventoryListItem.nth(i);
          
          // Extract text content for name and price directly
          const name = await item.locator('.inventory_item_name').textContent();
          let price = await item.locator('.inventory_item_price').textContent();
          
          // Remove the $ sign from the price and convert it to a number
          price = price.replace('$', '').trim();
          
          // Push the name and price to the productItems array
          productItems.push({
            name: name.trim(),  // Remove extra spaces if necessary
            price: parseFloat(price)  // Convert price to a number
          });
        }
        
        return productItems;
      }
    
    //Select an sort option
    async sortProductBy(sort) {        
        await this.productSortSelector.selectOption(sort)
    }
}