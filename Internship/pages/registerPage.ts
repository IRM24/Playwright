import { Page } from "@playwright/test";
export default class RegisterPage {

    constructor(public page: Page){



    }

    async enterFirstName(firstname: string){
        await this.page.locator("//input[@id='input-firstname']")
            .type(firstname);
    }

    async enterLastName(lastname: string){
        await this.page.locator("//input[@id='input-lastname']")
            .type(lastname);
    }

    async enterEmail(email: string){
        await this.page.locator("//input[@id='input-email']")
            .type(email);
    }

    async enterTelephone(telephone: string){
        await this.page.locator("//input[@id='input-telephone']")
            .type(telephone);
    }

    async enterPassword(password: string){
        await this.page.locator("//input[@id='input-password']")
            .fill(password);
    }

    async confirmPassword(passConfirm: string){
        this.page.locator("//input[@id='input-confirm']")
            .fill(passConfirm);
    }

    /*isSubscribeChecked() {
        return this.page.locator("#input-newsletter-no");
    }
*/
    async clickPrivacy(){
        await this.page.click("//label[@for='input-agree']");
    }

    isSubscribeChecked() {
        return this.page.locator("#input-newsletter-no");
    }

    /*async clickTermandConditon() { 
        await this.page.click("//label[@for='input-agree']")
    }*/


    async clickContinueRegister(){
        await this.page.click("//input[@value='Continue']")
    }

}