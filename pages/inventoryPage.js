const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  getProduct(productName) {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
  }

  async getProductPrice(productName) {
    const product = this.getProduct(productName);

    const priceText =
      await product.locator('.inventory_item_price').textContent();

    return Number(priceText.replace('$', ''));
  }

  async addProductToCart(productName) {
    const product = this.getProduct(productName);

    await product
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async verifyCartCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };