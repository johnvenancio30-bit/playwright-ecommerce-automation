import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Products');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.title).toBeVisible();
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async addProductToCart(productName: string) {
    await this.getProductByName(productName)
      .locator('button', { hasText: 'Add to cart' })
      .click();
  }

  async removeProductFromCart(productName: string) {
    await this.getProductByName(productName)
      .locator('button', { hasText: 'Remove' })
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartBadgeCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toBeHidden();
  }

  async sortBy(label: string) {
    await this.sortDropdown.selectOption({ label });
  }

  async getProductNames() {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async openProductDetails(productName: string) {
    await this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }).click();
  }

  getProductByName(productName: string) {
    return this.inventoryItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })
    });
  }
}
