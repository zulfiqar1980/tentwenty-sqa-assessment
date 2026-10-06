const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');

test('user can complete an order successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const productName = 'Sauce Labs Backpack';

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);

  // Product selection
  const productPrice =
    await inventoryPage.getProductPrice(productName);

  await inventoryPage.addProductToCart(productName);
  await inventoryPage.verifyCartCount(1);

  // Cart validation
  await inventoryPage.openCart();

  await cartPage.verifyProduct(productName);

  const cartPrice =
    await cartPage.getProductPrice();

  expect(cartPrice).toBe(productPrice);

  // Checkout
  await cartPage.checkout();

  await checkoutPage.enterCustomerDetails(
    'Zulfiqar',
    'Ali',
    '46000'
  );

  await checkoutPage.verifyProduct(productName);

  // Financial validation
  const { subtotal, tax, total } =
    await checkoutPage.getOrderTotals();

  expect(subtotal).toBe(productPrice);

  expect(total)
    .toBeCloseTo(subtotal + tax, 2);

  // Complete order
  await checkoutPage.finishOrder();

  await checkoutPage.verifyOrderCompleted();
});