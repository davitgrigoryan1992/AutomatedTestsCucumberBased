Feature: Preferences

  Background:
    Given I'm logged in Settings page

  @e2e-test
  Scenario: Add new preferences
    Given I click add "Categories"
    And Assert that "New category" window is opened
    And I fill in category fields
    And I attach icon
    And I click Save button
    And Assert that "${pref.categoryName}" is shown in table "1"
    And I click add "Payments"
    And Assert that "New method" window is opened
    And I fill in payment method fields
    And I click Save button
    And Assert that "${pref.paymentName}" is shown in table "2"
    And I click add "Currencies"
    And Assert that "Add currency" window is opened
    And I fill in currency field
    And I click Save button
    And Assert that "CZK" is shown in table "3"
    And I click add "VAT"
    And Assert that "New VAT" window is opened
    And I fill in VAT fields
    And I click Save button
    And Assert that "${pref.vatName}" is shown in table "4"
    And I navigate to invoices page
    And I click New Receipt
    And Assert that New Receipt window is opened
    And I create invoice with newly created preferences
    And I click Add button
    And I visit Settings page
    And I remove the new category
    And I remove the new payment method
    And I remove the new currency
    And I remove the new VAT
    And I navigate to invoices page
    When I click New Receipt
    Then Removed preferences are not shown

  @e2e-test
  Scenario: Should not add/remove preferences
    Given I click add "Categories"
    And Assert that "New category" window is opened
    And I fill in category fields
    And I attach icon
    And I click Close button
    And Assert that table "1" does not contain "${pref.categoryName}"
    And I click add "Payments"
    And Assert that "New method" window is opened
    And I fill in payment method fields
    And I click Close button
    And Assert that table "2" does not contain "${pref.paymentName}"
    And I click add "Currencies"
    And Assert that "Add currency" window is opened
    And I fill in currency field
    And I click Close button
    And Assert that table "3" does not contain "CZK"
    And I click add "VAT"
    And Assert that "New VAT" window is opened
    And I fill in VAT fields
    And I click Close button
    And Assert that table "4" does not contain "${pref.vatName}"
    And I click Remove "Hotel" from table "1" from 3-dot menu
    And I click Remove category
    And Assert that "Remove category" "Hotel" window is opened
    And I click Abort
    And Assert that "Hotel" is shown in table "1"
    And I click Remove "Cash" from table "2" from 3-dot menu
    And I click Remove method
    And Assert that "Remove method" "Cash" window is opened
    And I click Abort
    And Assert that "Cash" is shown in table "2"
    And I click Remove "USD" from table "3" from 3-dot menu
    And I click Remove currency
    And Assert that "Exclude currency" "United States Dollar" window is opened
    And I click Abort
    And Assert that "USD" is shown in table "3"
    And I click Remove "7%" from table "4" from 3-dot menu
    And I click Remove VAT
    And Assert that "Remove VAT" "7%" window is opened
    When I click Abort
    Then Assert that "7%" is shown in table "4"

#  todo skipped because of save button issue
#  @e2e-test
#  Scenario: Edit preferences
#    Given I add new Category
#    And I add new Payment method
#    And I add new Currency
#    And I add new VAT
#
#    And I click on the new category
#    And I edit all category fields
#    And I click Close button
#    And Assert that category is not edited
#    And I click on the new category
#    And I edit all category fields
#    And I click Save button
#    And Assert that category is edited
#    And I click on the new payment
#    And I edit all payment fields
#    And I click Close button
#    And Assert that payment is not edited
#    And I click on the new category
#    And I edit all  payment fields
#    And I click Save button
#    And Assert that payment is edited
#    And I click on the new vat
#    And I edit all vat fields
#    And I click Close button
#    And Assert that vat is not edited
#    And I click on the new vat
#    And I edit all vat fields
#    And I click Save button
#    And Assert that vat is edited
