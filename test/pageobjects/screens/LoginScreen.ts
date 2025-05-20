import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { waitForErrorMessage as waitForErrorMessageAndroid } from '../../utils/AndroidUtils';
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

    constructor() {
        super();
        const selectors = AndroidSelectors;

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
     * Asserts that all key elements on the login screen are displayed.
     * Throws an error if any element is not visible.
     * @returns {Promise<void>}
     */
    async assertLoginScreenElementsVisible(): Promise<void> {
        const elementsToCheck = [
            { name: 'Swag logo', selector: this.swagLogoSelector },
            { name: 'Username field', selector: this.usernameSelector },
            { name: 'Password field', selector: this.passwordSelector },
            { name: 'Login button', selector: this.loginButtonSelector },
            { name: 'Login bot', selector: this.loginBotSelector }
        ];

        const failedElements: string[] = [];

        for (const { name, selector } of elementsToCheck) {
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`${name} displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                failedElements.push(name);
            }
        }

        if (failedElements.length > 0) {
            throw new Error(`The following login screen elements are missing: ${failedElements.join(', ')}`);
        }

        console.log('All login screen elements are visible.');
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

        const errorMessage = await waitForErrorMessageAndroid(this.errorMessageSelector, ErrorMessages.USERNAME_REQUIRED);
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

        const errorMessage = await waitForErrorMessageAndroid(this.errorMessageSelector, ErrorMessages.PASSWORD_REQUIRED);
        console.log('Error message:', errorMessage);

        return { errorMessage, isErrorVisible: true };
    }
}
