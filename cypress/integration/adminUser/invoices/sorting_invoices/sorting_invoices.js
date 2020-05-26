import {Given, Then, When, And, Before} from 'cypress-cucumber-preprocessor/steps';
import faker from "faker";
import {getCredentials} from '../../../../support/commands';
import InvoicesPage from '../../../../pages/invoices/invoice_page';
import {
    sortingDefault,
    NumberSortingDesc,
    NumberSortingAsc,
    AmountSortingAsc,
    AmountSortingDesc,
    DescSortingDescending,
    DescSortingAscending
} from "../../../../pages/invoices/invoice_result_page";

cy.faker = require('faker');
global.creds = getCredentials();
global.creds2 = getCredentials();
global.creds3 = getCredentials();
global.amount = faker.random.number({min: 20, max: 80});
global.amount2 = faker.random.number({min: 100, max: 500});
global.amount3 = faker.random.number({min: 600, max: 999});

Before(()=> {
    InvoicesPage.createNewInvoices()
});

Given(/^I'm logged in Invoices page$/, () => {
    InvoicesPage.visitInvoices()
});

Given(/^Assert that sort by number is as default$/, () => {
    sortingDefault.expect().toBeAsDefault(1, 'Num')
});

And(/^Assert that sort by amount is as default$/, () => {
    sortingDefault.expect().toBeAsDefault(7, 'sortable')
});

And(/^Assert that sort by description is as default$/, () => {
    sortingDefault.expect().toBeAsDefault(2, 'sortable')
});

And(/^I click sort by number$/, () => {
    InvoicesPage.clickOnSorting(1)
});

And(/^I click sort by amount$/, () => {
    InvoicesPage.clickOnSorting(7)
});

When(/^I click sort by description$/, () => {
    InvoicesPage.clickOnSorting(2)
});

And(/^Assert that numbers are sorted by descending order$/, () => {
    NumberSortingDesc.expect().toSortByDescendingOrder()
});

And(/^Assert that numbers are sorted by ascending order$/, () => {
    NumberSortingAsc.expect().toSortByAscendingOrder()
});

And(/^Assert that amounts are sorted by ascending order$/, () => {
    AmountSortingAsc.expect().toSortByAscendingOrder()
});

And(/^Assert that amounts are sorted by descending order$/, () => {
    AmountSortingDesc.expect().toSortByDescendingOrder()
});

And(/^Assert that description are sorted by descending order$/, () => {
    DescSortingDescending.expect().toSortByDescendingOrder()
});

Then(/^Assert that description are sorted by ascending order$/, () => {
    DescSortingAscending.expect().toSortByAscendingOrder()
});
