import checkoutData from './checkout.json';
import products from './products.json';
import users from './users.json';

export const standardUser = {
  username: process.env.TEST_USERNAME ?? users.standard.username,
  password: process.env.TEST_PASSWORD ?? users.standard.password
};

export const invalidUsernameUser = users.invalidUsername;
export const invalidPasswordUser = users.invalidPassword;
export const validCustomer = checkoutData.validCustomer;
export const productCatalog = products;
