import { test, expect } from '@playwright/test';
import moment from "moment";


test("Calendar Test",async({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    let date = "2003-04-24"
    await page.fill("//input[@id='birthday']",date);
    await page.waitForTimeout(3000);

});

test("Moment using Test", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    //const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]")
    //const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
    await selectDate(24, "April 2030");
    await page.reload()
    await selectDate(15, "July 2026")

    async function selectDate(date:number, monthYear:string) {
        
        await page.click("//input[@placeholder='Start date']");


        const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("//div[@class='datepicker-days']//th[@class='prev']");
        const next = page.locator("//div[@class='datepicker-days']//th[@class='next']");

        const thisMonth = moment(monthYear, "MMMM YYYY").isBefore();
        console.log(await thisMonth);


        while (await mmYY.textContent() != monthYear) {
            if (thisMonth) {
                await prev.click();
            } else {
                await next.click();
            }
        }
        await page.click(`//td[normalize-space()="${date}"]`);
    }
});