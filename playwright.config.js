const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30000,

  expect: {
    timeout: 5000
  },

  use: {
    baseURL: 'https://www.saucedemo.com/',

    // SauceDemo uses data-test instead of data-testid
    testIdAttribute: 'data-test',

    headless: false,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ]
});