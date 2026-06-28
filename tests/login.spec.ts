import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import users from '../test-data/users.json';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
  });

  test('valid user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.login(users.standard.username, users.standard.password);

    await productsPage.expectLoaded();
  });

  test('invalid username shows an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.invalidUsername.username, users.invalidUsername.password);

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('invalid password shows an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('empty username shows a required-field error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.submit();

    await loginPage.expectErrorMessage('Username is required');
  });

  test('empty password shows a required-field error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.submit();

    await loginPage.expectErrorMessage('Password is required');
  });

  test('logged-in user can log out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.logout();

    await expect(page).toHaveURL('/');
    await loginPage.expectLoaded();
  });
});
