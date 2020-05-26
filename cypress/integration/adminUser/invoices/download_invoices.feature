Feature: Download Invoices

  @e2e-test
  Scenario: Should download receipt data
    Given I am logged in as admin
    And I create new invoice
    And I search for invoice
    When I click on invoice
    Then Check downloading invoice with creds
