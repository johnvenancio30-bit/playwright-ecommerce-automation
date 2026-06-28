import { expect, type Locator, type Page } from '@playwright/test';

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly overviewItems: Locator;
  readonly subtotalLabel: Locator;
  readonly totalLabel: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.overviewItems = page.locator('[data-test="inventory-item"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async expectInformationStepLoaded() {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(this.title).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async fillCustomerInfo(customer: CheckoutCustomer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectOverviewLoaded() {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  async expectProductInOverview(productName: string) {
    await expect(this.getOverviewItemByName(productName)).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.backHomeButton).toBeVisible();
  }

  getOverviewItemByName(productName: string) {
    return this.overviewItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    });
  }
}
