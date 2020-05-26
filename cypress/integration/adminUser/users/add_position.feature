Feature: User position

  Background:
    Given I'm logged in Users page

  @e2e-test
  Scenario: Should add new position
    Given I create new user
    And I click add position
    And I click save position
    And I get error message
    And I type position name
    And I click close position
    And New position does not exist
    And I click add position
    And I type position name
    And I click save position
    And Position exists
    And I search the email
    And I click on user
    And I click Edit
    And I change position
    And I click Save
    When I search the email
    Then User has new position
    And I remove position
    And Position does not exists
    And I remove the user

  @e2e-test
  Scenario: Should not edit position
    Given I click add position
    And I type position name
    And I click save position
    And I click on position
    And I edit position name
    And I uncheck all categories
    And I edit payment accounts
    When I click close position
    Then Position is not edited
    And I remove position
    And Position does not exists

  @e2e-test
  Scenario: Should edit position
    Given I click add position
    And I type position name
    And I click save position
    And I click on position
    And I edit position name
    And I uncheck all categories
    And I edit payment accounts
    When I click save position
#  todo: Edit existed Position feature is not implemented yet.
#    Then Position is edited
    And I remove position
    And Position does not exists

  @e2e-test
  Scenario: Should be able to remove the position from 3-dot menu
    Given I click add position
    And I type new position name
    And I click save position
    And New position exists
    And I click position 3-dot menu
    And I click remove position
    And Window contains the position name
    And I click abort
    And New position exists
    And I click remove position
    And Window contains the position name
    When I click Delete Position
    Then New Position does not exist
