Feature: Sorting invoices

  Background:
    Given I'm logged in Invoices page

  @e2e-test
  Scenario: Should be able to sort invoices
    Given Assert that sort by number is as default
    And I click sort by number
    And Assert that numbers are sorted by descending order
    And I click sort by number
    And Assert that numbers are sorted by ascending order
    And Assert that sort by amount is as default
    And I click sort by amount
    And Assert that amounts are sorted by ascending order
    And I click sort by amount
    And Assert that amounts are sorted by descending order
    And Assert that sort by description is as default
    And I click sort by description
    And Assert that description are sorted by descending order
    When I click sort by description
    Then Assert that description are sorted by ascending order
