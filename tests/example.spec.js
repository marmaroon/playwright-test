const { test, expect } = require('@playwright/test');

const phoneNumber = '9278626209';
const userPassword = 'Qwerty123';

test.beforeEach(async ({page}) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/');
  await page.getByRole('button', { name: 'Ок' }).click();
  const authButton = page.getByText('Войти').click()
  const fillMobilePhone = page.getByPlaceholder('+7 9XX XXX-XX-XX');
  // fill number
  await fillMobilePhone.fill(phoneNumber);
  // click button
  await page.getByText('Дальше').click()

  const fillPassword = page.getByPlaceholder('Пароль'); //в чем разница если выносить отдельно page или отдельно fillPassword?
  await fillPassword.fill(userPassword);
  // click button
  await page.getByText('Войти').click()
  // скрин страницы лк
  await page.screenshot({ path: 'img/login.jpg' });
})

test.describe('Click tabs', () =>  {
  test('should be succesfull click on tab collections', async ({ page }) => {
  await page.getByRole('tab', { name: 'Моя коллекция 0' }).click();
  await page.screenshot({ path: 'img/collection.jpg' })
  })

  test('should be successfull click on tab cards and open 1 card',  async ({ page }) => {
  await page.getByRole('tab', { name: 'Карточки' }).click();
  await page.screenshot({ path: 'img/cards.jpg' })
  // await page.getByText('18').click();  получаем количество неоткрытых карточек
  await page.getByRole('button', { name: 'ПЕРЕВЕРНУТЬ' }).click();
  await page.screenshot({ path: 'img/opencard.jpg' })
  // const countUnopenedCards = page.locator('//*[@id="__next"]/div/div[6]/header/div/div/div/div/button[2]/span[2]/span')
  // expect(countUnopenedCards).toHaveText('1')
})

test('should be successfull click on tab game and start it',  async ({ page }) => {
  await page.getByRole('tab', { name: 'Игра' }).click();
  await page.screenshot({ path: 'img/game.jpg' })
  // await page.getByText('10').click(); // количество открытых, но непросмотренных карточек

  })

});



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
