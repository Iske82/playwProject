import { Browser, BrowserContext, Page } from "@playwright/test";
import { homeLogin } from "./homeLogin";

/**
 * Handles browser context creation and calls the reusable homeLogin function.
 * @param browser - The Playwright browser instance
 * @returns The logged-in page and context
 */
export async function loginWithBasicAuth(
  browser: Browser
): Promise<{ page: Page; context: BrowserContext }> {
  const context = await browser.newContext(); // Create a new browser context
  const page = await context.newPage(); // Create a page in the context

  // Reuse the existing homeLogin function to log in
  await homeLogin(page);

  return { page, context }; // Return the context and page for reuse
}
