import { Browser, chromium, Page, BrowserContext } from "@playwright/test";
import { loginWithBasicAuth } from "./helpers/loginWithBasicAuth";

let page: Page;
let context: BrowserContext;

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const login = await loginWithBasicAuth(browser);
  page = login.page;
  context = login.context;
  await page.context().storageState({ path: "./loginAuth.json" });
  console.log("GLOBAL BASE URL :", process.env.BASE_URL);
  console.log("GLOBAL USERNAME", process.env.APP_USERNAME);
  await browser.close();
}
export default globalSetup;
