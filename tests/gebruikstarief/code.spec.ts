import { test, expect } from "@playwright/test";

test.describe("Test Code Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}gebruikstarief/code/30058`);
  });

  test("Verify the page title", async ({ page }) => {
    await expect(page).toHaveTitle("0601 1010 00 | In- en Uitvoer");
  });

  test("Verify country selector", async ({ page }) => {
    const countryDropDown = page.locator("#react-select-country-placeholder");
    await expect(countryDropDown).toBeVisible();
  });

  test("Verify the presence of toelichting link", async ({ page }) => {
    const toelichtingLink = page.locator('span:has-text("Toelichting")');
    await expect(toelichtingLink).toBeVisible();
  });

  test("Verify the presence of Invoer tab", async ({ page }) => {
    const invoerLink = page.locator('span:has-text("Invoer")');
    await invoerLink.click();
    const tableWithPercent = page.locator('[data-test-id="cardContent"]');
    await expect(tableWithPercent).toBeVisible();
  });

  test("Verify the presence of Uitvoer tab", async ({ page }) => {
    const uitvoerLink = page.locator(
      'button#tab-uitvoer >> span[data-value="Uitvoer"]'
    );
    await uitvoerLink.click();

    const uitvoerTitle = page.locator("h2:has-text('Uitvoer')");
    await expect(uitvoerTitle).toBeVisible();
  });
});
