import { LoginSteps } from '../steps/LoginSteps';
import { HeaderSteps } from '../steps/HeaderSteps';
import { ProductListSteps } from '../steps/ProductListSteps';
import { CartSteps } from '../steps/CartSteps';
import { CheckoutInformationSteps } from '../steps/CheckoutInformationSteps';
import { CheckoutOverviewSteps } from '../steps/CheckoutOverviewSteps';
import { CheckoutCompleteSteps } from '../steps/CheckoutCompleteSteps';

describe('Android E2E Tests', () => {
    const loginSteps = new LoginSteps();
    const headerSteps = new HeaderSteps();
    const productListSteps = new ProductListSteps();
    const cartSteps = new CartSteps();
    const checkoutInformationSteps = new CheckoutInformationSteps();
    const checkoutOverviewSteps = new CheckoutOverviewSteps();
    const checkoutCompleteSteps = new CheckoutCompleteSteps();

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

        // Verify cart elements
        console.log('Verifying cart elements...');
        await cartSteps.verifyCartElements();

        // Verify product quantity in the cart
        console.log('Verifying product quantity...');
        await cartSteps.verifyProductQuantity('1');

        // Tap the checkout button
        console.log('Tapping the checkout button...');
        await cartSteps.tapCheckoutButton();

        // Verify checkout information screen elements
        console.log('Verifying checkout information elements...');
        await checkoutInformationSteps.verifyCheckoutInformationElements();
        console.log('Checkout information elements verified successfully.');

        // Fill out checkout form and continue
        console.log('Filling out the checkout form and proceeding...');
        await checkoutInformationSteps.fillOutCheckoutFormAndContinue();
        console.log('Checkout form filled and proceeded successfully.');

        // Verify checkout overview screen elements
        console.log('Verifying checkout overview elements...');
        await checkoutOverviewSteps.verifyCheckoutOverviewElements();
        console.log('Checkout overview elements verified successfully.');

        // Verify total price
        console.log('Verifying total price calculation...');
        await checkoutOverviewSteps.verifyTotalPrice();
        console.log('Total price calculation verified successfully.');

        // Tap the finish button to complete the checkout
        console.log('Tapping the finish button...');
        await checkoutOverviewSteps.tapFinish();
        console.log('Checkout process completed successfully.');

        // Verify checkout complete screen elements
        console.log('Verifying checkout complete elements...');
        const isCheckoutComplete = await checkoutCompleteSteps.verifyCheckoutCompleteElements();
        console.log('Checkout complete screen elements verified:', isCheckoutComplete);
        expect(isCheckoutComplete).toBe(true);
    });
});
