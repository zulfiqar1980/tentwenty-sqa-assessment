const { test } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');

test('user can remove a product from the cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  const productName = 'Sauce Labs Backpack';

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Add product
  await inventoryPage.addProductToCart(productName);
  await inventoryPage.verifyCartCount(1);

  // Open cart
  await inventoryPage.openCart();

  // Confirm product exists
  await cartPage.verifyProduct(productName);

  // Remove product
  await cartPage.removeProduct(productName);

  // Validate cart state
  await cartPage.verifyProductRemoved(productName);
  await cartPage.verifyCartIsEmpty();
});