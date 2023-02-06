import { expect, test } from '@playwright/test';
import { HeaderPage } from '../../../page_objects/headerPage/headerPage';
import { LoginPage } from '../../../page_objects/loginPage/loginPage';
import { OnBoardingPage } from '../../../page_objects/onBoardingPage/onBoardingPage';
import config from '../../../playwright.config';
import { Constant } from '../../../utility/constants/constant';

const baseURL = config.use?.baseURL;

test.beforeEach(async ({ page }) => {
    await new LoginPage(page).openUrl();
    
});

test.describe("RDTS001: Verify login functionality", () => {
    test("RDTC1001: Check login with valid credentials", async ({ page }) => {
        await new LoginPage(page).doLogIn("komal.padaria+d2@nurdsoft.co", "Admin@12345#");

        const headerElement = new OnBoardingPage(page).pageHeader;
        await page.isVisible("text='Onboarding'")
    });

    test("RDTC1002: Check login with valid email(togglecase) and valid password", async ({ page }) => {
        await new LoginPage(page).doLogIn("KoMal.PadARia+D2@NuRdSoFt.Co", "Admin@12345#");

        const headerElement = new OnBoardingPage(page).pageHeader;
        await page.isVisible("text='Onboarding'")
    });

    test("RDTC1003: Check login with invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.doLogIn("aliaksandr.sinkevich+da12@hotmail.com", "Test1234!@#$");

        const closeErrorElement = loginPage.closeErrorMsgIcon;
        const errorMsgElement = loginPage.errorMsg;

        await expect(loginPage.errorMsgIcon).toBeVisible({ timeout: 10000 });
        await expect(closeErrorElement).toBeVisible();

        await expect(errorMsgElement).toBeVisible({ timeout: 10000 });
        await expect(errorMsgElement).toHaveText(Constant.LOGIN_ERROR_MSG);

        await loginPage.clickOnElement(closeErrorElement);
        await loginPage.doLogIn("aliaksandr.sinkevich+da12@nurdsoft.co", "Test1234!@#$");
    });

    test("RDTC1008: Check if user is able to logout", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.doLogIn("komal.padaria+d2@nurdsoft.co", "Admin@12345#");

        await page.waitForTimeout(10000);
        await new HeaderPage(page).doLogout();

        await expect(page).toHaveURL(baseURL + "");
        await expect(loginPage.emailField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginBtn).toBeVisible();

        await loginPage.openUrl(Constant.DASHBOARD);

        await expect(loginPage.emailField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginBtn).toBeVisible();

        await loginPage.doLogIn("komal.padaria+d2@nurdsoft.co", "Admin@12345#");
        await new HeaderPage(page).doLogout();

    });
});
