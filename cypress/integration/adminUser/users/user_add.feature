Feature: Add new user

  Background:
    Given I'm logged in Users page

  @e2e-test
  Scenario: Add user
    Given I click New User
    And I fill in first name
    And I fill in last name
    And I fill in email address
    And I fill in password
    And I confirm password
    And I click Add
    And I search the email
    And I have matching result
    And I click on user
    And Window contains user's credentials
    When I close the window
    Then I navigate to Users page

  @e2e-test
  Scenario: Remove user
    Given I search the email
    And I have matching result
    And I click on user
    And Window contains user's credentials
    And I click Remove User
    And I confirm Remove User
    When I search the email
    Then User by the email is not found

  @e2e-test
  Scenario: Should not log in when user is blocked
    Given I create new user
    And I logout
    When I login as user
    Then Your account is blocked is shown
    And I remove the user

  @e2e-test
  Scenario: Should not create New User with invalid input data
    Given I click New User
    And I click Add
    And Error messages are shown
    And I fill in first name
    And I fill in last name
    And I fill in short email address
    And I fill in invalid password
    And I confirm password
    And I click Add
    And I get error messages
    And I fill in invalid email address
    And I fill in password
    When I click Add
    Then I get error message
    And I abort the window

  @e2e-test
  Scenario: Should be able to log in successfully when user status is active
    Given I create new user
    And I search the email
    And I click on user
    And Window contains user's credentials
    And I click Edit
    And I unblock user
    And I click Save
    And I logout
    When I login as user
    Then I successfully login
    And I logout
    And I remove the user