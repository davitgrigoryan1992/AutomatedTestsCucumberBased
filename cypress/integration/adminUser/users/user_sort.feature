Feature: Sort user

  Background:
    Given I'm logged in Users page
    And I create 5 new users

  @e2e-test
  Scenario: Should be able to sort users
    Given I click Sort by number
    And Numbers are sorted by ascending order
    And I click Sort by number
    And Numbers are sorted by descending order
    And I edit user emails
    And Emails are sorted by ascending order
    When I click Sort by email
    Then Emails are sorted by descending order

  @e2e-test
  Scenario: Should be able to search for users
    Given I search user by first name
    And I have matching result
    And I search user by last name
    And I have matching result
    When I search user by email
    Then I have matching result
