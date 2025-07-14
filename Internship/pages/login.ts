import { Page } from "@playwright/test";
export default class LoginPage {

    constructor(public page: Page){}

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async enterEmail(email: string){
        await this.page.locator("//input[@id='input-email']")
            .type(email);
    }

    async enterPassword(password: string){
        await this.page.locator("//input[@id='input-password']")
            .type(password);
    }

    async clickLogin(){
        await this.page.click("//input[@value='Login']")
    }


}