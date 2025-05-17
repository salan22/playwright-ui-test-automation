import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';

export const test = base.extend({
    loginPage: async ({page}, use) => {                
        await use(new LoginPage(page))
    },

    menuPage: async ({page}, use) => {                
        await use(new MenuPage(page))
    },

    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page))
    },

    cartPage: async ({page}, use) => {
        await use(new CartPage(page))
    },

    checkoutPage: async ({page}, use) => {
        await use(new CheckOutPage(page))
    }
})

export {expect} from '@playwright/test';
