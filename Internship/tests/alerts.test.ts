import {test, expect} from '@playwright/test';


test('Alerts test', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    
    page.on('dialog', async (alert) => { // Listen for dialog events
        const text = alert.message(); // Get the default value of the alert
        console.log(`Alert text: ${text}`); // Log the alert text
        await alert.accept(); // Accept the alert dialog
    });
    
    await page.locator("//button[@class='btn btn-dark my-30 mx-10 hover:bg-lambda-900 hover:border-lambda-900']").click(); // Click on the "Click Me!" button for the first alert

});

test('Confirm test', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    page.on('dialog', async (confirm) => { // Listen for dialog events
        const text = confirm.message(); // Get the default value of the confirm dialog
        console.log(`Confirm text: ${text}`); // Log the confirm text
        await confirm.dismiss(); // Dismiss the confirm dialog
        //await confirm.accept();
    });
    
    await page.locator("//p[@class='text-gray-900 text-size-16 mt-10 text-black font-bold']//button[@type='button'][normalize-space()='Click Me']").click();
    expect(page.locator("//p[@id='confirm-demo']")).toHaveText("You pressed Cancel!"); // Verify the confirm dialog was accepted
    //expect(page.locator("//p[@id='confirm-demo']")).toHaveText("You pressed OK!"); // Verify the confirm dialog was accepted
    console.log(await page.locator("//p[@id='confirm-demo']").textContent()); // Log the confirm demo text
});

test('Prompt test', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    page.on('dialog', async (alert) => { // Listen for dialog events
        const text = alert.defaultValue(); // Get the default value of the prompt dialog
        console.log(`Prompt text: ${text}`); // Log the prompt text
        await alert.accept("Ian"); // Accept the prompt dialog with a custom value
    });

    await page.locator("button:has-text('Click Me')").nth(2).click(); // Click on the "Click for Prompt Box" button
    expect(page.locator("//p[@id='prompt-demo']")).toContainText("'Ian'"); // Verify the prompt dialog was accepted with the custom value
    console.log(await page.locator("//p[@id='prompt-demo']").textContent()); // Log the prompt demo text
});

test('Modal test', async ({ page }) => {
   await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo");
   await page.locator("button:has-text('Launch Modal')").nth(0).click(); // Click on the "Launch Modal" button
   await page.locator("//div[@id='myModal']//button[@type='button'][normalize-space()='Save Changes']").click(); // Click on the "Save Changes" button
   
});

