import { Page, Locator } from "@playwright/test";

class HomePage {
  page: Page;
  searchBar: Locator;
  searchHeader: Locator;
  filterRubriek: Locator;
  nextButton: Locator;

  constructor(page: Page) {
    // Explicitly define type
    this.page = page;
    this.searchBar = page.locator("[data-test-id='autocompleteSearchElement']");
    this.searchHeader = page.locator(
      "[data-test-id='searchResultsResultArticleHeading']"
    );

    //Nieuws Page
    this.filterRubriek = page.locator(
      "[data-test-id='newsSourceFiltersTriggerButton']"
    );
    this.nextButton = page.locator("[data-test-id='paginationNextButton']");
  }
}

export default HomePage;
