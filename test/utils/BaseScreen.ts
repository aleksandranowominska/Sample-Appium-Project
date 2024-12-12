import { scrollToElementAndroid } from '../utils/AndroidUtils';
import { scrollToElementiOS } from '../utils/iOSUtils';
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
     * Scrolls to an element based on the current platform.
     * Uses platform-specific utilities for Android and iOS.
     * @param {string} elementSelector - The selector of the element to scroll to.
     * @returns {Promise<void>} - Resolves once the scrolling action is completed.
     */
    async scrollTo(elementSelector: string): Promise<void> {
        const platform = process.env.PLATFORM || 'iOS';
        const element = await $(elementSelector);

        if (platform === 'Android') {
            console.log(`Scrolling to element on Android: ${elementSelector}`);
            await element.scrollIntoView();
        } else {
            console.log(`Scrolling to element on iOS: ${elementSelector}`);
            await element.scrollIntoView();
        }
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
}
