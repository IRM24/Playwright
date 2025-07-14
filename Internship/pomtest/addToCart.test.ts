import { chromium, expect, test } from "@playwright/test"; //chromium is a browser engine that is used by Playwright to run tests in a headless browser environment. It is a lightweight and fast browser engine that is designed for testing web applications. Playwright provides a high-level API for interacting with the browser, allowing you to write tests in a simple and intuitive way.
import "../pages/registerPage";
import "../pages/login";
import "../pages/homePage";
import "../pages/specialHot";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/login";
import SpecialHotPage from "../pages/specialHot";
import HomePage from "../pages/homePage";
import { spec } from "node:test/reporters";

const email = "iancalvo3@gmail.com";
const password = "123456987";
test.describe("Page object test demo", async () => {

    test("Register 01", async ({ page, baseURL }) => {
        const register = new RegisterPage(page);
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
        await register.enterFirstName("Ian2");
        await register.enterLastName("Calvo")
        await register.enterEmail(email)
        await register.enterTelephone("123456897")
        await register.enterPassword(password);
        await register.confirmPassword(password);
        expect(register.isSubscribeChecked()).toBeChecked();
        await register.clickPrivacy();
        await register.clickContinueRegister();
    })

    test("Login test_02", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login")
        await login.enterEmail(email);
        await login.enterPassword(password);
        await login.clickLogin();
        await page.waitForTimeout(5000)
        expect(await page.title()).toBe("My Account");
        
    })

    test("Add to cart test_03", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const special = new SpecialHotPage(page);
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login")
        await login.login(email, password);
        await homePage.clickSpecialHot();
        await special.clickOnCamera();
        await special.addFirstProductToTheCart();
        const isCartVisible = await special.isToastVisible();
        expect(isCartVisible).toBeVisible();
        })
})