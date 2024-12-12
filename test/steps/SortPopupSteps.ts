import { SortPopupScreen } from "../pageobjects/screens/SortPopupScreen";
import { SortOptions } from "../utils/constants/Constants";


export class SortPopupSteps {
    private sortPopupScreen: SortPopupScreen;

    constructor() {
        this.sortPopupScreen = new SortPopupScreen();
    }

    /**
     * Waits for the sort modal title to be displayed and verifies visibility of all sort options.
     * @returns {Promise<void>}
     */
    async verifySortModalElements(): Promise<void> {
        console.log('Verifying the sort modal and its elements...');
        await this.sortPopupScreen.waitForSortModalTitle();

        const areSortOptionsVisible = await this.sortPopupScreen.verifySortOptionsVisibility();
        if (!areSortOptionsVisible) {
            throw new Error('Some or all sort options are not visible in the sort modal.');
        }
        console.log('All sort options are visible.');
    }

    /**
     * Applies a sort option by invoking the screen's filter functionality.
     * @param {string} sortOption - The sort option to apply (e.g., "NameAsc", "PriceHighToLow").
     * @returns {Promise<void>}
     */
    async applySortOption(sortOption: string): Promise<void> {
        console.log(`Applying sort option through steps: ${sortOption}`);
        if (!Object.values(SortOptions).includes(sortOption)) {
            throw new Error(`Invalid sort option: ${sortOption}`);
        }

        await this.sortPopupScreen.applyFilter(sortOption);
        console.log(`Sort option "${sortOption}" successfully applied through steps.`);
    }
}
