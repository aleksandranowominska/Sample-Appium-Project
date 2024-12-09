import { LoginSteps } from '../steps/LoginSteps';
import { HeaderSteps } from '../steps/HeaderSteps';
import { ProductListSteps } from '../steps/ProductListSteps';

describe('Android E2E Tests', () => {
    const loginSteps = new LoginSteps();
    const headerSteps = new HeaderSteps();
    const productListSteps = new ProductListSteps();

    it('Place order - happy path', async () => {

        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify login screen elements
        await loginSteps.verifyLoginScreenElements();
        console.log('Login screen elements verified successfully.');

        // Perform login
        await loginSteps.logIn();
        console.log('Login process completed successfully.');

        // Wait for header elements to appear
        console.log('Waiting for header elements to appear...');
        await headerSteps.waitForHeaderElements();
        console.log('Header elements are displayed successfully.');

        // Verify product list elements
        console.log('Verifying product list elements...');
        await productListSteps.verifyProductListElements();
        console.log('Product list elements verified successfully.');

        // Add the first product to cart
        console.log('Adding the first product to cart...');
        await productListSteps.addFirstProductToCart();
        console.log('First product added to cart successfully.');

        // Log product details
        productListSteps.logSelectedProductDetails();

        // Navigate to the cart
        console.log('Navigating to the cart...');
        await productListSteps.proceedToCart();
        console.log('Successfully navigated to the cart screen.');

        //TODO: To delete
        // Wait for 5 seconds to observe the state of the app - for development purpose
        console.log('Waiting for 5 seconds to observe the app...');
        await browser.pause(5000);
        console.log('Test execution completed.');
    });
});
