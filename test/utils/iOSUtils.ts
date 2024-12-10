import { browser } from '@wdio/globals';

/**
 * Scrolls to an element on an iOS screen.
 * Attempts to make the element visible by performing a maximum number of scrolls.
 * 
 * @param {string} elementSelector - The selector of the element to scroll to.
 * @returns {Promise<void>} - Resolves when the element is successfully scrolled into view.
 * @throws {Error} - Throws an error if the element is not visible after the maximum number of scroll attempts.
 */
export async function scrollToElementiOS(elementSelector: string): Promise<void> {
    const el = await $(elementSelector);
    const MAX_SCROLL_ATTEMPTS = 10;
    let isVisible = await el.isDisplayed();

    for (let attempts = 0; attempts < MAX_SCROLL_ATTEMPTS && !isVisible; attempts++) {
        try {
            console.log(`Scroll attempt ${attempts + 1} for iOS element: ${elementSelector}`);
            await browser.execute('mobile: scroll', { direction: 'down' });
            isVisible = await el.isDisplayed();
        } catch (error) {
            console.log(`Scroll attempt ${attempts + 1} failed: ${(error as Error).message}`);
        }
    }

    if (!isVisible) {
        throw new Error(
            `Element with selector "${elementSelector}" is not visible after ${MAX_SCROLL_ATTEMPTS} scroll attempts.`
        );
    }
}

/**
 * Waits for a specific error message to appear on the iOS screen.
 * Verifies the text of the error message and logs the result.
 * 
 * @param {string} elementSelector - Selector for the error message container.
 * @param {string} expectedText - Expected text of the error message.
 * @param {number} [timeout=10000] - Maximum time to wait for the error message (default: 10,000ms).
 * @returns {Promise<string>} - Resolves with the text of the error message if it appears and matches.
 * @throws {Error} - Throws an error if the message does not appear or does not match the expected text.
 */
export async function waitForErrorMessage(
    elementSelector: string,
    expectedText: string,
    timeout: number = 10000
): Promise<string> {
    console.log(`Waiting for error message "${expectedText}" to appear on iOS...`);

    const el = await $(elementSelector);

    await browser.waitUntil(
        async () => {
            const isVisible = await el.isDisplayed();
            if (!isVisible) return false;

            const text = await el.getText();
            return text.includes(expectedText);
        },
        { timeout, timeoutMsg: `Error message "${expectedText}" did not appear within ${timeout}ms.` }
    );

    const actualText = await el.getText();
    console.log(`Error message received: "${actualText}"`);

    if (!actualText.includes(expectedText)) {
        throw new Error(`Expected "${expectedText}" but got "${actualText}".`);
    }

    return actualText;
}
