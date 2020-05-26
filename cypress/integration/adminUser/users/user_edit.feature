Feature: Edit user

  Background:
    Given I'm logged in Users page

  @e2e-test
  Scenario: Should be able to Edit User
    Given I create new user
    And I search the email
    And I click on user
    And Window contains user's credentials
    And I click Edit
    And I edit all fields
    And I click change password
    And I click Confirm button
    And I receive error messages
    And I type invalid password
    And I confirm password
    And I click Confirm button
    And Error messages are received
    And I type new password
    And I confirm new password
    And I click Confirm button
    And I unblock user
    And I click Save
    And I logout
    When I login as new user
    Then I successfully login
    And User credentials are as edited
    And I logout

  @e2e-test
  Scenario: Should be able to block the user from 3-dot menu
    Given I create new user
    And I search the email
    And I click 3-dot menu
    And Select unblock user
    And I logout
    When I login with created user
    Then Your account is blocked is shown

  @e2e-test
  Scenario: Should be able to remove the user from 3-dot menu
    Given I create new user
    And I search the email
    And I click 3-dot menu
    And Select remove user
    And I click Delete
    When I search the email
    Then User should not exist

  @e2e-test
  Scenario: Should be able to change user password from 3-dot menu
    Given I create new user
    And I search the email
    And I click on user
    And I unblock user
    And I close the window
    And I click 3-dot menu
    And I select change password
    And I click Confirm button
    And I receive error messages
    And I type invalid password
    And I confirm password
    And I click Confirm button
    And Error messages are received
    And I type new password
    And I confirm new password
    And I click Confirm button
    And I logout
    When I login as user
    Then I successfully login
    And I logout
