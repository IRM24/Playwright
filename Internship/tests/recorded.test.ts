import { test, chromium, expect } from '@playwright/test';

test('test', async () => {
  const browser = await chromium.launch({ headless: false }); // Forzar headless aquí
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.getByRole('button', { name: ' My account' }).click();
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('koushik350@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pass123$');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.click("//a[contains(text(),'Logout')]");

  await browser.close();
});