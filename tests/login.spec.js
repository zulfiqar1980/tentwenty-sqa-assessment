const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('user cannot login with invalid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    'invalid_user',
    'invalid_password'
  );

  await loginPage.verifyLoginError();
});