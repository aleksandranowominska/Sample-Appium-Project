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
     * Fetches all product titles from the list by scrolling until the footer is visible.
     * Ensures no duplicate titles are collected and handles lazy-loading lists.
     * @returns {Promise<string[]>} - An array of product titles.
     */
    async getProductTitles(): Promise<string[]> {
        console.log('Fetching all product titles from the list...');
        const titles: string[] = [];
        const seenTitles = new Set<string>();

        let footerVisible = false;
        let attempt = 0;
        const maxScrolls = 10;

        while (!footerVisible && attempt < maxScrolls) {
            console.log(`Scroll attempt #${attempt + 1}`);
            const elements = await $$(this.productItemTitleSelector);

            for (const element of elements) {
                if (await element.isDisplayed()) {
                    const title = await element.getText();
                    if (!seenTitles.has(title)) {
                        seenTitles.add(title);
                        titles.push(title);
                    }
                }
            }

            footerVisible = await this.isElementDisplayed(this.footerTextSelector);

            if (!footerVisible) {
                try {
                    console.log('Scrolling to footer...');
                    await scrollToElementAndroid(this.footerTextSelector);
                    await browser.pause(300); // allow lazy-loaded elements to appear
                } catch (error) {
                    console.warn('Scroll attempt failed or footer already visible.');
                    break;
                }
            }

            attempt++;
        }

        console.log('Final product title list:', titles);
        return titles;
    }

    /**
    * Fetches all product prices from the list by scrolling until the footer is visible.
    * Ensures no duplicate prices are collected and handles lazy-loading lists.
    * @returns {Promise<string[]>} - An array of product prices (e.g., ["$9.99", "$14.99"]).
    */
    async getProductPrices(): Promise<string[]> {
        console.log('Fetching all product prices from the list...');
        const prices: string[] = [];
        const seenPrices = new Set<string>();

        let footerVisible = false;
        let attempt = 0;
        const maxScrolls = 10;

        while (!footerVisible && attempt < maxScrolls) {
            console.log(`Scroll attempt #${attempt + 1}`);
            const elements = await $$(this.priceSelector);

            for (const element of elements) {
                if (await element.isDisplayed()) {
                    const price = await element.getText();
                    if (!seenPrices.has(price)) {
                        seenPrices.add(price);
                        prices.push(price);
                    }
                }
            }

            footerVisible = await this.isElementDisplayed(this.footerTextSelector);

            if (!footerVisible) {
                try {
                    console.log('Scrolling to footer...');
                    await scrollToElementAndroid(this.footerTextSelector);
                    await browser.pause(300); // allow lazy-loaded elements to appear
                } catch (error) {
                    console.warn('Scroll attempt failed or footer already visible.');
                    break;
                }
            }

            attempt++;
        }

        console.log('Final product price list:', prices);
        return prices;
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
    * Verifies whether the products are sorted alphabetically in ascending or descending order.
    * @param {string[]} productTitles - An array of product titles.
    * @param {boolean} ascending - True if sorting should be ascending; False for descending.
    * @returns {boolean} - True if products are sorted correctly; False otherwise.
    */
    verifyProductTitleOrder(productTitles: string[], ascending: boolean = true): boolean {
        console.log(`Verifying product order. Ascending: ${ascending}`);
        const sortedTitles = [...productTitles].sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a));
        const isOrderCorrect = JSON.stringify(productTitles) === JSON.stringify(sortedTitles);

        console.log('Original titles:', productTitles);
        console.log('Expected sorted titles:', sortedTitles);
        console.log('Is order correct:', isOrderCorrect);

        return isOrderCorrect;
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
