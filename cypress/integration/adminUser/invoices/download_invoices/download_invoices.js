import {Given, Then, When, And} from 'cypress-cucumber-preprocessor/steps';
import faker from "faker";
import 'cypress-file-upload';
import {getCredentials} from '../../../../support/commands';
import InvoicesPage from '../../../../pages/invoices/invoice_page'
import {DownloadInvoice} from "../../../../pages/invoices/invoice_result_page";

cy.faker = require('faker');
global.creds = getCredentials();
global.amount = faker.random.number({min: 20, max: 80});

Given(/^I am logged in as admin$/, () => {
    InvoicesPage.visit()
});

And(/^I create new invoice$/, () => {
    InvoicesPage.createInvoice(creds, 'receipt1.jpg', '1', amount)
});

And(/^I search for invoice$/, () => {
    InvoicesPage.searchInvoice(creds)
});

And(/^I click on invoice$/, () => {
    InvoicesPage.clickOnInvoiceSearchResult()
});

When(/^I click on invoice$/, () => {
    InvoicesPage.clickOnInvoiceSearchResult()
});

Then(/^Check downloading invoice with creds$/, () => {
    DownloadInvoice.expect().toDownloadInvoice()
});
