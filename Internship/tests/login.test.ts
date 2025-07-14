import { chromium, test } from "@playwright/test"; //chromium is a browser engine that is used by Playwright to run tests in a headless browser environment. It is a lightweight and fast browser engine that is designed for testing web applications. Playwright provides a high-level API for interacting with the browser, allowing you to write tests in a simple and intuitive way.
import { text } from "stream/consumers";
test("Login test demo", async ()=> {

    const browser = await chromium.launch({headless: false}); // Launch the browser
    const context = await browser.newContext(); //a browser context is an isolated environment in which you can run tests. Each context has its own cookies, local storage, and session storage.
    const page = await context.newPage(); // Create a new page in the browser context 

    await page.goto("https://ecommerce-playground.lambdatest.io/"); // Navigate to the login page
    await page.hover("//a[@role='button']//span[@class='title'][normalize-space()='My account']");
    await page.click("'Login'");
    await page.fill("//input[@id='input-email']", "koushik350@gmail.com");
    await page.fill("(//input[@id='input-password'])[1]","Pass123$");
    await page.click("//input[@value='Login']");

    await page.waitForTimeout(5000); // Wait for 5 seconds to see the result

})



