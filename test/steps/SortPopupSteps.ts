import { SortPopupScreen } from "../pageobjects/screens/SortPopupScreen";
import { SortOptions } from "../utils/constants/Constants";

export class SortPopupSteps {
    private sortPopupScreen: SortPopupScreen;

    constructor() {
        console.log(`Initializing SortPopupSteps for Android`);
        this.sortPopupScreen = new SortPopupScreen();
    }

    /**
     * Waits for the sort modal title to be displayed and verifies visibility of all sort options.
     * @returns {Promise<void>}
     */
    async verifySortModalElements(): Promise<void> {
        console.log('Verifying the sort modal and its elements...');
        await this.sortPopupScreen.waitForSortModalTitle();
        await this.sortPopupScreen.assertSortOptionsVisible();
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
