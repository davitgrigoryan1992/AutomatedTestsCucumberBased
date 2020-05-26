Feature: Add invoices

  Background:
    Given I create new users as admin

  @e2e-test
  Scenario: Should not create New receipt with invalid input data
    Given I am in invoices page
    And I click New receipt
    And Assert that new receipt window is opened
    And I click Add button
    And Assert that error messages are shown
    And I click Close button
    And I click New receipt
    And Assert that new receipt window is opened
    And I type amount
    And I select currency
    And I select category
    And I select payment method
    And I select vat
    And I type description
    When I click Add button
    Then Assert that upload error message is shown
    And I click Close button

  @e2e-test
  Scenario: All invoices should be visible for admin
    Given I unblock new users
    And I logout
    And I login as user 1
    And I create invoice 1
    And I logout
    And I login as user 2
    And I create invoice 2
    And I logout
    And I login as user 3
    And I create invoice 3
    And I logout
    And I login as admin
    And I search for invoice 1
    And Assert that invoice 1 is shown
    And I search for invoice 2
    And Assert that invoice 2 is shown
    When I search for invoice 3
    Then Assert that invoice 3 is shown
