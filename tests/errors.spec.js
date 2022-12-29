const { test, expect, request, errors } = require('@playwright/test');

const loginPayLoad = {
  "phone": "72414141414"
};

test('should be alert of ending', async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post('https://samokat2023-test.smartheadtest.ru/api/authentication/check-phone', {data:loginPayLoad});
  // 400 status
  expect((loginResponse).status(400)).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  const tokenValue = loginResponseJson.errorContent;
  console.log(tokenValue);

})