import {test, expect} from '@playwright/test';

test("Frame Test", async ({page}) => {
    await page.goto("https://letcode.in/frame");
    const frame = page.frame("firstFr");

    await frame?.fill("input[name='fname']", "Ian");
    //console.log(await frame?.locator("input[placeholder='Enter name']").inputValue()); // Log the input value of fname
    await frame?.fill("input[name='lname']", "Calvo");

    //another way to fill the input. Handle first frame then the inner frame
    const innerFrameHandle = await frame?.frameLocator("iframe[src='innerframe']");
    await innerFrameHandle?.locator("input[placeholder='Enter email']").fill("ian.calvo@example.com");

    await page.waitForTimeout(3000); // Wait for 3 seconds to see the filled form

});