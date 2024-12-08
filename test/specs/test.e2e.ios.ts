import { LoginSteps } from '../steps/LoginSteps';

describe('iOS E2E Test', async () => {
    const loginSteps = new LoginSteps();

    it('place order - happy path', async () => {
        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify login screen elements
        await loginSteps.verifyLoginScreenElements();
    });

    it('should log in with valid credentials', async () => {
        // Verify login screen elements
        await loginSteps.verifyLoginScreenElements();

        // Perform login
        await loginSteps.logIn();
    });
});
