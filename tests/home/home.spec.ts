import { test, expect, Page } from "@playwright/test";
import HomePage from "../../pages/home.page";

test.describe("Home Page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
  });

  test("Verify the title of the Home Page is present", async ({ page }) => {
    await expect(page).toHaveTitle("Home | In- en Uitvoer");
  });

  test("Verify 6 navigation links are present", async ({ page }) => {
    const parentSelector = '[data-test-id="delenBlock"]';
    await page.waitForSelector(parentSelector, { state: "visible" });

    const linksToVerify = [
      { text: "Nieuws", href: "/nieuws/NIU" },
      { text: "Maandoverzicht", href: "/maandupdates" },
      { text: "Gebruikstarief en toelichting", href: "/gebruikstarief" },
      { text: "Rechtspraak", href: "/tijdschriften/DOUANERECHTSPR" },
      { text: "Kennisbank", href: "/basic/test" },
      { text: "Sanctiecheck", href: "/basic/sanctiecheck" },
    ];

    for (const { text, href } of linksToVerify) {
      const link = page.locator(`${parentSelector} a[href="${href}"]`);
      await expect(link).toBeVisible({ timeout: 10000 });
      const linkText = await link.innerText();
      expect(linkText).toContain(text);
    }
  });

  test("Verify searchBar is present", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.searchBar).toBeVisible();
  });

  test("Verify searchBar returns correct result", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.searchBar.fill("9702 1000 00");
    await homePage.searchBar.press("Enter");
    await expect(homePage.searchHeader).toHaveText("9702 10 | ouder dan 100 jaar");
  });
});
