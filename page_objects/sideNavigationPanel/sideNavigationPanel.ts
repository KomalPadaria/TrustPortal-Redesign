import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../tests/basePage";

export class SideNavigationPanel extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getSideNavigationMenuElement(menuName: string) {
        let locatorValue = './/span[contains(text(), "' + menuName + '")]';

        return this.page.locator('xpath=' + locatorValue) as Locator;
    }

    async getPageMenuElement(menuName: string) {
        let locatorValue = './/a[contains(text(), "' + menuName + '")]';

        return this.page.locator('xpath=' + locatorValue) as Locator;
    }
}