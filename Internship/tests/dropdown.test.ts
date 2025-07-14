import { test, expect } from '@playwright/test';

test('Dropdown test', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    await page.selectOption("//select[@id='select-demo']", "Tuesday");
    await page.waitForTimeout(3000); // Wait for 3 seconds to see the selected option
});

test('Multiple selection test', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    await page.selectOption("//select[@id='multi-select']", [{ label: 'Florida'}, {index: 3}, { value: 'Texas' }]);
    await page.waitForTimeout(3000); // Wait for 3 seconds to see the selected options
});

test('Dropdown with search test', async ({ page }) => { 
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo")

    await selectCountry("India");
    await selectCountry("United States of America");
    await selectCountry("Japan");

    async function selectCountry(countryName: string){
        await page.click("#select2-country-container+span")
        await page.locator("//ul[@id='select2-country-results']").locator("li",{
            hasText: countryName
        }).click();
    }

});
