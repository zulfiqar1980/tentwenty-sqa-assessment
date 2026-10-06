const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');

    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();

    await expect(this.errorMessage)
      .toContainText('Username and password do not match');
  }
}

module.exports = { LoginPage };