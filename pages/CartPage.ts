import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Your Cart');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.title).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async expectProductInCart(productName: string) {
    await expect(this.getCartItemByName(productName)).toBeVisible();
  }

  async expectProductNotInCart(productName: string) {
    await expect(this.getCartItemByName(productName)).toHaveCount(0);
  }

  async removeProduct(productName: string) {
    await this.getCartItemByName(productName)
      .locator('button', { hasText: 'Remove' })
      .click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  getCartItemByName(productName: string) {
    return this.cartItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    });
  }
}
