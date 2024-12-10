import { LoginSteps } from '../steps/LoginSteps';
import { HeaderSteps } from '../steps/HeaderSteps';
import { ProductListSteps } from '../steps/ProductListSteps';
import { CartSteps } from '../steps/CartSteps';
import { CheckoutInformationSteps } from '../steps/CheckoutInformationSteps';
import { CheckoutOverviewSteps } from '../steps/CheckoutOverviewSteps';
import { CheckoutCompleteSteps } from '../steps/CheckoutCompleteSteps';
import { CommonTestUtils } from '../utils/CommonTestUtils';

describe('iOS E2E Test', async () => {
    const loginSteps = new LoginSteps();
    const headerSteps = new HeaderSteps();
    const productListSteps = new ProductListSteps();;
    const cartSteps = new CartSteps();
    const checkoutInformationSteps = new CheckoutInformationSteps();
    const checkoutOverviewSteps = new CheckoutOverviewSteps();
    const checkoutCompleteSteps = new CheckoutCompleteSteps();
    const commonTestUtils = new CommonTestUtils();

    it('should place order - happy path', async () => {
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

        // Add the first product to cart
        await productListSteps.addFirstProductToCart();

        // Log product details
        productListSteps.logSelectedProductDetails();

        // Navigate to the cart
        await productListSteps.proceedToCart();

        // Verify cart elements
        await cartSteps.verifyCartElements();

        // Verify product quantity
        await cartSteps.verifyProductQuantity('1');

        // Verify product details using TestUtils
        const { name: expectedName, price: expectedPrice } = productListSteps.getProductDetails();
        console.log(`Verifying product details in cart: ${expectedName}, ${expectedPrice}`);
        await commonTestUtils.verifyProductDetails(
            cartSteps.getCartScreen().getProductNameSelector(),
            cartSteps.getCartScreen().getProductPriceSelector(),
            expectedName!,
            expectedPrice!
        );

        await cartSteps.tapCheckoutButton();

        await checkoutInformationSteps.verifyCheckoutInformationElements();
        await checkoutInformationSteps.fillOutCheckoutFormAndContinue();

        // Verify product details in checkout overview using TestUtils
        console.log(`Verifying product details in checkout overview: ${expectedName}, ${expectedPrice}`);
        await commonTestUtils.verifyProductDetails(
            checkoutOverviewSteps.getCheckoutOverviewScreen().getOverviewProductNameSelector(),
            checkoutOverviewSteps.getCheckoutOverviewScreen().getOverviewProductPriceSelector(),
            expectedName!,
            expectedPrice!
        );

        // Verify checkout overview elements
        await checkoutOverviewSteps.verifyCheckoutOverviewElements();

        // Verify total price calculation in checkout overview
        await checkoutOverviewSteps.verifyTotalPrice();

        // Complete the checkout process
        await checkoutOverviewSteps.tapFinish();

        // Verify elements on the Checkout Complete screen
        console.log('Verifying elements on the Checkout Complete screen...');
        const areCompleteScreenElementsVisible = await checkoutCompleteSteps.verifyCheckoutCompleteElements();
        expect(areCompleteScreenElementsVisible).toBe(true);
        console.log('All elements on Checkout Complete screen are visible.');

        console.log('Order placed successfully!');
    });

    it('should remove item from the cart', async () => {
        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();
    
        // Verify login screen is visible
        await loginSteps.verifyPageIsVisible();
    
        // Perform login
        await loginSteps.logIn();
    
        // Verify product list screen is visible
        await productListSteps.verifyPageIsVisible();
    
        // Add the first product to cart
        await productListSteps.addFirstProductToCart();
    
        // Log product details
        const { name: expectedName, price: expectedPrice } = productListSteps.getProductDetails();
        console.log(`Selected product: ${expectedName}, ${expectedPrice}`);
    
        // Navigate to the cart
        await productListSteps.proceedToCart();
    
        // Verify cart screen is visible
        await cartSteps.verifyPageIsVisible();
    
        // Verify product quantity
        await cartSteps.verifyProductQuantity('1');
    
        // Verify product details
        await commonTestUtils.verifyProductDetails(
            cartSteps.getCartScreen().getProductNameSelector(),
            cartSteps.getCartScreen().getProductPriceSelector(),
            expectedName!,
            expectedPrice!
        );
    
        // Remove the product and verify it's removed
        await cartSteps.removeProductAndVerifyRemoval(expectedName!);
    });

    it('should display errors for empty fields while login', async () => {
        await loginSteps.waitForSplashScreen();
        await loginSteps.verifyLoginScreenElements();

        // Verify error for empty fields
        await loginSteps.verifyErrorForEmptyFields();

        // Verify error for missing password
        await loginSteps.verifyErrorForMissingPassword();
    });
});
