Feature: Filter invoices

  Background:
    Given I'm logged in Invoices page

  @e2e-test
  Scenario: Should be able to filter invoices
    Given I click Filters button
    And I type amount
    And I click Clear All button
    And Assert that amount fields are empty
    And I type amount
    And I click Apply filters button
    And Assert that invoices are filtered by amount
    And I select purchase category
    And I click Clear All button
    And I select purchase category
    And I click Clear All button
    And Assert that category field is empty
    And Check filtering by two categories
    And I click Clear All button
    And I select payment method
    And I click Clear All button
    And Assert that payment method field is empty
    And Check filtering by payment method
    And I click Clear All button
    And I select Vat
    And I click Clear All button
    When Assert that vat field is empty
    Then Check filtering by Vat
    And I click Clear All button

  @e2e-test
    Scenario: Should be able to filter invoices by two filters
    Given I click Filters button
    And I type amount
    And Assert that category field is empty
    And Check filtering by amount and category
    And I click Clear All button
    When Assert that payment method field is empty
    Then Check filtering by payment method and vat
