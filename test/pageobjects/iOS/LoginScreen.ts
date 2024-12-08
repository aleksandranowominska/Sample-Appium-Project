import { BaseScreen } from '../BaseScreen';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export class LoginScreen extends BaseScreen {
    // Selectors for iOS elements
    private swagLogoSelector = '//XCUIElementTypeImage[@name="assets/src/img/swag-labs-logo.png"]';
    private usernameSelector = 'id=test-Username';
    private passwordSelector = 'id=test-Password';
    private loginButtonSelector = 'id=test-LOGIN';
    private loginBotSelector = '//XCUIElementTypeImage[@name="assets/src/img/login-bot.png"]';

    // Check if all key elements on the login screen are displayed
    async areElementsDisplayed(): Promise<boolean> {
        const logoDisplayed = await this.isElementDisplayed(this.swagLogoSelector);
        console.log('Swag logo displayed:', logoDisplayed);

        const usernameDisplayed = await this.isElementDisplayed(this.usernameSelector);
        console.log('Username field displayed:', usernameDisplayed);

        const passwordDisplayed = await this.isElementDisplayed(this.passwordSelector);
        console.log('Password field displayed:', passwordDisplayed);

        const loginButtonDisplayed = await this.isElementDisplayed(this.loginButtonSelector);
        console.log('Login button displayed:', loginButtonDisplayed);

        const loginBotDisplayed = await this.isElementDisplayed(this.loginBotSelector);
        console.log('Login bot displayed:', loginBotDisplayed);

        return (
            logoDisplayed &&
            usernameDisplayed &&
            passwordDisplayed &&
            loginButtonDisplayed &&
            loginBotDisplayed
        );
    }

    // Log in using credentials from .env
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
}
