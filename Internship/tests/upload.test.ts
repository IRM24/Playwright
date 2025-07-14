import {test, expect} from '@playwright/test';

test("Download test", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo");
    const textArea = page.locator("//textarea[@id='textbox']");
    await textArea.click();
    await textArea.type("My favorite dish is pescadito con limon"); //en este caso type afecta al test y gracias a este permite pasar al siguente paso para descargar no usar fill
    await page.click("//button[@id='create']")
    
    const download = await Promise.all([
        page.waitForEvent("download"),
        page.click("//a[@id='link-to-download']")
    ])

    const fileName = await download[0].suggestedFilename();
    await download[0].saveAs(fileName);
    console.log(fileName)
});

test("Upload test", async({page})=>{
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/")
    await page.setInputFiles("//input[@type='file']","fotoperfil.jpg")

    /*const [uploadFiles] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.click("input[type='file']")
    ])
    const isMultiple = uploadFiles.isMultiple();
    console.log(isMultiple);
    uploadFiles.setFiles(
        ["uploadItems/apple.png",
            "uploadItems/mango.png"]
    )
*/ 

});