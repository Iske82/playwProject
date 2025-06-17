import { Page, Locator } from "@playwright/test";

class NieuwsHomePage {
  page: Page;
  filter: Locator;
  rubriek: Locator;
  specificRubriek: Locator;
  confirmBtn: Locator;
  filterSearchResults: Locator;
  page2: Locator;
  searchResultsNumber: Locator;
  searchBar: Locator;

  constructor(page) {
    this.page = page;
    this.filter = page.locator(
      "[data-test-id='newsSourceFiltersTriggerButton']"
    );
    this.rubriek = page.locator(
      "[data-test-id='newsSourceFiltersFilterAccordionsectionsButton']"
    );
    this.specificRubriek = page.locator("span:has-text('Algemeen')").first();
    this.confirmBtn = page.locator(
      "[data-test-id='newsSourceFiltersTriggersContainerConfirmButton']"
    );
    this.page2 = page.locator("span:has-text('Pagina 2')");
    this.searchResultsNumber = page.locator(
      "[data-test-id='searchMetadataCountAmount']"
    );
    this.searchBar = page.locator(
      "[data-test-id='newsSourceFiltersFilterComponentsectionsSearchElement']"
    );
    this.filterSearchResults = page.locator(
      "[data-test-id='newsSourceFiltersFilterAccordionsectionsBadge']"
    );
  }
}

export default NieuwsHomePage;
