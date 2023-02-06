import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../tests/basePage";
import { LocatorValue } from "../../utility/locators/locator";

export class LoginPage extends BasePage {
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginBtn: Locator;
    readonly errorMsgIcon: Locator;
    readonly errorMsg: Locator;
    readonly closeErrorMsgIcon: Locator;

    constructor(page: Page) {
        super(page);

        this.emailField = page.locator(LocatorValue.emailTxtField);
        this.passwordField = page.locator(LocatorValue.passwordTxtField);
        this.loginBtn = page.locator(LocatorValue.loginBtn);
        this.errorMsgIcon = page.locator(LocatorValue.errorIcon);
        this.errorMsg = page.locator(LocatorValue.errorMsg);
        this.closeErrorMsgIcon = page.locator(LocatorValue.errorCloseIcon);
    }

    async doLogIn(username: string, password: string) {
        await this.enterTxt(this.emailField, username);
        await this.enterTxt(this.passwordField, password);

        await this.clickOnElement(this.loginBtn);
        // await this.page.waitForSelector(LocatorValue.pageHeader);
    }
}