import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { DashboardPage } from "../page_objects/dashBoardPage/dashBoardPage";
import { LoginPage } from "../page_objects/loginPage/loginPage";
import { SideNavigationPanel } from "../page_objects/sideNavigationPanel/sideNavigationPanel";
import config from "../playwright.config";
import { Constant } from "../utility/constants/constant";
import { page } from "./hooks";
import { LocatorValue } from "../utility/locators/locator";
import { HeaderPage } from "../page_objects/headerPage/headerPage";

const baseURL = config.use?.baseURL;

Given('Valid login credentials', async () => {
    await new LoginPage(page).fillUserNameAndPassword(Constant.USERNAME, Constant.PASSWORD);
});

Given('Valid login credentials with toggle case', async () => {
    await new LoginPage(page).fillUserNameAndPassword('KoMaL.PaDaRiA+D2@NuRdSoFt.Co', Constant.PASSWORD);
});

Given('Invalid login credentials', async () => {
    await new LoginPage(page).fillUserNameAndPassword("komal.padaria+d2@hotmail.com", Constant.PASSWORD);
});

When('User click Login', async () => {
    await new LoginPage(page).clickLogin();
});

Then('User should login successfully and redirect to Dashboard screen', async () => {
    const headerElement = new DashboardPage(page).pageHeader;

    await expect(headerElement).toBeVisible({ timeout: 15000 });
    await expect(headerElement).toHaveText(Constant.PAGE_HEADER);
    await expect(page).toHaveURL(baseURL + Constant.DASHBOARD_URL);
});

Then('User should not be able to login and user must receive toast message: {string}', async (message: string) => {
    const loginPage = new LoginPage(page);

    const closeErrorElement = loginPage.closeErrorMsgIcon;
    const errorMsgElement = loginPage.errorMsg;

    await expect(loginPage.errorMsgIcon).toBeVisible();
    await expect(closeErrorElement).toBeVisible();

    await expect(errorMsgElement).toBeVisible();
    await expect(errorMsgElement).toHaveText(message);
});

Then('User able to navigate to all menu options after login', async () => {
    const sideNavPanel = new SideNavigationPanel(page);

    const navigation_url: any = {
        "Dashboard": Constant.DASHBOARD_URL,
        "Frameworks": Constant.FRAMEWORKS_URL,
        "Policies & Procedures": Constant.POLICIES_PROCEDURES_URL,
        "Vulnerability Management": Constant.VULNERABILITY_MANAGEMENT_URL,
        "Penetration Testing": Constant.PENETRATION_TESTING_URL,
        "Security Awareness": Constant.SECURITY_AWARENESS_URL,
        "Remediation Tracker": Constant.REMEDIATION_TRACKER_URL,
        "Customer Success": Constant.SERVICE_REVIEW_URL,
        "GAP Analysis": Constant.GAP_ANALYSIS_URL
    }

    for (const option in navigation_url) {
        await sideNavPanel.clickOnElementWithDelay(await sideNavPanel.getSideNavigationMenuElement(option), 500);
        await expect(page).toHaveURL(baseURL + navigation_url[option]);
    }

    await sideNavPanel.clickOnElement(await sideNavPanel.getSideNavigationMenuElement(Constant.SETTINGS));
    await sideNavPanel.clickOnElement(await sideNavPanel.getSideNavigationMenuElement(Constant.MY_ACCOUNT));

    await expect(page).toHaveURL(baseURL + Constant.MYACCOUNT_URL);

    await sideNavPanel.clickOnElement(await sideNavPanel.getSideNavigationMenuElement(Constant.COMPANY_INFORMATION));

    const company_info_url: any = {
        "Manage Users": Constant.MANAGE_USERS_URL,
        "Meetings": Constant.MEETINGS_URL,
        "Locations": Constant.LOCATIONS_URL,
        "Authorizations": Constant.AUTHORIZATIONS_URL,
        "Plan and Billing": Constant.PLAN_AND_BILLING_URL
    }

    for (const option in company_info_url) {
        await sideNavPanel.clickOnElement(await sideNavPanel.getPageMenuElement(option));
        await expect(page).toHaveURL(baseURL + company_info_url[option]);
    }

    await sideNavPanel.clickOnElement(await sideNavPanel.getSideNavigationMenuElement(Constant.TECHNICAL_INFORMATION));

    const technical_info_url: any = {
        "Applications": Constant.APPLICATIONS_URL,
        "IP Ranges": Constant.IP_RANGES_URL,
        "Wireless Networks": Constant.WIRELESS_NETWORK_URL
    }

    for (const option in technical_info_url) {
        await sideNavPanel.clickOnElement(await sideNavPanel.getPageMenuElement(option));

        await expect(page).toHaveURL(baseURL + technical_info_url[option]);
    }
});

Then(/^User able to logout$/, async () => {
    const loginPage = new LoginPage(page);

    await page.waitForSelector(LocatorValue.pageHeader + LocatorValue.headerTag6);
    await new HeaderPage(page).doLogout();

    await expect(page).toHaveURL(baseURL + "");
    await expect(loginPage.emailField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginBtn).toBeVisible();

});