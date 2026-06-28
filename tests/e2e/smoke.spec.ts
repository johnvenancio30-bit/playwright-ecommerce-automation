import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { standardUser } from '../fixtures/runtimeData';

test('smoke: standard user can log in and view products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login(standardUser.username, standardUser.password);

  await productsPage.expectLoaded();
});
