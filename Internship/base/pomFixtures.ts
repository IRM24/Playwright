import { test as baseTest } from '@playwright/test';
import "../pages/registerPage";
import "../pages/login";
import "../pages/homePage";
import "../pages/specialHot";
import RegisterPage from '../pages/registerPage';
import LoginPage from '../pages/login';
import HomePage from '../pages/homePage';
import SpecialHotPage from '../pages/specialHot';

type pages = {
    registerPage : RegisterPage,
    loginPage : LoginPage,
    homePage : HomePage,
    specialHot : SpecialHotPage
}


const testPages = baseTest.extend<pages>({

    registerPage: async ({page},use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({page},use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({page},use) => {
        await use(new HomePage(page));
    },
    specialHot: async ({page},use) => {
        await use(new SpecialHotPage(page));
    }

})

export const test = testPages;
export const expect = testPages.expect;
