import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import users from '../test-data/users.json';

test('smoke: standard user can log in and view products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.expectLoaded();
});
