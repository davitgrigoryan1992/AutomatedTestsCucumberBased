import faker from 'faker';
import { getCredentials } from '../../support/commands';
import 'cypress-file-upload';

cy.faker = require('faker');

global.creds = getCredentials();
global.creds2 = getCredentials();
global.creds3 = getCredentials();
global.amount = faker.random.number({ min: 20, max: 80 });

describe('Invoices spec', () => {

  beforeEach('Create new users', () => {
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
  });

  afterEach('Delete users', () => {
    cy.deleteUser(creds);
    cy.deleteUser(creds2);
    cy.deleteUser(creds3);
  });

  it('Should not create New receipt with invalid input data', () => {
    cy.visit('/invoices').wait('@invoicePage');
    cy.get('[data-test-id=button-new-invoice]')
        .should('be.visible')
        .contains('New receipt').should('be.visible').click();
    cy.get('.AddReceiptModal')
        .should('contain', 'New receipt');
    cy.get("[data-test-id='button-add']").click();
    cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(1)")
      .should('contain', 'This field is required');
    cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(3)")
      .should('contain', 'Value must be a number');
    cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(4)")
      .should('contain', 'Value must be a string');
    cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(5)")
      .should('contain', 'Value must be a string');
    cy.get("[data-test-id='button-remove']").click();
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    cy.get("[data-test-id='input-field-search'] input").click();
    cy.get('[data-test-id=button-new-invoice]')
      .should('contain', 'New receipt').should('be.visible').click();
    cy.get('.AddReceiptModal')
      .should('contain', 'New receipt');
    // cy.get("[name='purchase_date']").then(function($input){
    //     $input[0].setAttribute('value', '20 January 2020').refresh()
    // }).should('have.attr', 'value', '20 January 2020');
    cy.get("[name='amount']").type(creds.amount);
    cy.get('[name=currency]').click();
    cy.get(`[name='currency'] .menu div:nth-child(${creds.currency_number})`).click();
    cy.get("[name='purchase_category'] input").click();
    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`).click();
    cy.get(`[name='vat'] .button:nth-child(${creds.vat})`).click();
    cy.get(`[name='payment_method'] .button:nth-child(${creds.payment_method})`).click();
    cy.get("[name='description']").type(creds.description);
    cy.get("[data-test-id='button-add']").click();
    cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(1)")
      .should('contain', 'This field is required');
  });

  it('All invoices should be visible for admin', () => {
    cy.unblockUserApi(creds);
    cy.unblockUserApi(creds2);
    cy.unblockUserApi(creds3);
    cy.clearLocalStorage();
    cy.webLogin(creds.email, creds.password);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    cy.wait('@invoicePage');
    cy.createNewInvoice(creds, 'receipt1.jpg', '1', amount);
    cy.clearLocalStorage();
    cy.webLogin(creds2.email, creds2.password);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    cy.wait('@invoicePage');
    cy.createNewInvoice(creds2, 'receipt2.jpg', '2', amount);
    cy.clearLocalStorage();
    cy.webLogin(creds3.email, creds3.password);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    cy.wait('@invoicePage');
    cy.createNewInvoice(creds3, 'receipt3.jpg', '3', amount);
    cy.clearLocalStorage();
    cy.webLogin(creds.login, creds.pass);
    cy.url().should('contain', 'invoices');
    cy.wait('@invoicePage');
    cy.get("[data-test-id='input-field-search'] input")
      .clear().type(creds.description);
    cy.get('.datagrid-body tr:nth-child(1)')
      .should('contain', creds.description);
    cy.get("[data-test-id='input-field-search'] input")
      .clear().type(creds2.description);
    cy.get('.datagrid-body tr:nth-child(1)')
      .should('contain', creds2.description);
    cy.get("[data-test-id='input-field-search'] input")
      .clear().type(creds3.description);
    cy.get('.datagrid-body tr:nth-child(1)')
      .should('contain', creds3.description);
  });
});
