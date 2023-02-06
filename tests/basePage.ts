import { Locator, Page } from "@playwright/test";
import config from "../playwright.config";
import { LocatorValue } from "../utility/locators/locator";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openUrl(appUrl: string = "") {
        await this.page.goto("/" + appUrl);
    }

    async enterTxt(element: Locator, text: string) {
        await element.fill(text);
    }

    async clickOnElement(element: Locator) {
        await element.click();
    }

    async getText(element: Locator){
        return element.textContent();
    }
}