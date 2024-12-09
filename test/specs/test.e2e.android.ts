import { LoginSteps } from '../steps/LoginSteps';

describe('Android E2E Tests', () => {
    const loginSteps = new LoginSteps();

    it('Place order - happy path', async () => {
        console.log('Starting test for login screen elements and login functionality...');

        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify that all elements on the login screen are displayed
        await loginSteps.verifyLoginScreenElements();
        console.log('Login screen elements verified successfully.');

        // Perform login with provided credentials
        await loginSteps.logIn();
        console.log('Login process completed successfully.');
    });
});
