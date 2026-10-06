# TenTwenty SQA Assessment - Task C Automation

## Framework
Playwright with JavaScript / Node.js

## Automated Flow
Login → Select Product → Add to Cart → Checkout → Verify Order Details → Complete Order

## Prerequisites
- Node.js
- npm

## Setup

Install dependencies:

npm install

Install Playwright Chromium browser:

npx playwright install chromium

## Run Test

npx playwright test tests/ecommerce.spec.js

## Run in Headed Mode

npx playwright test tests/ecommerce.spec.js --headed

## View HTML Report

npx playwright show-report

## Windows PowerShell Note

If PowerShell blocks the `npx` script because of execution policy, use:

npx.cmd playwright test