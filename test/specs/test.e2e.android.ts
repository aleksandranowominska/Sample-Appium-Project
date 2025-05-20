import { LoginSteps } from '../steps/LoginSteps';
import { HeaderSteps } from '../steps/HeaderSteps';
import { ProductListSteps } from '../steps/ProductListSteps';
import { CartSteps } from '../steps/CartSteps';
import { CheckoutInformationSteps } from '../steps/CheckoutInformationSteps';
import { CheckoutOverviewSteps } from '../steps/CheckoutOverviewSteps';
import { CheckoutCompleteSteps } from '../steps/CheckoutCompleteSteps';
import { CommonTestUtils } from '../utils/CommonTestUtils';
import { SortPopupSteps } from '../steps/SortPopupSteps';
import { SortOptions } from '../utils/constants/Constants';

describe('Android E2E Tests', () => {
    const loginSteps = new LoginSteps();
    const headerSteps = new HeaderSteps();
    const productListSteps = new ProductListSteps();
    const cartSteps = new CartSteps();
    const checkoutInformationSteps = new CheckoutInformationSteps();
    const checkoutOverviewSteps = new CheckoutOverviewSteps();
    const checkoutCompleteSteps = new CheckoutCompleteSteps();
    const commonTestUtils = new CommonTestUtils();
    const sortPopupSteps = new SortPopupSteps();
    const APP_ID = process.env.APP_ID_ANDROID || 'com.swaglabsmobileapp';

    // Restart the app before each test
    beforeEach(async () => {
        console.log('Restarting the app...');
        await driver.execute('mobile: terminateApp', { appId: APP_ID });
        console.log('App terminated successfully.');
        await driver.execute('mobile: activateApp', { appId: APP_ID });
        console.log('App restarted successfully.');
    });

    // Close the app after each test
    afterEach(async () => {
        console.log('Terminating the app...');
        await driver.execute('mobile: terminateApp', { appId: APP_ID });
        console.log('App terminated successfully.');
    });

    it('should add product to the cart', async () => {
        // Login to standard account using CommonTestUtils helper
        await commonTestUtils.loginToStandardAccount(loginSteps, headerSteps);

        // Add the first product to cart
        await productListSteps.addFirstProductToCart();
        console.log('First product added to cart successfully.');

        // Log product details
        productListSteps.logSelectedProductDetails();

        // Retrieve product details
        const { name: expectedName, price: expectedPrice } = productListSteps.getProductDetails(); 

        // Navigate to the cart
        await productListSteps.proceedToCart();
        console.log('Successfully navigated to the cart screen.'); 

        // Verify cart elements
        await cartSteps.verifyCartElements();
        console.log('Cart elements verified successfully.');

        // Verify product quantity in the cart
        console.log('Verifying product quantity...');
        await cartSteps.verifyProductQuantity('1');
        console.log('Product quantity verified successfully.');
        // Verify product details in the cart
        console.log(`Verifying product details in cart: ${expectedName}, ${expectedPrice}`);
        await commonTestUtils.verifyProductDetails(
            cartSteps.getCartScreen().getProductNameSelector(),
            cartSteps.getCartScreen().getProductPriceSelector(),
            expectedName!,
            expectedPrice!
        );
            console.log('Product details in cart verified successfully.');
        });

    it('should open shopping cart and fill out the form', async () => {
        // Login to standard account using CommonTestUtils helper
        await commonTestUtils.loginToStandardAccount(loginSteps, headerSteps);

         // Add the first product to cart
        await productListSteps.addFirstProductToCart();
        console.log('First product added to cart successfully.');

         // Navigate to the cart
        await productListSteps.proceedToCart();
        console.log('Successfully navigated to the cart screen.'); 

        // Tap the checkout button
        console.log('Tapping the checkout button...');
        await cartSteps.tapCheckoutButton();

        // Verify checkout information screen elements
        console.log('Verifying checkout information elements...');
        await checkoutInformationSteps.verifyCheckoutInformationElements();
        console.log('Checkout information elements verified successfully.');

        // Fill out checkout form
        console.log('Filling out the checkout form and proceeding...');
        await checkoutInformationSteps.fillOutCheckoutForm();
        console.log('Checkout form filled successfully.');
    });

    it('should verify order details on checkout overview screen', async () => {
        // Login to standard account using CommonTestUtils helper
        await commonTestUtils.loginToStandardAccount(loginSteps, headerSteps);

         // Add the first product to cart
        await productListSteps.addFirstProductToCart();
        console.log('First product added to cart successfully.');

        // Log product details
        productListSteps.logSelectedProductDetails();

        // Retrieve product details
        const { name: expectedName, price: expectedPrice } = productListSteps.getProductDetails();

         // Navigate to the cart
        await productListSteps.proceedToCart();
        console.log('Successfully navigated to the cart screen.'); 

        // Tap the checkout button
        console.log('Tapping the checkout button...');
        await cartSteps.tapCheckoutButton();

        // Fill out checkout form and continue
        console.log('Filling out the checkout form and proceeding...');
        await checkoutInformationSteps.fillOutCheckoutForm(true);
        console.log('Checkout form filled and proceeded successfully.');

        // Verify product details in checkout overview
        console.log(`Verifying product details in checkout overview: ${expectedName}, ${expectedPrice}`);
        await commonTestUtils.verifyProductDetails(
            checkoutOverviewSteps.getCheckoutOverviewScreen().getOverviewProductNameSelector(),
            checkoutOverviewSteps.getCheckoutOverviewScreen().getOverviewProductPriceSelector(),
            expectedName!,
            expectedPrice!
        );

        // Verify checkout overview screen elements
        console.log('Verifying checkout overview elements...');
        await checkoutOverviewSteps.verifyCheckoutOverviewElements();
        console.log('Checkout overview elements verified successfully.');

        // Verify total price
        console.log('Verifying total price calculation...');
        await checkoutOverviewSteps.verifyTotalPrice();
        console.log('Total price calculation verified successfully.');
    });

    it('should place order - happy path', async () => {
        // Login to standard account using CommonTestUtils helper
        await commonTestUtils.loginToStandardAccount(loginSteps, headerSteps);

         // Add the first product to cart
        await productListSteps.addFirstProductToCart();
        console.log('First product added to cart successfully.');

         // Navigate to the cart
        await productListSteps.proceedToCart();
        console.log('Successfully navigated to the cart screen.'); 

        // Tap the checkout button
        console.log('Tapping the checkout button...');
        await cartSteps.tapCheckoutButton();

        // Fill out checkout form and continue
        console.log('Filling out the checkout form and proceeding...');
        await checkoutInformationSteps.fillOutCheckoutForm(true);
        console.log('Checkout form filled and proceeded successfully.');

        // Tap the finish button to complete the checkout
        console.log('Tapping the finish button...');
        await checkoutOverviewSteps.tapFinish();
        console.log('Checkout process completed successfully.');

        // Verify checkout complete screen elements
        console.log('Verifying checkout complete elements...');
        await checkoutCompleteSteps.verifyCheckoutCompleteElements();
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

    it('should sort the product with name', async () => {
        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify login screen is visible
        await loginSteps.verifyPageIsVisible();

        // Perform login
        await loginSteps.logIn();

        // Verify product list screen is visible
        await productListSteps.verifyPageIsVisible();

        // Toggle the view to ListView (from GridView)
        console.log('Toggling to ListView...');
        await productListSteps.toggleProductView();
        console.log('Successfully toggled to ListView.');

        // Open the modal for sorting or filtering products
        console.log('Opening filter/sort modal...');
        await productListSteps.openFilterOrSortModal();
        console.log('Filter/sort modal opened successfully.');

        // Apply the sort filter
        await sortPopupSteps.applySortOption(SortOptions.NAME_ASC);

        // Fetch and verify the sorted product titles
        const sortedTitles = await productListSteps.fetchAndVerifySortedProductTitles(true);
        console.log('Products are sorted correctly in ascending order:', sortedTitles);
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
