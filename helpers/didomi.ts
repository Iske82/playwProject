import { expect, Page } from "@playwright/test";

export async function dismissDidomiBanner(page: Page): Promise<void> {
  const banner = page.locator('[data-testid="notice"]');
  const acceptButton = page.locator("#didomi-notice-agree-button");

  try {
    if (await banner.isVisible({ timeout: 10000 })) {
      console.log("Didomi banner is visible, attempting to dismiss...");

      await expect(acceptButton).toBeVisible({ timeout: 5000 });
      await expect(acceptButton).toBeEnabled({ timeout: 5000 });

      await acceptButton.click();

      // Wait until the entire banner is removed
      await expect(banner).toBeHidden({ timeout: 5000 });

      console.log("Didomi banner dismissed successfully.");
    } else {
      console.log("Didomi banner not visible.");
    }
  } catch (error) {
    console.warn("Didomi banner dismiss failed or not found:", error);
  }
}
