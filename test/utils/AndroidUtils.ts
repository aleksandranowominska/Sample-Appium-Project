/**
 * Scrolls to an element on an Android screen using manual swipe gestures.
 * Tries a limited number of times. Throws an error if the element is not found.
 * @param {string} elementSelector - XPath or selector of the element to scroll to.
 * @returns {Promise<void>}
 */
export async function scrollToElementAndroid(elementSelector: string): Promise<void> {
    const MAX_SCROLL_ATTEMPTS = 10;
    const SCROLL_SLEEP_MS = 1000;

    for (let attempt = 1; attempt <= MAX_SCROLL_ATTEMPTS; attempt++) {
        console.log(`Attempt ${attempt}: Trying to find element ${elementSelector}`);
        const elements = await $$(elementSelector);
        const count = await elements.length;

        if (count > 0 && await elements[0].isDisplayed()) {
            console.log(`Element ${elementSelector} is now visible.`);
            return;
        }

        // Swipe from bottom to top
        const { height, width } = await driver.getWindowRect();
        const startX = width / 2;
        const startY = height * 0.7;
        const endY = height * 0.3;

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 500, x: startX, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await driver.pause(SCROLL_SLEEP_MS);
    }

    throw new Error(`Element "${elementSelector}" not found after ${MAX_SCROLL_ATTEMPTS} scrolls.`);
}


/**
 * Waits for a specific error message to appear on the Android screen.
 * Checks for the message text within the specified error container.
 * Retries at intervals if the message is not immediately visible.
 * @param {string} errorContainerSelector - Selector for the error message container.
 * @param {string} expectedText - Expected text of the error message.
 * @param {number} [maxRetries=5] - Maximum number of retries to check for the error message.
 * @param {number} [retryInterval=1000] - Interval between retries in milliseconds.
 * @returns {Promise<string>} - The text of the error message if it appears.
 * @throws {Error} - Throws an error if the message does not appear or does not match the expected text.
 */
export async function waitForErrorMessage(
    errorContainerSelector: string,
    expectedText: string,
    maxRetries = 5,
    retryInterval = 1000
): Promise<string> {
    console.log(`Waiting for error container "${errorContainerSelector}" to be visible...`);
    const errorContainer = await $(errorContainerSelector);
    const isVisible = await errorContainer.isDisplayed();

    if (!isVisible) {
        throw new Error(`Error container "${errorContainerSelector}" did not appear.`);
    }

    console.log(`Waiting for error message "${expectedText}" to appear...`);
    let errorMessage = '';

    for (let i = 0; i < maxRetries; i++) {
        errorMessage = await errorContainer.getText();
        if (errorMessage.trim() === expectedText) {
            return errorMessage; // Return the error message if it matches
        }
        await browser.pause(retryInterval);
    }

    // If the message is still not found, check page source as fallback
    console.log(`Error message "${expectedText}" not found in container. Checking entire screen...`);
    const pageSource = await browser.getPageSource();
    if (pageSource.includes(expectedText)) {
        return expectedText; // Return expected text if found in page source
    }

    throw new Error(`Error message "${expectedText}" did not appear within ${maxRetries * retryInterval}ms.`);
}
