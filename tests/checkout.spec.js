const { test } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');

test('checkout requires mandatory customer information', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const productName = 'Sauce Labs Backpack';

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addProductToCart(productName);
  await inventoryPage.openCart();

  await cartPage.checkout();

  // Submit without entering any customer information
  await checkoutPage.continueCheckout();

  await checkoutPage.verifyCheckoutError(
    'First Name is required'
  );
});