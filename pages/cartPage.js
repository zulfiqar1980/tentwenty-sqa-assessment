const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;

    this.checkoutButton = page.getByTestId('checkout');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async verifyProduct(productName) {
    await expect(
      this.page.getByText(productName)
    ).toBeVisible();
  }

  async getProductPrice() {
    const priceText =
      await this.page.locator('.inventory_item_price').textContent();

    return Number(priceText.replace('$', ''));
  }

  async removeProduct(productName) {
    const product = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });

    await product
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async verifyProductRemoved(productName) {
    await expect(
      this.page.getByText(productName)
    ).not.toBeVisible();
  }

  async verifyCartIsEmpty() {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);

    await expect(this.cartBadge).not.toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };