const { test, expect } = require('@playwright/test');

const phoneNumber = '9278626209';
const userPassword = 'Qwerty123';


test.describe('Auth', () =>  {
  test('should be succesfull fill phone number', async ({ page }) => {
  // link
  await page.goto('https://samokat2023-test.smartheadtest.ru/');
  // click 
  const authButton = page.locator('//*[@id="__next"]/div/div/section/button[2]').click()
  //
  const fillMobilePhone = page.getByPlaceholder('+7 9XX XXX-XX-XX');
  // fill number
  await fillMobilePhone.fill(phoneNumber);
  // click button
  await page.getByText('Дальше').click()

  const fillPassword = page.getByPlaceholder('Пароль');
  await fillPassword.fill(userPassword);
  // click button
  await page.getByText('Войти').click()

  await page.geНовых карточек пока нет. Чтобы их получить, сделайте заказ в Самокате

  })
})


// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:1111/landing');
//   const authButton = page.locator('//*[@id="__next"]/div/div/section/button[2]').click()
// });
// test('homepage has title and links to intro page', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);

//   // create a locator
//   const getStarted = page.getByRole('link', { name: 'Get started' });

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', '/docs/intro');

//   // Click the get started link.
//   await getStarted.click();
  
//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
