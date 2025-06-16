import { test, expect, Page, BrowserContext } from "@playwright/test";
import fs from "fs";
let page: Page;

test.beforeAll(async ({ browser }) => {
  // Setup the browser context and page
  const context: BrowserContext = await browser.newContext();
  page = await context.newPage();

  await page.goto(
    `${process.env.BASE_URL}gebruikstarief/code/93796?tab=uitvoer`
  );
});
test.afterAll(async () => {
  await page.close();
});
test.describe("Test Uitvoer page", () => {
  test.describe.configure({ mode: "serial" });
  test("Verify page title", async () => {
    await expect(page).toHaveTitle("0101 2100 00 | In- en Uitvoer");
  });

  test("Select and Verify specific country - Zwitserland", async () => {
    const countryInput = page.locator("#react-select-country-input");
    countryInput.fill("Zwitserland");
    await countryInput.press("Enter");
    const zwitserland = page.locator(
      "div[data-test-id='selectButton'] > div > div:has-text('Zwitserland - CH')"
    );
    await expect(zwitserland).toBeVisible();
  });
  test.describe("Test table with measures", () => {
    test("Verify table with mesures is present", async () => {
      const tableWithMeasures = page.locator("[data-test-id='table']");
      await expect(tableWithMeasures).toBeVisible();
    });
    test("Verify table has 6 headers with specific values", async () => {
      const totalHeaderRaws = page.locator("table thead tr th");
      await expect(totalHeaderRaws).toHaveCount(6);

      const expectedHeaders = [
        "Ingangsdatum",
        "Geografisch gebied",
        "Tarief",
        "Verordening",
        "Ordernummer",
        "",
      ];
      const actualHeaders = await totalHeaderRaws.allInnerTexts();
      expect(expectedHeaders).toEqual(actualHeaders);
    });
  });
  test("Verify the number of preview links in the table", async () => {
    const links = page.locator("[data-test-id='iconButton']");
    await expect(links).toHaveCount(3);
  });

  test.describe("Test preview on the right side", () => {
    test("Verify preview is present on the right side when click", async () => {
      const link = page.locator("[data-test-id='iconButton']").nth(0);
      await link.click();
      const title = page.locator(
        "h3:has-text('Uitvoercontrole – CITES (715)')"
      );
      await expect(title).toBeVisible();
    });
    test("Verify Download file", async () => {
      const [download] = await Promise.all([
        page.waitForEvent("download"), // Capture the download event
        page.locator("[data-test-id='listLinkItemButton']").nth(0).click(), // Click download button
      ]);
      // Get the suggested filename (Playwright auto-detects this)
      const fileName = download.suggestedFilename();
      console.log(`Downloading: ${fileName}`);

      // Define the custom download path
      const downloadPath = `./downloads/${fileName}`;

      // Save the file to the specified location
      await download.saveAs(downloadPath);

      // Validate file exists
      expect(fs.existsSync(downloadPath)).toBeTruthy();

      console.log("PDF downloaded successfully!");
    });
    test("Verify print preview page", async () => {
      const printButton = page
        .locator("[data-test-id='listLinkItemButton']")
        .nth(1);
      await printButton.click();
      const spinner = page.locator('[data-test-id="spinner"]');

      // Wait for spinner to appear (could take a second or two)
      await spinner.waitFor({ state: "visible", timeout: 5000 }); // Wait up to 5 seconds for the spinner to appear
      console.log("Spinner appeared, print preview is being generated...");
    });
  });
});
