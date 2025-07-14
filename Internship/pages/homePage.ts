import { Page } from "@playwright/test";
export default class HomePage {

    constructor(public page: Page){
    }

    async clickSpecialHot(){
        await this.page.click("//ul[@class='navbar-nav horizontal']//span[@class='title'][normalize-space()='Special']")
    }

}