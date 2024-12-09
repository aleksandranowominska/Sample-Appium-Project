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
