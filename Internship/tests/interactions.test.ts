import { expect, test } from '@playwright/test';

test("Interactions", async ({ page }) => {

    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    const messageInput = page.locator("//div[@id='entry_217822']//input[@placeholder='Search For Products']"); //hace de la barra de busqueda un elemento reutilizable como una variable
    console.log(await messageInput.getAttribute("placeholder"));
    expect(messageInput).toHaveAttribute("placeholder", "Search For Products");
    await messageInput.fill("Laptop");
    console.log(await messageInput.inputValue());
    expect(await messageInput.inputValue()).toBe("Laptop");
})

test("Grades", async ({ page }) => {

    await page.goto("https://www.omnicalculator.com/other/test-grade");
    const input1 = page.locator("//input[@id='blockGroups.0.matrices.0.columns.0.0-input']");
    const input2 = page.locator("//input[@id='blockGroups.0.matrices.1.columns.0.0-input']");
    const input3 = page.locator("//input[@id='blockGroups.0.matrices.2.columns.0.0-input']");
    const result = page.locator("//input[@id='blockGroups.0.matrices.3.columns.0.0-input']");

    let numPoint = 6;
    let numWrong = 4;
    let numCorrect = 2;

    await input1.fill(numPoint.toString());
    await input2.fill(numWrong.toString());
    await input3.fill(numCorrect.toString());

    console.log(await result.inputValue());
    expect(await input1.inputValue()).toBe((numWrong + numCorrect).toString());
    expect(await result.inputValue()).toBe((numCorrect * 100 / numPoint).toFixed(2).toString());

})

test("Checkbox", async ({ page }) => {
    await page.goto("https://www.omnicalculator.com/other/test-grade");
    const buttonLike = page.locator("//span[@class='css-1g68kqw']");
    const likeCount = page.locator("//span[@class='css-1nom58r']"); //se va modificando el valor de likes
    const likes = await likeCount.textContent(); //guarda el valor inicial de los likes

    console.log(await likes);

    await buttonLike.click();

    console.log(await likeCount.textContent());

    await expect(likeCount.textContent()).not.toBe(likes);

    console.log(await likes);
    console.log(await likeCount.textContent());
})


