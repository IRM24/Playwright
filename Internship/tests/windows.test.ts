let facebookPage: Page;
import {test, expect} from '@playwright/test';

test('Windows test', async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'), // Wait for the new window to open
        page.click("//a[@title='Follow @Lambdatesting on Twitter']") // Click the button to open the new window
    ]);

    console.log(newWindow.url()); // Log the URL of the new window
});

test("Interact with multiple tabs", async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    // console.log(page.url());


    const [multiPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("#followboth")
    ])
    await multiPage.waitForLoadState();

    const pages = multiPage.context().pages();
    console.log('No.of tabs: ' + pages.length);

    pages.forEach(tab => {
        console.log(tab.url());
    })

    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url()
        if (url == "https://www.facebook.com/lambdatest/") {
            facebookPage = pages[index];
        }
    }
    const text = await facebookPage.textContent("//h1")
    console.log(text);
})