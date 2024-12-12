import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class SortPopupScreen extends BaseScreen {
    private sortModalTitleSelector: string;
    private sortByNameAscSelector: string;
    private sortByNameDescSelector: string;
    private sortByPriceLowToHighSelector: string;
    private sortByPriceHighToLowSelector: string;

    constructor() {
        super();
        this.sortModalTitleSelector = AndroidSelectors.sortModalTitleSelector;
        this.sortByNameAscSelector = AndroidSelectors.sortByNameAscSelector;
        this.sortByNameDescSelector = AndroidSelectors.sortByNameDescSelector;
        this.sortByPriceLowToHighSelector = AndroidSelectors.sortByPriceLowToHighSelector;
        this.sortByPriceHighToLowSelector = AndroidSelectors.sortByPriceHighToLowSelector;
    }

    /**
     * Waits for the sort modal title to be displayed.
     * @returns {Promise<void>} - Resolves when the title is displayed.
     */
    async waitForSortModalTitle(): Promise<void> {
        console.log('Waiting for the sort modal title to be displayed...');
        try {
            await this.waitForDisplayed(this.sortModalTitleSelector);
            console.log('Sort modal title is displayed.');
        } catch (error) {
            console.error('Failed to display the sort modal title:', error);
            throw error;
        }
    }

    /**
     * Verifies that all sort options are visible in the modal.
     * @returns {Promise<boolean>} - True if all sort options are visible, otherwise false.
     */
    async verifySortOptionsVisibility(): Promise<boolean> {
        console.log('Verifying the visibility of all sort options...');
        try {
            const sortModalTitleVisible = await this.isElementDisplayed(this.sortModalTitleSelector);
            const sortByNameAscVisible = await this.isElementDisplayed(this.sortByNameAscSelector);
            const sortByNameDescVisible = await this.isElementDisplayed(this.sortByNameDescSelector);
            const sortByPriceLowToHighVisible = await this.isElementDisplayed(this.sortByPriceLowToHighSelector);
            const sortByPriceHighToLowVisible = await this.isElementDisplayed(this.sortByPriceHighToLowSelector);

            console.log('Sort modal title visible:', sortModalTitleVisible);
            console.log('Sort by Name (A to Z) visible:', sortByNameAscVisible);
            console.log('Sort by Name (Z to A) visible:', sortByNameDescVisible);
            console.log('Sort by Price (low to high) visible:', sortByPriceLowToHighVisible);
            console.log('Sort by Price (high to low) visible:', sortByPriceHighToLowVisible);

            return (
                sortModalTitleVisible &&
                sortByNameAscVisible &&
                sortByNameDescVisible &&
                sortByPriceLowToHighVisible &&
                sortByPriceHighToLowVisible
            );
        } catch (error) {
            console.error('Failed to verify sort options visibility:', error);
            throw error;
        }
    }

    /**
     * Applies a selected sort filter by clicking the corresponding option.
     * @param {string} sortOption - The sort option to apply (e.g., "NameAsc", "PriceHighToLow").
     * @returns {Promise<void>} - Resolves when the sort option is applied.
     */
    public async applyFilter(sortOption: string): Promise<void> {
        console.log(`Applying sort filter: ${sortOption}`);
        let selector: string;

        switch (sortOption) {
            case 'Name (A to Z)':
                selector = this.sortByNameAscSelector;
                break;
            case 'Name (Z to A)':
                selector = this.sortByNameDescSelector;
                break;
            case 'Price (low to high)':
                selector = this.sortByPriceLowToHighSelector;
                break;
            case 'Price (high to low)':
                selector = this.sortByPriceHighToLowSelector;
                break;
            default:
                throw new Error(`Invalid sort option: ${sortOption}`);
        }

        try {
            await this.tapElement(selector);
            console.log(`Successfully applied sort filter: ${sortOption}`);
        } catch (error) {
            console.error(`Failed to apply sort filter: ${sortOption}`, error);
            throw error;
        }
    }

    /**
    * Returns the selector for "Sort Modal Title".
    * @returns {string} - Selector for the sort modal title.
    */
    public getSortModalTitleSelector(): string {
        return this.sortModalTitleSelector;
    }

    /**
     * Returns the selector for "Name (A to Z)" sort option.
     * @returns {string} - Selector for the Name (A to Z) sort option.
     */
    public getSortByNameAscSelector(): string {
        return this.sortByNameAscSelector;
    }

    /**
     * Returns the selector for "Name (Z to A)" sort option.
     * @returns {string} - Selector for the Name (Z to A) sort option.
     */
    public getSortByNameDescSelector(): string {
        return this.sortByNameDescSelector;
    }

    /**
     * Returns the selector for "Price (low to high)" sort option.
     * @returns {string} - Selector for the Price (low to high) sort option.
     */
    public getSortByPriceLowToHighSelector(): string {
        return this.sortByPriceLowToHighSelector;
    }

    /**
     * Returns the selector for "Price (high to low)" sort option.
     * @returns {string} - Selector for the Price (high to low) sort option.
     */
    public getSortByPriceHighToLowSelector(): string {
        return this.sortByPriceHighToLowSelector;
    }

}
