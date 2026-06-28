import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { productCatalog, standardUser } from '../fixtures/runtimeData';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await productsPage.expectLoaded();
  });

  test('product list displays all expected products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await expect(productsPage.inventoryItems).toHaveCount(productCatalog.expectedNames.length);
    await expect(await productsPage.getProductNames()).toEqual(productCatalog.expectedNames);
  });

  test('product list can be sorted by name descending', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('Name (Z to A)');

    await expect(await productsPage.getProductNames()).toEqual([...productCatalog.expectedNames].reverse());
  });

  test('product details can be opened from the inventory page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await productsPage.openProductDetails(productCatalog.backpack);

    await productDetailsPage.expectLoaded(productCatalog.backpack);
  });
});
