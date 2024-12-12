import { LoginSteps } from '../steps/LoginSteps';
import { HeaderSteps } from '../steps/HeaderSteps';
import { ProductListSteps } from '../steps/ProductListSteps';
import { CartSteps } from '../steps/CartSteps';
import { CheckoutInformationSteps } from '../steps/CheckoutInformationSteps';
import { CheckoutOverviewSteps } from '../steps/CheckoutOverviewSteps';
import { CheckoutCompleteSteps } from '../steps/CheckoutCompleteSteps';
import { SortOptions } from '../utils/constants/Constants';
import { SortPopupSteps } from '../steps/SortPopupSteps';
import { CommonTestUtils } from '../utils/CommonTestUtils';

describe('iOS E2E Test', async () => {
    const loginSteps = new LoginSteps();
    const headerSteps = new HeaderSteps();
    const productListSteps = new ProductListSteps();
    const cartSteps = new CartSteps();
    const checkoutInformationSteps = new CheckoutInformationSteps();
    const checkoutOverviewSteps = new CheckoutOverviewSteps();
    const checkoutCompleteSteps = new CheckoutCompleteSteps();
    const sortPopupSteps = new SortPopupSteps();
    const commonTestUtils = new CommonTestUtils();
    const BUNDLE_ID = process.env.APP_BUNDLE_ID_IOS || 'com.saucelabs.SwagLabsMobileApp';

    // Restart the app before each test
    beforeEach(async () => {
        console.log('Restarting the app...');
        await driver.execute('mobile: terminateApp', { bundleId: BUNDLE_ID });
        console.log('App terminated successfully.');
        await driver.execute('mobile: activateApp', { bundleId: BUNDLE_ID });
        console.log('App restarted successfully.');
    });

    // Close the app after each test
    afterEach(async () => {
        console.log('Terminating the app...');
        await driver.execute('mobile: terminateApp', { bundleId: BUNDLE_ID });
        console.log('App terminated successfully.');
    });

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
