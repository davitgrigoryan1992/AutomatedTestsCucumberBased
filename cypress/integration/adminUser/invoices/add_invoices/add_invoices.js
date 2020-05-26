import {Given, Then, When, And, After} from 'cypress-cucumber-preprocessor/steps';
import faker from "faker";
import {getCredentials} from '../../../../support/commands';
import InvoicesPage from '../../../../pages/invoices/invoice_page'
import {
    NewReceiptWindow,
    ErrorMessages,
    UploadErrorMessage,
    searchInvoice
} from '../../../../pages/invoices/invoice_result_page'

cy.faker = require('faker');
global.creds = getCredentials();
global.creds2 = getCredentials();
global.creds3 = getCredentials();
global.amount = faker.random.number({min: 20, max: 80});

After(() => {
    cy.deleteUser(creds);
    cy.deleteUser(creds2);
    cy.deleteUser(creds3);
});

Given(/^I create new users as admin$/, () => {
    InvoicesPage.createUsers()
});

Given(/^I am in invoices page$/, () => {
    InvoicesPage.visitInvoices()
});

And(/^I click New receipt$/, () => {
    InvoicesPage.clickNewReceipt()
});

And(/^Assert that new receipt window is opened$/, () => {
    NewReceiptWindow.expect().toOpenNewReceiptWindow()
});

And(/^I click Add button$/, () => {
    InvoicesPage.clickAddButton()
});

And(/^Assert that error messages are shown$/, () => {
    ErrorMessages.expect().toShowErrorMessages()
});

And(/^I click Close button$/, () => {
    InvoicesPage.clickCloseButton()
});

And(/^I type amount$/, () => {
    InvoicesPage.typeAmount()
});

And(/^I select currency$/, () => {
    InvoicesPage.selectCurrency()
});

And(/^I select category$/, () => {
    InvoicesPage.selectCategory()
});

And(/^I select payment method$/, () => {
    InvoicesPage.selectPaymentMethod()
});

And(/^I select vat$/, () => {
    InvoicesPage.selectVat()
});

And(/^I type description$/, () => {
    InvoicesPage.typeDescription()
});

Then(/^Assert that upload error message is shown$/, () => {
    UploadErrorMessage.expect().toShowUploadErrorMessage()
});

Given(/^I unblock new users$/, () => {
    InvoicesPage.unblockNewUsers()
});

And(/^I logout$/, () => {
    InvoicesPage.logout()
});

And(/^I login as user 1$/, () => {
    InvoicesPage.logIn(creds)
});

And(/^I create invoice 1$/, () => {
    InvoicesPage.createInvoice(creds, 'receipt1.jpg', '1', amount)
});

And(/^I login as user 2$/, () => {
    InvoicesPage.logIn(creds2)
});

And(/^I create invoice 2$/, () => {
    InvoicesPage.createInvoice(creds2, 'receipt2.jpg', '2', amount)
});

And(/^I login as user 3$/, () => {
    InvoicesPage.logIn(creds3)
});

And(/^I create invoice 3$/, () => {
    InvoicesPage.createInvoice(creds3, 'receipt3.jpg', '3', amount)
});

And(/^I login as admin$/, () => {
    InvoicesPage.loginAsAdmin()
});

And(/^I search for invoice 1$/, () => {
    InvoicesPage.searchInvoice(creds)
});

And(/^I search for invoice 2$/, () => {
    InvoicesPage.searchInvoice(creds2)
});

When(/^I search for invoice 3$/, () => {
    InvoicesPage.searchInvoice(creds3)
});

And(/^Assert that invoice 1 is shown$/, () => {
    searchInvoice.expect().toShowInvoice(creds)
});

And(/^Assert that invoice 2 is shown$/, () => {
    searchInvoice.expect().toShowInvoice(creds2)
});

Then(/^Assert that invoice 3 is shown$/, () => {
    searchInvoice.expect().toShowInvoice(creds3)
});
