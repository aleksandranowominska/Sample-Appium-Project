import { ProductListScreen } from '../pageobjects/screens/ProductListScreen';

export class ProductListSteps {
    private productListScreen: ProductListScreen;
    private selectedProductName: string | null = null;
    private selectedProductPrice: string | null = null;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing ProductListSteps for platform: ${platform}`);
        this.productListScreen = new ProductListScreen(platform);
    }

    /**
     * Verifies if the product list page is visible by checking for "Add to Cart" buttons.
     * Throws an error if no "Add to Cart" button is displayed.
     * @returns {Promise<void>} - Resolves once the visibility is confirmed.
     */
    async verifyPageIsVisible(): Promise<void> {
        console.log('Verifying if the product list page is visible...');
        const isPageVisible = await this.productListScreen.isAnyAddToCartButtonVisible();
        console.log('Is the product list page visible ("Add to Cart" button displayed):', isPageVisible);

        if (!isPageVisible) {
            throw new Error('The product list page is not visible. No "Add to Cart" button is displayed.');
        }

        expect(isPageVisible).toBe(true);
    }

    /**
     * Verifies all unique and key elements on the product list page are displayed.
     * Checks for product titles, prices, and "Add to Cart" buttons.
     * Throws an error if any element is missing.
     * @returns {Promise<void>} - Resolves once all elements are verified.
     */
    async verifyProductListElements(): Promise<void> {
        console.log('Verifying unique elements in the product list...');
        const uniqueElementsDisplayed = await this.productListScreen.verifyUniqueElements();
        console.log('All unique product list elements are displayed:', uniqueElementsDisplayed);
        expect(uniqueElementsDisplayed).toBe(true);

        console.log('Verifying product items and Add to Cart buttons...');
        const productAndButtonsDisplayed = await this.productListScreen.verifyProductAndAddToCartButtons();
        console.log('Products and Add to Cart buttons are displayed:', productAndButtonsDisplayed);
        expect(productAndButtonsDisplayed).toBe(true);
    }

    /**
     * Adds the first product from the list to the cart.
     * Stores the product's name and price for later use.
     * Verifies that the product is successfully added to the cart.
     * @returns {Promise<void>} - Resolves once the product is added to the cart.
     */
    async addFirstProductToCart(): Promise<void> {
        console.log('Adding the first product to cart...');

        this.selectedProductName = await this.productListScreen.getElementText(this.productListScreen.getItemTitleSelector());
        console.log('Selected product name:', this.selectedProductName);

        this.selectedProductPrice = await this.productListScreen.getElementText(this.productListScreen.getPriceSelector());
        console.log('Selected product price:', this.selectedProductPrice);

        await this.productListScreen.tapElement(this.productListScreen.getAddToCartButtonSelector());
        console.log('Add to Cart button tapped for the first product.');

        const addedToCart = await this.productListScreen.checkIfElementAddedToCart();
        console.log('Product successfully added to cart:', addedToCart);
        expect(addedToCart).toBe(true);
    }

    /**
     * Proceeds to the cart page from the product list page.
     * @returns {Promise<void>} - Resolves once the cart page is loaded.
     */
    async proceedToCart(): Promise<void> {
        console.log('Proceeding to the cart...');
        await this.productListScreen.navigateToCart();
        console.log('Navigated to the cart screen.');
    }

    /**
     * Logs the details of the selected product that was added to the cart.
     */
    logSelectedProductDetails(): void {
        if (this.selectedProductName && this.selectedProductPrice) {
            console.log(`Added product to cart: ${this.selectedProductName}, Price: ${this.selectedProductPrice}`);
        } else {
            console.warn('No product details available to log.');
        }
    }

    /**
     * Returns the details (name and price) of the selected product.
     * @returns {{ name: string | null; price: string | null }} - An object containing the product name and price.
     */
    getProductDetails(): { name: string | null; price: string | null } {
        return {
            name: this.selectedProductName,
            price: this.selectedProductPrice,
        };
    }

    /**
     * Returns the name of the selected product.
     * @returns {string | null} - The name of the product or null if no product was selected.
     */
    getSelectedProductName(): string | null {
        return this.selectedProductName;
    }

    /**
     * Returns the price of the selected product.
     * @returns {string | null} - The price of the product or null if no product was selected.
     */
    getSelectedProductPrice(): string | null {
        return this.selectedProductPrice;
    }
}
