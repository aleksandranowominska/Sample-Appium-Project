import { LoginSteps } from '../steps/LoginSteps';
import { HeaderSteps } from '../steps/HeaderSteps';
import { ProductListSteps } from '../steps/ProductListSteps';
import { FooterSteps } from '../steps/FooterSteps';

describe('iOS E2E Test', async () => {
    const loginSteps = new LoginSteps();
    const headerSteps = new HeaderSteps();
    const productListSteps = new ProductListSteps();
    const footerSteps = new FooterSteps();

    it('place order - happy path', async () => {
        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify login screen elements
        await loginSteps.verifyLoginScreenElements();

        // Perform login
        await loginSteps.logIn();

        // Wait for header elements to appear
        console.log('Waiting for header elements to appear...');
        await headerSteps.waitForHeaderElements();

        // Verify product list elements
        await productListSteps.verifyProductListElements();

        // Verify footer elements
        console.log('Verifying footer elements...');
        await footerSteps.verifyFooter();
    });
});
