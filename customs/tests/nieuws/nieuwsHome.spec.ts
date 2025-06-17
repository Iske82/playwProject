import { test, expect } from "@playwright/test";
import HomePage from "../../pages/home.page";
import NieuwsHomePage from "../../pages/niuews/niuewsHome.page";

test.describe("Test nieuws homepage", () => {
  let homePage: HomePage;
  let nieuwsHomePage: NieuwsHomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}nieuws/NIU`);
    homePage = new HomePage(page);
    nieuwsHomePage = new NieuwsHomePage(page);
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

    await expect(nieuwsHomePage.searchResultsNumber).not.toHaveText("0");
    const text = await nieuwsHomePage.searchResultsNumber.textContent();
    expect(parseInt(text ?? "0")).toBeGreaterThan(0);
  });

  test("Verify the filter is present", async () => {
    await expect(homePage.filterRubriek).toBeVisible();
  });

  test("Verify specific filter is applied", async ({ page }) => {
    await nieuwsHomePage.filter.waitFor();
    await nieuwsHomePage.filter.click();

    await nieuwsHomePage.rubriek.waitFor();
    await nieuwsHomePage.rubriek.click();

    await nieuwsHomePage.specificRubriek.waitFor();
    await nieuwsHomePage.specificRubriek.click();

    await nieuwsHomePage.filterSearchResults.waitFor({ state: "visible" });
    const countText = await nieuwsHomePage.filterSearchResults.textContent();
    expect(countText?.trim()).toBe("1");
  });

  test("Verify the pagination link is visible", async () => {
    await expect(homePage.nextButton).toBeVisible();
  });

  test("Verify the next page is present in pagination", async ({ page }) => {
    await homePage.nextButton.click();
    await expect(nieuwsHomePage.page2).toBeVisible();
  });
});
