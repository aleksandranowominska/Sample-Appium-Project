export async function scrollToElementAndroid(elementSelector: string): Promise<void> {
    const el = await $(elementSelector);
    const MAX_SCROLL_ATTEMPTS = 10;
    let isVisible = await el.isDisplayed();

    for (let attempts = 0; attempts < MAX_SCROLL_ATTEMPTS && !isVisible; attempts++) {
        try {
            console.log(`Scroll attempt ${attempts + 1} for Android element: ${elementSelector}`);
            await el.scrollIntoView({ block: 'center', inline: 'nearest' });
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
 * Wait for a specific error message to appear on the Android screen.
 * @param elementSelector - Selector for the error message container.
 * @param expectedText - Expected text of the error message.
 * @param maxRetries - Maximum number of retries to check for the error message (default: 5).
 * @param retryInterval - Interval between retries in milliseconds (default: 1000ms).
 * @returns The text of the error message.
 * @throws Error if the message does not appear or does not contain the expected text.
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
