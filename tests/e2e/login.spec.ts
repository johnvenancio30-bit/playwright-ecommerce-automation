import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import {
  invalidPasswordUser,
  invalidUsernameUser,
  standardUser
} from '../fixtures/runtimeData';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
  });

  test('valid user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.login(standardUser.username, standardUser.password);

    await productsPage.expectLoaded();
  });

  test('invalid username shows an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(invalidUsernameUser.username, invalidUsernameUser.password);

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('invalid password shows an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(invalidPasswordUser.username, invalidPasswordUser.password);

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('empty username shows a required-field error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.submit();

    await loginPage.expectErrorMessage('Username is required');
  });

  test('empty password shows a required-field error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.usernameInput.fill(standardUser.username);
    await loginPage.submit();

    await loginPage.expectErrorMessage('Password is required');
  });

  test('logged-in user can log out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.login(standardUser.username, standardUser.password);
    await productsPage.logout();

    await expect(page).toHaveURL('/');
    await loginPage.expectLoaded();
  });
});
