import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import products from '../fixtures/products.json';
import users from '../fixtures/users.json';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.expectLoaded();
  });

  test('product list displays all expected products', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await expect(productsPage.inventoryItems).toHaveCount(products.expectedNames.length);
    await expect(await productsPage.getProductNames()).toEqual(products.expectedNames);
  });

  test('product list can be sorted by name descending', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('Name (Z to A)');

    await expect(await productsPage.getProductNames()).toEqual([...products.expectedNames].reverse());
  });

  test('product details can be opened from the inventory page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await productsPage.openProductDetails(products.backpack);

    await productDetailsPage.expectLoaded(products.backpack);
  });
});
