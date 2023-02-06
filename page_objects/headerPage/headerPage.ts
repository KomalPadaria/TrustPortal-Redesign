import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../tests/basePage";
import { LocatorValue } from "../../utility/locators/locator";

export class HeaderPage extends BasePage {
    readonly profileDrpDwn: Locator;
    readonly signOut: Locator;

    constructor(page: Page) {
        super(page);

        this.profileDrpDwn = page.locator(LocatorValue.profileDropDown);
        this.signOut = page.locator(LocatorValue.signOutOption);
    }

    async doLogout() {
        await this.page.waitForSelector(LocatorValue.profileDropDown);
        await this.clickOnElement(this.profileDrpDwn);
        await this.clickOnElement(this.signOut);
    }
}