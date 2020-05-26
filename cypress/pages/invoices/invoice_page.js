import {getCredentials} from '../../support/commands';
import faker from "faker";
import 'cypress-file-upload';

cy.faker = require('faker');
global.creds = getCredentials();
global.creds2 = getCredentials();
global.creds3 = getCredentials();
global.amount = faker.random.number({min: 20, max: 80});
global.amount2 = faker.random.number({min: 100, max: 500});
global.amount3 = faker.random.number({min: 600, max: 999});
global.category_filter = '[name=purchase_category] div';
global.payment_filter = '[name=payment_method] div';
global.vat_filter = '[name=vat] div';
const new_receipt_button = '[data-test-id=button-new-invoice]';
const add_button = "[data-test-id='button-add']";
const close_button = "[data-test-id='button-remove']";
const amount_field = "[name='amount']";
const currency_field = '[name=currency]';
const category_field = "[name='purchase_category'] input";
const description_field = "[name='description']";
const search_field = "[data-test-id='input-field-search'] input";
const filters_button = '[data-test-id="filters-button"]';
const amount_from = '[name=amount_from]';
const amount_to = '[name=amount_to]';
const clear_all_button = '[data-test-id="clear-all-button"]';
const apply_button = '[data-test-id="apply-button"]';

class InvoicesPage {
    static createUsers() {
        cy.clearLocalStorage();
        cy.visit('/');
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.server();
        cy.route('GET', '**receipt?limit=30**').as('invoicePage');
        cy.createNewUser(creds);
        cy.createNewUser(creds2);
        cy.createNewUser(creds3);
    }

    static visitInvoices() {
        cy.visit('/invoices');
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'users');
    }

    static clickNewReceipt() {
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get("[data-test-id='input-field-search'] input").click();
        cy.get(new_receipt_button)
            .should('be.visible')
            .contains('New receipt').should('be.visible').click();
    }

    static clickAddButton() {
        cy.get(add_button).click();
    }

    static clickCloseButton() {
        cy.get(close_button).click();
    }

    static typeAmount() {
        cy.get(amount_field).type(creds.amount);
    }

    static selectCurrency() {
        cy.get(currency_field).click();
        cy.get(`${currency_field} .menu div:nth-child(${creds.currency_number})`).click();
    }

    static selectCategory() {
        cy.get(category_field).click();
        cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`).click();
    }

    static selectVat() {
        cy.get(`[name='vat'] .button:nth-child(${creds.vat})`).click();
    }

    static selectPaymentMethod() {
        cy.get(`[name='payment_method'] .button:nth-child(${creds.payment_method})`).click();

    }

    static typeDescription() {
        cy.get(description_field).type(creds.description);
    }

    static unblockNewUsers() {
        cy.unblockUserApi(creds);
        cy.unblockUserApi(creds2);
        cy.unblockUserApi(creds3);
    }

    static logout() {
        cy.clearLocalStorage();
    }

    static logIn(creds) {
        cy.webLogin(creds.email, creds.password);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
    }

    static createInvoice(creds, filename, numbers, amountNumber) {
        cy.createNewInvoice(creds, filename, numbers, amountNumber);
    }

    static loginAsAdmin() {
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
    }

    static searchInvoice(creds) {
        cy.get(search_field)
            .clear().type(creds.description);
    }

    static createNewInvoices() {
        cy.server();
        cy.route('GET', '**receipt?limit=30**').as('invoicePage');
        cy.clearLocalStorage();
        cy.visit('/');
        // Create three users
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.createNewInvoice(creds, 'receipt1.jpg', '111', amount);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.createNewInvoice(creds2, 'receipt2.jpg', '222', amount2);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.createNewInvoice(creds3, 'receipt3.jpg', '333', amount3);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
    }

    static clickFiltersButton() {
        cy.get(filters_button).click();
    }

    static typeAmounts() {
        cy.get(amount_from).clear().type('20');
        cy.get(amount_to).clear().type('80');
    }

    static clickClearAllButton() {
        cy.get(clear_all_button).click({force: true});
    }

    static clickApplyButton() {
        cy.get(apply_button).click();
    }

    static selectPurchaseCategory() {
        cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
            .click({force: true});
    }

    static paymentMethodSelect() {
        cy.get(`[name=payment_method] .menu div:nth-child(${creds.payment_method})`)
            .click({force: true});
    }

    static selectVatFilter() {
        cy.get('[name=vat] > i').click({force: true});
        cy.get(`[name=vat] .menu div:nth-child(${creds.vat})`)
            .click({force: true});
    }

    static visit() {
        cy.clearLocalStorage();
        cy.visit('/');
        cy.webLogin(creds.login, creds.pass);
        cy.server();
        cy.route('GET', '**receipt?limit=30**').as('invoicePage');
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
    }

    static clickOnInvoiceSearchResult() {
        cy.get('tbody tr[class]:nth-child(1)').click();
    }

    static clickOnSorting(number) {
        cy.get(`table thead th:nth-child(${number})`).click();
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get('[data-test-id="input-field-search"]').click();
        cy.wait(2000)
    }
}

export default InvoicesPage;
