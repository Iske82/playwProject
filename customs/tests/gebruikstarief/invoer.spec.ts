import { test, expect, Page, BrowserContext } from "@playwright/test";

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(`${process.env.BASE_URL}gebruikstarief/code/93796?tab=invoer`);
});

test.afterEach(async () => {
  await page.close();
  await context.close();
});

test.describe("Test Invoer page", () => {
  test("Verify page title", async () => {
    await expect(page).toHaveTitle("0101 2100 00 | In- en Uitvoer");
  });

  test("Verify page description", async () => {
    const pageDescription = await page
      .locator('h2[data-test-id="tariffCodeContentHeaderSubtitle"] span')
      .textContent();
    expect(pageDescription).toEqual("fokdieren van zuiver ras");
  });

  test("Verify Invoer table is displayed", async () => {
    const tableWithPercent = page.locator("[data-test-id='cardContent']");
    await expect(tableWithPercent).toBeVisible();
  });
});
