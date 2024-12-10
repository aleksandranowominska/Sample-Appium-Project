import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { iOSSelectors } from '../../utils/iOSSelectors';
import { waitForErrorMessage as waitForErrorMessageAndroid } from '../../utils/AndroidUtils';
import { waitForErrorMessage as waitForErrorMessageIOS } from '../../utils/iOSUtils';
import { ErrorMessages } from '../../utils/constants/ErrorMessages';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export class LoginScreen extends BaseScreen {
    private swagLogoSelector: string;
    private usernameSelector: string;
    private passwordSelector: string;
    private loginButtonSelector: string;
    private loginBotSelector: string;
    private errorMessageSelector: string;

    constructor(platform: string) {
        super();
        const selectors = platform === 'Android' ? AndroidSelectors : iOSSelectors;

        this.swagLogoSelector = selectors.swagLogoSelector;
        this.usernameSelector = selectors.usernameSelector;
        this.passwordSelector = selectors.passwordSelector;
        this.loginButtonSelector = selectors.loginButtonSelector;
        this.loginBotSelector = selectors.loginBotSelector;
        this.errorMessageSelector = selectors.errorMessageSelector;
    }

    /**
     * Checks if the login button is visible on the login screen.
     * @returns {Promise<boolean>} - True if the login button is visible, otherwise false.
     */
    async isLoginButtonVisible(): Promise<boolean> {
        const isLoginButtonDisplayed = await this.isElementDisplayed(this.loginButtonSelector);

        console.log('Login button display status:', isLoginButtonDisplayed);

        return isLoginButtonDisplayed;
    }

    /**
     * Verifies if all key elements on the login screen are displayed.
     * @returns {Promise<boolean>} - True if all elements are displayed, otherwise false.
     */
    async areElementsDisplayed(): Promise<boolean> {
        const elementsStatus: { [key: string]: boolean } = {};

        elementsStatus['Swag logo'] = await this.isElementDisplayed(this.swagLogoSelector);
        elementsStatus['Username field'] = await this.isElementDisplayed(this.usernameSelector);
        elementsStatus['Password field'] = await this.isElementDisplayed(this.passwordSelector);
        elementsStatus['Login button'] = await this.isElementDisplayed(this.loginButtonSelector);
        elementsStatus['Login bot'] = await this.isElementDisplayed(this.loginBotSelector);

        console.log('Elements display status:', elementsStatus);

        // Check if all elements are displayed
        const allElementsDisplayed = Object.values(elementsStatus).every((status) => status);
        return allElementsDisplayed;
    }

    /**
     * Logs in using credentials provided in the `.env` file.
     * Throws an error if USERNAME or PASSWORD is missing.
     * @returns {Promise<void>} - Resolves once the login is performed.
     */
    async login(): Promise<void> {
        const username = process.env.USERNAME || '';
        const password = process.env.PASSWORD || '';

        if (!username || !password) {
            throw new Error('Missing USERNAME or PASSWORD in .env file');
        }

        console.log('Logging in with username:', username);
        await this.typeText(this.usernameSelector, username);
        console.log('Username entered successfully.');

        await this.typeText(this.passwordSelector, password);
        console.log('Password entered successfully.');

        await this.tapElement(this.loginButtonSelector);
        console.log('Login button tapped successfully.');
    }

    /**
     * Attempts to log in without entering any credentials.
     * @returns {Promise<{ errorMessage: string; isErrorVisible: boolean }>} - Returns the error message and its visibility.
     */
    async attemptLoginWithoutCredentials(): Promise<{ errorMessage: string; isErrorVisible: boolean }> {
        console.log('Attempting login without entering any credentials...');
        await this.tapElement(this.loginButtonSelector);

        const waitForError = driver.isIOS ? waitForErrorMessageIOS : waitForErrorMessageAndroid;
        const errorMessage = await waitForError(this.errorMessageSelector, ErrorMessages.USERNAME_REQUIRED);
        console.log('Error message:', errorMessage);

        return { errorMessage, isErrorVisible: true };
    }

    /**
     * Attempts to log in using only a username without a password.
     * @returns {Promise<{ errorMessage: string; isErrorVisible: boolean }>} - Returns the error message and its visibility.
     */
    async attemptLoginWithOnlyUsername(): Promise<{ errorMessage: string; isErrorVisible: boolean }> {
        const username = process.env.USERNAME || 'test_user';
        console.log(`Attempting login with only username: ${username}`);

        await this.typeText(this.usernameSelector, username);
        console.log('Username entered successfully.');

        await this.tapElement(this.loginButtonSelector);

        const waitForError = driver.isIOS ? waitForErrorMessageIOS : waitForErrorMessageAndroid;
        const errorMessage = await waitForError(this.errorMessageSelector, ErrorMessages.PASSWORD_REQUIRED);
        console.log('Error message:', errorMessage);

        return { errorMessage, isErrorVisible: true };
    }
}
