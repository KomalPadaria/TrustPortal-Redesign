import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../tests/basePage";
import { LocatorValue } from "../../utility/locators/locator";

export class DashboardPage extends BasePage {

    readonly pageHeader: Locator;

    constructor(page: Page) {
        super(page);

        this.pageHeader = page.locator(LocatorValue.pageHeader + LocatorValue.headerTag6).first();
    }
}