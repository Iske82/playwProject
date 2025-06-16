import dotenv from "dotenv";
import path from "path";
import { Page } from "@playwright/test";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export async function homeLogin(page: Page): Promise<void> {
  const username = process.env.APP_USERNAME || "";
  const password = process.env.PASSWORD || "";

  if (!username || !password) {
    throw new Error("Missing username or password in environment variables!");
  }

  await page.goto(process.env.BASE_URL || "");
  await page.locator("#didomi-notice-agree-button").click();
  await page.locator('button:has-text("Inloggen")').click();
  await page.locator("#username").fill(username);
  await page.locator('[data-test-id="button"]').nth(0).click();
  await page.locator('[data-test-id="passwordElement"]').fill(password);
  await page.locator('button[title="Sign On"]').click();
}
