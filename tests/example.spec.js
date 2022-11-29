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
  await expect(page).toHaveTitle('Плед, какао и волшебные карты')
  // скрин страницы лк
  await page.screenshot({ path: 'img/login.jpg' });
})

test.describe('Click tabs', () =>  {
  test('should be succesfull click on tab collections', async ({ page }) => {
  await page.getByRole('tab', { name: 'Моя коллекция 0' }).click();
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/?tab=collection');
  await page.screenshot({ path: 'img/collection.jpg' })
  })

  test('should be successfull click on tab cards and open 1 card',  async ({ page }) => {
  await page.getByRole('tab', { name: 'Карточки' }).dblclick();
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/');
  await page.screenshot({ path: 'img/cards.jpg' })
  await page.getByRole('button', { name: 'ПЕРЕВЕРНУТЬ' }).dblclick();
  await page.screenshot({ path: 'img/opencard.jpg' })
  await expect(page.locator('//*[@id="__next"]/div/div/div/main/div[2]/div[1]/div/div/button[2]/span[1]/span')).toHaveText('Моя коллекция 1');
})

test('should be successfull click on tab game and start it',  async ({ page }) => {
  await page.getByRole('tab', { name: 'Игра' }).click();
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/?tab=game');
  await page.screenshot({ path: 'img/game.jpg' })
  await page.getByRole('button', { name: 'Играть' }).click();
  await page.getByRole('button', { name: 'Начать' }).click();

  })

test('should be unavailable level prize', async ({page}) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/getPrize')
  const textUnavailablePrizes = page.locator('//*[@id="__next"]/div/div/div/div[5]/p');
  await expect(textUnavailablePrizes).toHaveText('Приз этого уровня недоступен или уже был получен');
  await page.goBack();
})

});

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', '/docs/intro');