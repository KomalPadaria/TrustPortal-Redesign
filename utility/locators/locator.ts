export class LocatorValue {

    // Common locators from application
    static readonly pageHeader = 'main.main-content';
    static readonly headerTag6 = ' h6';
    static readonly headerTag2 = ' h2';

    // Login Page Selectors
    static readonly emailTxtField = '#Email';
    static readonly passwordTxtField = '#password';
    static readonly loginBtn = 'button.MuiButtonBase-root';
    static readonly forgotPwdLnk = 'a.MuiLink-root';
    static readonly errorIcon = 'div[class*="toast-icon"]';
    static readonly errorMsg = 'div[role="alert"] > div:nth-child(2)';
    static readonly errorCloseIcon = 'button[aria-label="close"]';

    // Header Page Selectors
    static readonly profileDropDown = '//*[@id="root"]/div[2]/header/div[2]/div';
    //static readonly signOutOption = '.MuiPaper-root > .MuiList-root > [tabindex="-1"]';
    static readonly signOutOption = '//*[@id="basic-menu"]/div[3]/ul/li[3]';
}