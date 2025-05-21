import { scrollToElementAndroid } from '../utils/AndroidUtils';

// ELEMENT_TIMEOUT can be dynamically set via process.env.ELEMENT_TIMEOUT
const ELEMENT_TIMEOUT = process.env.ELEMENT_TIMEOUT ? parseInt(process.env.ELEMENT_TIMEOUT, 10) : 10000;

export class BaseScreen {
    /**
     * Waits for an element to be displayed within the defined timeout.
     * @param {string} elementSelector - The selector of the element to wait for.
     * @returns {Promise<WebdriverIO.Element>} - Resolves with the element once it is displayed.
     */
    async waitForDisplayed(elementSelector: string) {
        const el = await $(elementSelector);
        await el.waitForDisplayed({ timeout: ELEMENT_TIMEOUT });
        return el;
    }

    /**
     * Clicks on an element safely by waiting for it to be displayed first.
     * @param {string} elementSelector - The selector of the element to tap.
     * @returns {Promise<void>} - Resolves once the click action is performed.
     */
    async tapElement(elementSelector: string) {
        const el = await this.waitForDisplayed(elementSelector);
        await el.click();
    }

    /**
     * Types text into an element (e.g., an input field) after waiting for it to be displayed.
     * @param {string} elementSelector - The selector of the input field.
     * @param {string} text - The text to type into the input field.
     * @returns {Promise<void>} - Resolves once the text is typed.
     */
    async typeText(elementSelector: string, text: string) {
        const el = await this.waitForDisplayed(elementSelector);
        await el.setValue(text);
    }

    /**
     * Gets the text content of an element, waiting for it to be displayed first.
     * @param {string} elementSelector - The selector of the element.
     * @returns {Promise<string>} - Resolves with the text content of the element.
     */
    async getElementText(elementSelector: string) {
        const el = await this.waitForDisplayed(elementSelector);
        return el.getText();
    }

    /**
     * Checks if an element is displayed within the timeout period.
     * Returns `false` if the element does not exist or is not displayed.
     * @param {string} elementSelector - The selector of the element to check.
     * @returns {Promise<boolean>} - True if the element is displayed, otherwise false.
     */
    async isElementDisplayed(elementSelector: string) {
        try {
            const el = await $(elementSelector);
            return await el.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Scrolls to an element using Android-specific utility.
     * @param {string} elementSelector - The selector of the element to scroll to.
     * @returns {Promise<void>} - Resolves once the scrolling action is completed.
     */
    async scrollTo(elementSelector: string): Promise<void> {
        console.log(`Scrolling to element on Android: ${elementSelector}`);
        await scrollToElementAndroid(elementSelector);
    }

    /**
     * Waits for an element to disappear within a specified timeout.
     * Logs the process and returns `true` if the element disappears.
     * @param {string} elementSelector - The selector of the element to wait for.
     * @param {number} [timeout=5000] - Timeout in milliseconds (default: 5000ms).
     * @returns {Promise<boolean>} - True if the element disappears, otherwise false.
     */
    async waitForElementToDisappear(elementSelector: string, timeout = 5000): Promise<boolean> {
        console.log(`Waiting for element "${elementSelector}" to disappear...`);
        try {
            const element = await $(elementSelector);
            await element.waitForDisplayed({ reverse: true, timeout });
            console.log(`Element "${elementSelector}" has disappeared.`);
            return true;
        } catch (error) {
            console.error(`Element "${elementSelector}" did not disappear within the timeout.`);
            return false;
        }
    }

    /**
     * Fetches all visible text values (e.g., product titles or prices) by repeatedly scrolling until the footer is visible.
     * Ensures uniqueness of values (e.g., avoids collecting duplicates from previous scroll states).
     * Useful for lazy-loaded or paginated lists where not all items are visible at once.
     *
     * @param {string} itemSelector - The selector for the list items (e.g., product titles or prices).
     * @param {string} footerSelector - The selector used to detect that the list has been fully loaded.
     * @returns {Promise<string[]>} - A list of unique values extracted from the visible elements.
     */
    async getVisibleTextsFromList(
        itemSelector: string,
        footerSelector: string,
        label: string
    ): Promise<string[]> {
        console.log(`Fetching all ${label} from the list...`);
        const results: string[] = [];
        const seen = new Set<string>();

        let footerVisible = false;
        let attempt = 0;
        const maxScrolls = 10;

        while (!footerVisible && attempt < maxScrolls) {
            console.log(`Scroll attempt #${attempt + 1}`);
            const elements = await $$(itemSelector);

            for (const element of elements) {
                if (await element.isDisplayed()) {
                    const text = await element.getText();
                    if (!seen.has(text)) {
                        seen.add(text);
                        results.push(text);
                    }
                }
            }

            footerVisible = await this.isElementDisplayed(footerSelector);

            if (!footerVisible) {
                try {
                    console.log('Scrolling to footer...');
                    await scrollToElementAndroid(footerSelector);
                    await browser.pause(300); // allow lazy-loaded elements to appear
                } catch (error) {
                    console.warn('Scroll attempt failed or footer already visible.');
                    break;
                }
            }

            attempt++;
        }

        console.log(`Final ${label} list:`, results);
        return results;
    }

    /**
     * Verifies if an array is sorted in ascending or descending order.
     * Accepts optional transform function (e.g., parseFloat or localeCompare wrapper).
     *
     * @template T - The type of original values.
     * @template U - The type after optional transform (e.g., string → number).
     * @param {T[]} items - Original array of values.
     * @param {boolean} ascending - Whether the expected order is ascending.
     * @param {(item: T) => U} [transform] - Optional function to transform values before comparison.
     * @returns {boolean} - True if sorted correctly, false otherwise.
     */
    public verifySortedOrder<T, U = T>(
        items: T[],
        ascending: boolean,
        transform?: (item: T) => U
    ): boolean {
        const transformed = transform ? items.map(transform) : ([...items] as unknown as U[]);
        const sorted = [...transformed].sort((a, b) => {
            if (typeof a === 'string' && typeof b === 'string') {
                return ascending ? a.localeCompare(b) : b.localeCompare(a);
            } else {
                return ascending ? (a as any) - (b as any) : (b as any) - (a as any);
            }
        });

        const isCorrect = JSON.stringify(transformed) === JSON.stringify(sorted);

        console.log('Original values:', transformed);
        console.log('Expected sorted values:', sorted);
        console.log('Is order correct:', isCorrect);

        return isCorrect;
    }

}
