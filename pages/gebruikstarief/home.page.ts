import { Page, Locator } from "@playwright/test";

class HomePage {
  page: Page;
  sectionTwo: Locator;
  chapter6: Locator;
  section0601: Locator;
  section060110: Locator;
  section0601101000: Locator;
  constructor(page) {
    this.page = page;
    this.sectionTwo = page.locator("text=AFDELING II").nth(0);
    this.chapter6 = page.locator(
      "//div[text()='06' and following-sibling::div[text()='LEVENDE PLANTEN EN PRODUCTEN VAN DE BLOEMENTEELT']]"
    );
    this.section0601 = page.locator(
      'div:has(> span:text("06")) > span:text("01")'
    );
    this.section060110 = page.locator(
      'div:has(> span:text("0601")) > span:text("10")'
    );
    this.section0601101000 = page.locator(
      'div:has(> span:text("0601 1")) > span:text("010 00")'
    );
  }
}
export default HomePage;
