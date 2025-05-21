import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { scrollToElementAndroid } from '../../utils/AndroidUtils';

export class ProductListScreen extends BaseScreen {
    protected productsTitleSelector: string;
    protected toggleButtonSelector: string;
    protected modalSelectorButtonSelector: string;
    protected addToCartButtonSelector: string;
    protected removeButtonSelector: string;
    protected itemTitleSelector: string;
    protected priceSelector: string;
    protected cartBadgeSelector: string;
    protected cartButtonSelector: string;
    protected productItemTitleSelector: string;
    protected footerTextSelector: string;

    constructor() {
        super();
        const selectors = AndroidSelectors;
        this.productsTitleSelector = selectors.productsTitleSelector;
        this.toggleButtonSelector = selectors.toggleButtonSelector;
        this.modalSelectorButtonSelector = selectors.modalSelectorButtonSelector;
        this.addToCartButtonSelector = selectors.addToCartButtonSelector;
        this.removeButtonSelector = selectors.removeButtonSelector;
        this.itemTitleSelector = selectors.itemTitleSelector;
        this.priceSelector = selectors.priceSelector;
        this.cartBadgeSelector = selectors.cartBadgeSelector;
        this.cartButtonSelector = selectors.cartButtonSelector;
        this.productItemTitleSelector = selectors.productItemTitleSelector;
        this.footerTextSelector = selectors.footerTextSelector;
    }

    /**
    * Retrieves all unique product titles from the product list screen.
    * Internally scrolls the view until the footer is visible to ensure all lazy-loaded items are fetched.
    * Uses `getVisibleTextsFromList()` from BaseScreen to avoid duplicates and ensure completeness.
    *
    * @returns {Promise<string[]>} - An array of unique product titles.
    */
    async getProductTitles(): Promise<string[]> {
        return this.getVisibleTextsFromList(this.productItemTitleSelector, this.footerTextSelector, 'product title');
    }

    /**
     * Retrieves all unique product prices from the product list screen.
     * Scrolls through the list until the footer is visible to fetch all prices, including those loaded lazily.
     * Delegates to `getVisibleTextsFromList()` to extract clean, non-duplicate values.
     *
     * @returns {Promise<string[]>} - An array of unique product prices (e.g., ["$9.99", "$29.99"]).
     */
    async getProductPrices(): Promise<string[]> {
        return this.getVisibleTextsFromList(this.priceSelector, this.footerTextSelector, 'product price');
    }

    async isAnyAddToCartButtonVisible(): Promise<boolean> {
        console.log('Checking if any "Add to Cart" button is visible...');
        try {
            await this.waitForDisplayed(this.addToCartButtonSelector);
            console.log('"Add to Cart" button is visible.');
            return true;
        } catch {
            console.log('"Add to Cart" button is not visible within the timeout.');
            return false;
        }
    }

    /**
     * Asserts that the key header elements on the product list screen are displayed.
     * Throws an error if any element is not visible.
     * @returns {Promise<void>}
     */
    async assertProductListHeaderElementsVisible(): Promise<void> {
        const elements = [
            { name: 'Products Title', selector: this.productsTitleSelector },
            { name: 'Toggle Button', selector: this.toggleButtonSelector },
            { name: 'Modal Selector Button', selector: this.modalSelectorButtonSelector },
        ];

        const missing: string[] = [];

        for (const { name, selector } of elements) {
            await this.scrollTo(selector);
            const visible = await this.isElementDisplayed(selector);
            console.log(`${name} visible: ${visible}`);
            if (!visible) missing.push(name);
        }

        if (missing.length > 0) {
            throw new Error(`Missing product list header elements: ${missing.join(', ')}`);
        }

        console.log('All product list header elements are visible.');
    }

    /**
     * Asserts that product titles, prices, and "Add to Cart" buttons are displayed.
     * Throws an error if any element is not visible.
     * @returns {Promise<void>}
     */
    async assertProductItemsAndButtonsVisible(): Promise<void> {
        const elements = [
            { name: 'Product Titles', selector: this.itemTitleSelector },
            { name: 'Product Prices', selector: this.priceSelector },
            { name: 'Add to Cart Buttons', selector: this.addToCartButtonSelector },
        ];

        const missing: string[] = [];

        for (const { name, selector } of elements) {
            await this.scrollTo(selector);
            const visible = await this.isElementDisplayed(selector);
            console.log(`${name} visible: ${visible}`);
            if (!visible) missing.push(name);
        }

        if (missing.length > 0) {
            throw new Error(`Missing product item elements: ${missing.join(', ')}`);
        }

        console.log('All product item elements are visible.');
    }

