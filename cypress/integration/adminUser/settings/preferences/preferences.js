import {Given, Then, When, And} from 'cypress-cucumber-preprocessor/steps';
import SettingsPage from "../../../../pages/settings/settings_page";
import {

    PaymentsTable,
    NewInvoicePreferences,
    VatTable,
    CurrencyTable,
    NewReceiptWindow,
    CategoryTable,
    RemovePreferenceWindow,
    PreferencesTableRemove, PreferencesTable, PreferencesTableNotEdited, AddWindow
} from '../../../../pages/settings/settings_result_page'
import {getCompanyInfo, getCredentials} from '../../../../support/commands';


cy.faker = require('faker');
global.creds = getCredentials();
global.info = getCompanyInfo();
global.info2 = getCompanyInfo();

Given(/^I'm logged in Settings page$/, () => {
    SettingsPage.visit()
});

And(/^I click add \"([^\"]*)\"$/, (arg) => {
    SettingsPage.clickAddPreference(arg)
});

And(/^Assert that \"([^\"]*)\" window is opened$/, (arg) => {
    AddWindow.expect().toOpenAddWindow(arg)
});

And(/^I fill in category fields$/, () => {
    SettingsPage.fillInFieldsCategory(pref)
});

And(/^I attach icon$/, () => {
    SettingsPage.attachIcon()
});

And(/^I click Save button$/, () => {
    SettingsPage.clickSaveButton()
});

And(/^Assert that Categories table includes the new category$/, () => {
    CategoryTable.expect().toContainNewCategory()
});

And(/^I fill in payment method fields$/, () => {
    SettingsPage.fillInFieldsPayment()
});

And(/^Assert that Payments table includes the new payment$/, () => {
    PaymentsTable.expect().toContainNewMethod()
});

And(/^I fill in currency field$/, () => {
    SettingsPage.fillInFieldCurrency()
});

And(/^Assert that Currency table includes the new currency$/, () => {
    CurrencyTable.expect().toContainNewCurrency()
});

And(/^I fill in VAT fields$/, () => {
    SettingsPage.fillInFieldsVat()
});

And(/^Assert that VAT table includes the new VAT$/, () => {
    VatTable.expect().toContainNewVat()
});

And(/^I visit Settings page$/, () => {
    SettingsPage.visitSettingsPage()
});

And(/^I navigate to invoices page$/, () => {
    SettingsPage.navigateInvoicesPage()
});

And(/^I click New Receipt$/, () => {
    SettingsPage.clickNewReceipt()
});

And(/^Assert that New Receipt window is opened$/, () => {
    NewReceiptWindow.expect().toOpenNewReceiptWindow()
});

And(/^I create invoice with newly created preferences$/, () => {
    SettingsPage.createInvoice()
});

And(/^I click Add button$/, () => {
    SettingsPage.clickAdd()
});

And(/^I remove the new category$/, () => {
    SettingsPage.removeCategory()
});

And(/^I remove the new payment method$/, () => {
    SettingsPage.removePaymentMethod()
});

And(/^I remove the new currency$/, () => {
    SettingsPage.removeCurrency()
});

And(/^I remove the new VAT$/, () => {
    SettingsPage.removeVAT()
});

When(/^I click New Receipt$/, () => {
    SettingsPage.clickNewReceipt()
});

Then(/^Removed preferences are not shown$/, () => {
    NewInvoicePreferences.expect().notToShowRemovedPreferences()
});

And(/^I click Close button$/, () => {
    SettingsPage.clickClose()
});

When(/^I click Abort$/, () => {
    SettingsPage.clickClose()
});

And(/^Assert that table \"([^\"]*)\" does not contain \"([^\"]*)\"$/, (arg1, arg2) => {
    PreferencesTableNotEdited.expect().notToContainNewPreferences(arg1, arg2)
});

And(/^I click Remove \"([^\"]*)\" from table \"([^\"]*)\" from 3-dot menu$/, (arg1, arg2) => {
    SettingsPage.click3dotMenu(arg2, arg1);
});

And(/^I click Remove category$/, () => {
    SettingsPage.clickRemovePreference(1, 'Hotel')
});

And(/^I click Remove method$/, () => {
    SettingsPage.clickRemovePreference(2, 'Cash')
});

And(/^I click Remove currency$/, () => {
    SettingsPage.clickRemovePreference(3, 'USD')
});

And(/^I click Remove VAT$/, () => {
    SettingsPage.clickRemovePreference(4, '7%')
});

And(/^Assert that \"([^\"]*)\" \"([^\"]*)\" window is opened$/, (arg1, arg2) => {
    RemovePreferenceWindow.expect().toOpenRemovePreferenceWindow(arg1, arg2)
});

And(/^Assert that \"([^\"]*)\" is shown in table \"([^\"]*)\"$/, (arg1, arg2) => {
    PreferencesTableRemove.expect().toShowPreference(arg2, arg1)
});

Given(/^I add new Category$/, () => {
    SettingsPage.clickAddCategory();
    SettingsPage.fillInFieldsCategory();
    SettingsPage.attachIcon();
    SettingsPage.clickSaveButton()
});

And(/^I add new Payment method$/, () => {
    SettingsPage.clickAddPayment();
    SettingsPage.fillInFieldsPayment();
    SettingsPage.clickSaveButton();
});

And(/^I add new Currency$/, () => {
    SettingsPage.clickAddCurrency();
    SettingsPage.fillInFieldCurrency();
    SettingsPage.clickSaveButton();
});

And(/^I add new VAT$/, () => {
    SettingsPage.clickAddVat();
    SettingsPage.fillInFieldsVat();
    SettingsPage.clickSaveButton();
});

And(/^I click on the new category$/, () => {
    SettingsPage.clickNewPreference(1, pref.categoryName)
});

And(/^I click on the new payment$/, () => {
    SettingsPage.clickNewPreference(2, pref.paymentName)
});

And(/^I click on the new vat$/, () => {
    SettingsPage.clickNewPreference(4, pref.vatName)
});

And(/^Assert that category is edited$/, () => {
    PreferencesTable.expect().toContainNewPreferences(1, pref.categoryName)
});

And(/^Assert that payment is edited$/, () => {
    PreferencesTable.expect().toContainNewPreferences(2, pref.paymentName)
});

And(/^Assert that vat is edited$/, () => {
    PreferencesTable.expect().toContainNewPreferences(4, pref.vatName)
});

And(/^Assert that category is not edited$/, () => {
    PreferencesTableNotEdited.expect().notToContainNePreferences(1, 'new' + pref.categoryName)
});

And(/^Assert that payment is not edited$/, () => {
    PreferencesTableNotEdited.expect().notToContainNePreferences(2, 'new' + pref.paymentName)
});

And(/^Assert that vat is not edited$/, () => {
    PreferencesTableNotEdited.expect().notToContainNePreferences(4, 'new' + pref.vatName)
});

And(/^I edit all category fields$/, () => {
    SettingsPage.fillInCategoryFields()
});

And(/^I edit all payment fields$/, () => {
    SettingsPage.fillInPaymentFields()
});

And(/^I edit all vat fields$/, () => {
    SettingsPage.fillInVatFields()
});
