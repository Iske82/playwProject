import { Browser, chromium, BrowserContext } from "@playwright/test";
import { loginWithBasicAuth } from "./helpers/loginWithBasicAuth";

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });

  const context: BrowserContext = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlaywrightBot/1.0",
  });

  const page = await context.newPage();

  // Manually go to BASE_URL if needed before auth
  await page.goto(process.env.BASE_URL || "");

  // Perform login using your helper (pass page + context if needed)
  await loginWithBasicAuth(page);

  // Save authentication state
  await context.storageState({ path: "./loginAuth.json" });

  console.log("GLOBAL BASE URL:", process.env.BASE_URL);
  console.log("GLOBAL USERNAME:", process.env.APP_USERNAME);

  await browser.close();
}

export default globalSetup;
