import {Given, Then, When, And, Before} from 'cypress-cucumber-preprocessor/steps';
import faker from "faker";
import {getCredentials} from '../../../../support/commands';
import InvoicesPage from '../../../../pages/invoices/invoice_page'
import {
    AmountFields,
    InvoicesTable,
    FilterByCategories,
    FilterByPaymentMethod,
    filterField,
    filterByVat,
    filterByTwoFilters,
    ToFilterByTwoFilters
} from '../../../../pages/invoices/invoice_result_page'

cy.faker = require('faker');
global.creds = getCredentials();
global.amount = faker.random.number({min: 20, max: 80});
global.amount2 = faker.random.number({min: 100, max: 500});
global.amount3 = faker.random.number({min: 501, max: 999});

Before(()=> {
    InvoicesPage.createNewInvoices()
});

Given(/^I'm logged in Invoices page$/, () => {
    InvoicesPage.visitInvoices()
});

Given(/^I click Filters button$/, () => {
    InvoicesPage.clickFiltersButton()
});

And(/^I type amount$/, () => {
    InvoicesPage.typeAmounts()
});

And(/^I click Clear All button$/, () => {
    InvoicesPage.clickClearAllButton()
});

And(/^Assert that amount fields are empty$/, () => {
    AmountFields.expect().toBeEmpty()
});

And(/^I click Apply filters button$/, () => {
    InvoicesPage.clickApplyButton()
});

And(/^Assert that invoices are filtered by amount$/, () => {
    InvoicesTable.expect().toFilter()
});

And(/^I select purchase category$/, () => {
    InvoicesPage.selectPurchaseCategory()
});

And(/^Assert that category field is empty$/, () => {
    filterField.expect().toBeEmpty(category_filter)
});

And(/^Check filtering by two categories$/, () => {
    FilterByCategories.expect().toFilter()
});

And(/^I select payment method$/, () => {
    InvoicesPage.paymentMethodSelect()
});

And(/^Assert that payment method field is empty$/, () => {
    filterField.expect().toBeEmpty(payment_filter)
});

And(/^Check filtering by payment method$/, () => {
    FilterByPaymentMethod.expect().toFilterByMethod()
});

And(/^I select Vat$/, () => {
    InvoicesPage.selectVatFilter()
});

When(/^Assert that vat field is empty$/, () => {
    filterField.expect().toBeEmpty(vat_filter)
});

And(/^Check filtering by Vat$/, () => {
    filterByVat.expect().toFilterByVat()
});

And(/^Check filtering by amount and category$/, () => {
    filterByTwoFilters.expect().toFilterByAmountAndCategory()
});

Then(/Check filtering by payment method and vat/, () => {
    ToFilterByTwoFilters.expect().toFilterByPaymentMethodAndVat()
});
