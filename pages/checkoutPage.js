const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');

    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');

    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');

    this.completeHeader = page.getByTestId('complete-header');
    this.errorMessage = page.getByTestId('error');
  }

  async enterCustomerDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);

    await this.continueButton.click();
  }

  async verifyProduct(productName) {
    await expect(
      this.page.getByText(productName)
    ).toBeVisible();
  }

  async getOrderTotals() {
    const subtotalText = await this.subtotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    return {
      subtotal: Number(subtotalText.match(/[\d.]+/)[0]),
      tax: Number(taxText.match(/[\d.]+/)[0]),
      total: Number(totalText.match(/[\d.]+/)[0])
    };
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyOrderCompleted() {
    await expect(this.completeHeader)
      .toHaveText('Thank you for your order!');
  }

  async continueCheckout() {
  await this.continueButton.click();
}

async verifyCheckoutError(expectedMessage) {
  await expect(this.errorMessage)
    .toContainText(expectedMessage);
}
}

module.exports = { CheckoutPage };