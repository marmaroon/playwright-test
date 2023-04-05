Feature: Ecommerce validations
@Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "mashamasha@gmail.com" and "Iamking@00"
    When Add "adidas original" to Cart
    Then Verify "adidas original" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order is present in the OrderHistory

@Validation
@foo
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples: 
    | username              | password   |
    | mashamasha@gmail.com  | Iamking@00 |
    | helllo123@mail.com    | Iamgello@@@|