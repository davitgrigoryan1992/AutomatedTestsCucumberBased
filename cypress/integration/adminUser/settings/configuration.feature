Feature: Configuration

  Background:
    Given I'm logged in Settings page

  @e2e-test
  Scenario: Should not edit mail sending
    Given I click edit mail sending
    And Mail Sending Window is opened
    And I edit all Mail Sending fields
    And I click Close button
    When I click edit mail sending
    Then Mail Sending fields are not as edited

  @e2e-test
  Scenario: Should edit mail sending
    Given I click edit mail sending
    And Mail Sending Window is opened
    And I edit all Mail Sending fields
    And I click Save button
    When I click edit mail sending
    Then Mail Sending fields are as edited

  @e2e-test
  Scenario: Should not edit email templating
    Given I click edit email template
    And I click on all placeholders
    And I click Close
    When I click edit email template
    Then Placeholders are not saved
    And I click Close

  @e2e-test
  Scenario: Should edit email templating
    Given I click edit email template
    And Assert that all tabs are present
    And I click on all placeholders
    And Placeholders are saved
    And I click Save
    When I click edit email template
    Then Placeholders are saved
    And I click Close
