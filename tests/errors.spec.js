const { test, expect, errors } = require('@playwright/test');

const phoneNumber = '9278626209';
const userPassword = '123';

test('should be error while auth',  async ({ page }) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/');
  await page.getByRole('button', { name: 'Ок' }).click();
  const authButton = page.getByText('Войти').click()
  const fillMobilePhone = page.getByPlaceholder('+7 9XX XXX-XX-XX');
  await fillMobilePhone.fill(phoneNumber);
  await page.getByText('Дальше').click()
  const fillPassword = page.getByPlaceholder('Пароль');
  await fillPassword.fill(userPassword);
  await page.getByText('Войти').click()
  await expect(page.locator('[role = "presentation"]')).toContainText('Неверный логин или пароль')
})