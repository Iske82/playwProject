import { test, expect, BrowserContext, Page } from "@playwright/test";
import NieuwsHomePage from "../../pages/niuews/niuewsHome.page";

test.describe("Test filter functionality", () => {
  let nieuwsHomePage: NieuwsHomePage;
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}nieuws/NIU`);
    nieuwsHomePage = new NieuwsHomePage(page);

    await nieuwsHomePage.filter.waitFor();
    await nieuwsHomePage.filter.press("Enter");

    await nieuwsHomePage.rubriek.waitFor();
    await nieuwsHomePage.rubriek.press("Enter");
  });

  test.describe("Test Search", () => {
    test("Verify search bar is present", async ({ }) => {
      await expect(nieuwsHomePage.searchBar).toBeVisible();
    });
  });

  test.describe("Test Rubriek", () => {
    test("Verify rubriek values are listed", async ({ page }) => {
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
          .locator("span.sc-v665jq-0.sc-yzf6yb-1.fjcYfP.bfnXKk")
          .filter({ hasText: new RegExp(`^${text}$`) });

        await expect(span).toBeVisible({ timeout: 5000 });
      }
    });
  });
});
