import { test, expect, BrowserContext, Page } from "@playwright/test";

test.describe("Test filter functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}nieuws/NIU`);

    const filter = page.locator(
      "[data-test-id='newsSourceFiltersTriggerButton']"
    );
    await filter.waitFor();
    await filter.press("Enter");

    const rubriek = page.locator(
      "[data-test-id='newsSourceFiltersFilterAccordionsectionsButton']"
    );
    await rubriek.waitFor();
    await rubriek.press("Enter");
  });

  test.describe("Test Search", () => {
    test("Verify search bar is present", async ({ page }) => {
      const searchBar = page.locator(
        "[data-test-id='newsSourceFiltersFilterComponentsectionsSearchElement']"
      );
      await expect(searchBar).toBeVisible();
    });
  });

  test.describe("Test Rubriek", () => {
    test.skip("Verify rubriek values are listed", async ({ page }) => {
      const expectedTexts = [
        "Algemeen",
        "Algemeen douanerecht",
        "Algemeen douanetarief",
        "Antidumping en antisubsidie",
        "Douane en automatisering",
        "Douanezaken EU-VK",
        "Gebruikstariefwijzigingen",
        "Invoerrechten",
        "Jurisprudentie",
        "Landbouwgoederen",
        "Niet-fiscale maatregelen",
        "Niet-fiscale maatregelenPreferentiële maatregelen",
        "Overig",
        "Preferentiële regelingen",
        "Tariefcontingenten",
        "Verbruiksbelastingen",
        "Wiki-Brexit",
        "Wiki-Covid-19",
        "Wiki-GS2022",
        "Wiki-Onderhandelingen Handelsakkoorden EU",
        "Wiki-Rusland-Oekraïne",
      ];

      for (const text of expectedTexts) {
        const span = page
          .locator("span.sc-v665jq-0.sc-yzf6yb-1.UIwax.bfnXKk")
          .filter({ hasText: new RegExp(`^${text}$`) });

        await expect(span).toBeVisible({ timeout: 5000 });
      }
    });
  });
});
