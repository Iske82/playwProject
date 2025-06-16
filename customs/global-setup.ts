import { Browser, chromium, Page, BrowserContext } from "@playwright/test";
import { loginWithBasicAuth } from "./helpers/loginWithBasicAuth";

let page: Page;
let context: BrowserContext;

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false });
  const login = await loginWithBasicAuth(browser);
  page = login.page;
  context = login.context;

  await page.context().storageState({ path: "./loginAuth.json" });
  await browser.close();
}
export default globalSetup;
