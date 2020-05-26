Feature: Company Information

  Background:
    Given I'm logged in Settings page

  @e2e-test
  Scenario: Check that all headers are present
    When I visit Settings page
    Then All headers are present

# todo test need to be unskipped after fix RSA-388
#  Scenario: Check error messages
#    Given I click edit company information
#    And Window contains Company information
#    And I clear all fields
#    When I click Save button
#    Then Error messages are shown
#    And I click X to close

  @e2e-test
  Scenario: Edit Company Information
    Given I click edit company information
    And Window contains Company information
    And I edit all fields with info
    And I click Save button
    And Table contains information as edited info
    And I click edit company information
    And All fields are as edited info
    And I click X to close
    And I click edit company information
    And I edit all fields with info2
    And I click Close button
    And Table contains information as edited info and not info2
    When I click edit company information
    Then All fields are as edited info and not as info2
