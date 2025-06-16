import { test, expect, Page, BrowserContext } from "@playwright/test";
import HomePage from "../../pages/gebruikstarief/home.page";

let page: Page;
let homePage: HomePage;

test.beforeAll(async ({ browser }) => {
  // Setup the browser context and page
  const context: BrowserContext = await browser.newContext();
  page = await context.newPage();
  await page.goto(`${process.env.BASE_URL}gebruikstarief`);
  homePage = new HomePage(page); // Initialize once
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Test Gebruikstarief HomePage", () => {
  // Describe block about complete Gebruikstarief page
  test("Verify the title of the Gebruikstarief page", async () => {
    // Go to the home Gebruikstarief page
    const title = await page.title();
    expect(title).toBe("Gebruikstarief & toelichting | In- en Uitvoer");
  });

  test("Verify afdeling I link is present", async () => {
    // Verify the resulting page or content
    await expect(page).toHaveURL(
      `${process.env.BASE_URL}gebruikstarief/afdeling/I`
    );
  });

  test.describe.configure({ mode: "serial" });

  test.describe("Test structure: sections/chapters page", () => {
    // Describe block about testing the sections
    test("Verify AFDELING II link is present", async () => {
      await homePage.sectionTwo.click();
      await expect(page).toHaveURL(
        `${process.env.BASE_URL}gebruikstarief/afdeling/II`
      );
    });

    test.describe("Test chapter page", () => {
      test("Verify chapter 30055 has correct title", async () => {
        const chapter6 = page.locator(
          "//div[text()='06' and following-sibling::div[text()='LEVENDE PLANTEN EN PRODUCTEN VAN DE BLOEMENTEELT']]"
        );
        await chapter6.click();
        await expect(page).toHaveTitle("Hoofdstuk 6 | In- en Uitvoer");
      });

      test.describe("Test codes inside section", () => {
        // Describe block that tests the codes
        test("Verify code 0601 1010 00 has correct title", async () => {
          // section 0601
          const section0601 = page.locator(
            'div:has(> span:text("06")) > span:text("01")'
          );
          await section0601.click();
          // section 060110
          const section060110 = page.locator(
            'div:has(> span:text("0601")) > span:text("10")'
          );
          await section060110.click();
          // section 0601101000
          const section0601101000 = page.locator(
            'div:has(> span:text("0601 1")) > span:text("010 00")'
          );
          await section0601101000.click();
          await expect(page).toHaveTitle("0601 1010 00 | In- en Uitvoer");
        });
      });
    });
  });
});