    /**
    * Checks if an item is added to the cart by verifying the presence of the "Remove" button and cart badge.
    * @returns {Promise<boolean>} - True if both elements are visible, otherwise false.
    */
    async checkIfElementAddedToCart(): Promise<boolean> {
        const removeButtonDisplayed = await this.isElementDisplayed(this.removeButtonSelector);
        console.log('Remove button displayed:', removeButtonDisplayed);

        const cartBadgeDisplayed = await this.isElementDisplayed(this.cartBadgeSelector);
        console.log('Cart badge displayed:', cartBadgeDisplayed);

        return removeButtonDisplayed && cartBadgeDisplayed;
    }

    /**
    * Navigates to the cart page.
    * Uses platform-specific methods for iOS and Android.
    * @returns {Promise<void>} - Resolves once the navigation is complete.
    */
    async navigateToCart(): Promise<void> {
        console.log('Navigating to the cart...');
        try {
            await $(this.cartButtonSelector).click();
            console.log('Tapped on the cart button successfully.');
        } catch (error) {
            console.error('Failed to tap on the cart button:', error);
            throw error;
        }
    }

    /**
    * Toggles the product view between Grid View and List View by clicking the toggle button.
    * Ensures that the toggle button is clicked successfully.
    * @returns {Promise<void>} - Resolves when the toggle action is complete.
    */
    async toggleToListView(): Promise<void> {
        console.log('Toggling to List View...');
        try {
            await this.waitForDisplayed(this.toggleButtonSelector);
            await $(this.toggleButtonSelector).click();
            console.log('Successfully toggled to List View.');
        } catch (error) {
            console.error('Failed to toggle to List View:', error);
            throw error;
        }
    }

    /**
     * Verifies whether the list of product titles is sorted alphabetically
     * in ascending (A–Z) or descending (Z–A) order.
     * Delegates to the generic `verifySortedOrder` utility from BaseScreen.
     *
     * @param {string[]} titles - Array of product titles to verify.
     * @param {boolean} [ascending=true] - Whether the expected order is ascending.
     * @returns {boolean} - True if the titles are sorted correctly, otherwise false.
     */
    verifyProductTitleOrder(titles: string[], ascending = true): boolean {
        console.log('typeof this.verifySortedOrder:', typeof this.verifySortedOrder);
        return this.verifySortedOrder(titles, ascending);
    }

    /**
     * Verifies whether the list of product prices is sorted numerically
     * in ascending or descending order. Strips currency symbols before comparison.
     * Delegates to the generic `verifySortedOrder` utility from BaseScreen.
     *
     * @param {string[]} prices - Array of price strings (e.g., "$9.99") to verify.
     * @param {boolean} [ascending=true] - Whether the expected order is ascending.
     * @returns {boolean} - True if the prices are sorted correctly, otherwise false.
     */
    verifyProductPriceOrder(prices: string[], ascending = true): boolean {
        return this.verifySortedOrder(prices, ascending, price =>
            parseFloat(price.replace(/[^0-9.]/g, ''))
        );
    }

    /**
    * Clicks on the modal selector button.
    * This opens the modal for filtering or sorting products.
    * @returns {Promise<void>} - Resolves when the button is successfully clicked.
    */
    async clickModalSelectorButton(): Promise<void> {
        console.log('Attempting to click on the modal selector button...');
        try {
            await this.waitForDisplayed(this.modalSelectorButtonSelector);
            const modalButton = await $(this.modalSelectorButtonSelector);
            await modalButton.click();
            console.log('Successfully clicked on the modal selector button.');
        } catch (error) {
            console.error('Failed to click on the modal selector button:', error);
            throw error;
        }
    }

    /**
    * Returns the selector for item titles.
    * @returns {string} - The item title selector.
    */
    public getItemTitleSelector(): string {
        return this.itemTitleSelector;
    }

    /**
    * Returns the selector for product prices.
    * @returns {string} - The price selector.
    */
    public getPriceSelector(): string {
        return this.priceSelector;
    }

    /**
    * Returns the selector for "Add to Cart" buttons.
    * @returns {string} - The "Add to Cart" button selector.
    */
    public getAddToCartButtonSelector(): string {
        return this.addToCartButtonSelector;
    }
}
