import dotenv from "dotenv";
import path from "path";
import { Page } from "@playwright/test";
import fs from "fs/promises";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export async function homeLogin(page: Page): Promise<void> {
  const username = process.env.APP_USERNAME || "";
  const password = process.env.PASSWORD || "";
  const baseUrl = process.env.BASE_URL || "";

  if (!username || !password) {
    throw new Error("Missing username or password in environment variables!");
  }

  console.log("Navigating to:", baseUrl);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  // Optional: handle cookie banner
  const cookieButton = page.locator("#didomi-notice-agree-button");
  if (await cookieButton.isVisible()) {
    await cookieButton.click();
  }

  // Wait and debug Inloggen button
  const loginButton = page.locator('button:has-text("Inloggen")');
  await loginButton.waitFor({ timeout: 60000 });

  // Screenshot before click for CI debugging
  await page.screenshot({ path: path.resolve(__dirname, "./screenshot-before-inloggen.png") });

  await loginButton.click();
  await page.locator("#username").fill(username);
  await page.locator('[data-test-id="button"]').nth(0).click();
  await page.locator('[data-test-id="passwordElement"]').fill(password);
  await page.locator('button[title="Sign On"]').click();

  console.log("Login complete.");
}
