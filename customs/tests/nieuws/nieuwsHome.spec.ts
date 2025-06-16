import { test, expect } from "@playwright/test";
import HomePage from "../../pages/home.page";

test.describe("Test nieuws homepage", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}nieuws/NIU`);
    homePage = new HomePage(page);
  });

  test("Verify the title of the home page", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Sdu Nieuws In- en Uitvoer | In- en Uitvoer"
    );
  });

  test("Verify the search bar is present", async () => {
    await expect(homePage.searchBar).toBeVisible();
  });

  test("Verify the search bar returns results", async ({ page }) => {
    await homePage.searchBar.fill("Een gewasbeschermingsmiddel");
    await homePage.searchBar.press("Enter");

    const searchResultsNumber = page.locator(
      "[data-test-id='searchMetadataCountAmount']"
    );

    const text = await searchResultsNumber.textContent();
    const number = text ? parseInt(text.trim(), 10) : 0;

    expect(number).toBeGreaterThan(100);
  });

  test("Verify the filter is present", async () => {
    await expect(homePage.filterRubriek).toBeVisible();
  });

  test.skip("Verify specific filter is applied", async ({ page }) => {
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

    const specificRubriek = page.locator("span:has-text('Algemeen')").first();
    await specificRubriek.waitFor();
    await specificRubriek.press("Enter");

    const confirmBtn = page.locator(
      "[data-test-id='newsSourceFiltersTriggersContainerConfirmButton']"
    );
    await confirmBtn.waitFor({ state: "visible" });
    await confirmBtn.press("Enter");

    const countText = await confirmBtn.textContent();
    expect(countText?.trim()).toBe("1");
  });

  test("Verify the pagination link is visible", async () => {
    await expect(homePage.nextButton).toBeVisible();
  });

  test("Verify the next page is present in pagination", async ({ page }) => {
    await homePage.nextButton.click();
    const page2 = page.locator("span:has-text('Pagina 2')");
    await expect(page2).toBeVisible();
  });
});
