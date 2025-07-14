import { expect, test } from "../base/pomFixtures"; //chromium is a browser engine that is used by Playwright to run tests in a headless browser environment. It is a lightweight and fast browser engine that is designed for testing web applications. Playwright provides a high-level API for interacting with the browser, allowing you to write tests in a simple and intuitive way.
import "../pages/registerPage";
import "../pages/login";
import "../pages/homePage";
import "../pages/specialHot";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/login";
import SpecialHotPage from "../pages/specialHot";
import HomePage from "../pages/homePage";
import { spec } from "node:test/reporters";
import * as data from "../test-data/addToCart-test-data.json"

    test.use({
        browserName: "firefox"
    })

test.describe("Page object test demo", async () => {


    test("Register 01", async ({ page, registerPage }) => {
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
        await registerPage.enterFirstName(data.firstname);
        await registerPage.enterLastName(data.lastname)
        await registerPage.enterEmail(data.email)
        await registerPage.enterTelephone(data.phone)
        await registerPage.enterPassword(data.password);
        await registerPage.confirmPassword(data.password);
        expect(registerPage.isSubscribeChecked()).toBeChecked();
        await registerPage.clickPrivacy();
        await registerPage.clickContinueRegister();
    })

    test("Login test_02", async ({ page, loginPage }) => {
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login")
        await loginPage.enterEmail(data.email);
        await loginPage.enterPassword(data.password);
        await loginPage.clickLogin();
        await page.waitForTimeout(5000)
        expect(await page.title()).toBe("My Account");
        
    })

    test("Add to cart test_03", async ({ page, specialHot, loginPage, homePage }) => {
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login")
        await loginPage.login(data.email, data.password);
        await homePage.clickSpecialHot();
        await specialHot.clickOnCamera();
        await specialHot.addFirstProductToTheCart();
        const isCartVisible = await specialHot.isToastVisible();
        expect(isCartVisible).toBeVisible();
        })
})