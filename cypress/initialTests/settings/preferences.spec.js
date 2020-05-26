import faker from 'faker';
import 'cypress-file-upload';
import {getCredentials, getPreferencesinfo,} from '../../support/commands';

cy.faker = require('faker');

global.creds = getCredentials();
global.pref = getPreferencesinfo();
const amount = faker.random.number({ min: 20, max: 80 });

describe('Settings spec', () => {
  beforeEach('Log in home page', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.webLogin(creds.login, creds.pass);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    cy.visit('/settings');
    cy.url().should('contain', 'settings');
    cy.url().should('not.contain', 'invoices');
  });

  it('Add new preferences', () => {
    // Add new category
    cy.get('.Pair-left').contains('Categories').parent().siblings('div')
      .click();
    cy.get('.active .header').should('contain', 'New category');
    cy.get('[name=name]').clear().type(pref.categoryName);
    cy.get('[name="datev_account"]').type(pref.categoryAccount);
    cy.uploadAnyFile('icon.png', 'base64',
      'input[type=file]', 'image/png', 'input');
    cy.get('.ui.small.positive.button').contains('Add').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(1)').should('contain', pref.categoryName).as('categoryname');

    // Add new Payment
    cy.get('.Pair-left').contains('Payments').parent().siblings('div')
      .click();
    cy.get('.active .header').should('contain', 'New method');
    cy.get('[name=name]').clear().type(pref.paymentName);
    cy.get('[name="datev_account"]').type(pref.paymentAccount);
    cy.get('.ui.small.positive.button').contains('Add').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(2)').should('contain', pref.paymentName);

    // Add new Currency
    cy.get('.Pair-left').contains('Currencies').parent().siblings('div')
      .click();
    cy.get('.active .header').should('contain', 'Add currency');
    cy.get('[name=id]').click().type('CZK');
    cy.get('.ui.small.positive.button').contains('Add').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(3)').should('contain', 'CZK');

    // Add new VAT
    cy.get('.Pair-left').contains('VAT').parent().siblings('div')
      .click();
    cy.get('.active .header').should('contain', 'New VAT');
    cy.get('[name=name]').clear().type(pref.vatName);
    cy.get('[name=percentage]').clear().type(pref.vatPercentage);
    cy.get('[name=datev_id]').clear().type(pref.vatID);
    cy.get('.ui.small.positive.button').contains('Add').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(4)').should('contain', pref.vatName);

     //Should dragdrop
    const dataTransfer= new DataTransfer();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').contains('Food')
        .parentsUntil('tr').siblings('[class*=dragdrop]').as('dropelement')
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').contains(pref.categoryName)
        .parentsUntil('tr').siblings('[class*=dragdrop]').as('dragelement')
    cy.get('@dragelement')
        .trigger('dragstart', { dataTransfer });

    cy.get('@dropelement')
        .trigger('drop', { dataTransfer });

    cy.get('@dragelement')
        .trigger('dragend');

    //Add new invoice
    cy.visit('/invoices');
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'settings');
    cy.url().should('contain', 'invoices');
    cy.get('table .datagrid-body').should('exist');
    cy.get("[data-test-id='input-field-search'] input").click({ force: true });
    cy.get('[data-test-id=button-new-invoice]')
        .should('contain', 'New receipt').should('be.visible').click();
    cy.get('.AddReceiptModal')
        .should('contain', 'New receipt');
    cy.uploadAnyFile('invoice.jpg', 'base64',
        '[class*="dropzone"] input', 'image/jpg', 'input');
    cy.get("[name='amount']").clear().type(amount);
    cy.get('[name=currency]').click();
    cy.get('[name=currency] .menu div').contains('CZK').click();
    cy.get("[name='purchase_category'] input").click();
    cy.get('[name="purchase_category"] .menu div').contains(`${pref.categoryName}`).click();
    cy.get('[name=vat] .button').contains(`${pref.vatName}`).click();
    cy.get('[name=payment_method] .button').contains(`${pref.paymentName}`).click();
    cy.get("[name='description']").type(creds.description);
    cy.get("[data-test-id='button-add']").click();

    // //should remove category
    cy.visit('/settings');
    cy.url().should('contain', 'settings');
    cy.url().should('not.contain', 'invoices');
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').contains(pref.categoryName)
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .find('.trash.icon').should('be.visible').click();
    cy.get('.active .header').should('contain','Remove category');
    cy.get('.content .name').should('contain', pref.categoryName);
    cy.get('.ui.red.small.button').contains('Delete').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').should('not.contain', pref.categoryName);

    //should remove payment
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(2)').contains(pref.paymentName)
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .find('.trash.icon').should('be.visible').click();
    cy.get('.active .header').should('contain','Remove method');
    cy.get('.content .name').should('contain', pref.paymentName);
    cy.get('.ui.red.small.button').contains('Delete').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(2)').should('not.contain', pref.paymentName);

    //should remove currency
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(3)').contains('CZK')
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .find('.trash.icon').should('be.visible').click({ force: true });
    cy.get('.active .header').should('contain','Exclude currency');
    cy.get('.content .name').should('contain', 'Czech Republic Koruna');
    cy.get('.ui.red.small.button').contains('Delete').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(3)').should('not.contain', 'CZK');

    //should remove VAT
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').contains(pref.vatName)
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .find('.trash.icon').should('be.visible').click();
    cy.get('.active .header').should('contain','Remove VAT');
    cy.get('.content .name').should('contain', pref.vatName);
    cy.get('.ui.red.small.button').contains('Delete').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').should('not.contain', pref.vatName);

    //removed preferences should not be shown in Add Receipt
    cy.visit('/invoices');
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'settings');
    cy.url().should('contain', 'invoices');
    cy.get('table .datagrid-body').should('exist');
    cy.get("[data-test-id='input-field-search'] input").click({ force: true });
    cy.get('[data-test-id=button-new-invoice]')
        .should('contain', 'New receipt').should('be.visible').click();
    cy.get('.AddReceiptModal')
        .should('contain', 'New receipt');
    cy.get('[name="purchase_category"] .menu div').should('not.contain',`${pref.categoryName}`);
    cy.get('[name=vat] .button').should('not.contain',`${pref.vatName}`);
    cy.get('[name=payment_method] .button').should('not.contain',`${pref.paymentName}`);
    cy.get("[data-test-id='button-remove']").should('contain','Abort').click();
  });

  it('Should not add/remove preferences', () => {
    // should not add new category
    cy.get('.Pair-left').contains('Categories').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'New category');
    cy.get('[name=name]').clear().type(pref.categoryName);
    cy.get('[name="datev_account"]').type(pref.categoryAccount);
    cy.uploadAnyFile('icon.png', 'base64',
        'input[type=file]', 'image/png', 'input');
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').should('not.contain', pref.categoryName);

    // should not add new Payment
    cy.get('.Pair-left').contains('Payments').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'New method');
    cy.get('[name=name]').clear().type(pref.paymentName);
    cy.get('[name="datev_account"]').type(pref.paymentAccount);
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(2)').should('not.contain', pref.paymentName);

    // should not add new Currency
    cy.get('.Pair-left').contains('Currencies').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'Add currency');
    cy.get('[name=id]').click().type('CZK');
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(3)').should('not.contain', 'CZK');

    // should not add new VAT
    cy.get('.Pair-left').contains('VAT').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'New VAT');
    cy.get('[name=name]').clear().type(pref.vatName);
    cy.get('[name=percentage]').clear().type(pref.vatPercentage);
    cy.get('[name=datev_id]').clear().type(pref.vatID);
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').should('not.contain', pref.vatName);

    // should not remove category
    cy.visit('/settings');
    cy.url().should('contain', 'settings');
    cy.url().should('not.contain', 'invoices');
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').contains('Hotel')
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .window();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').contains('Hotel')
        .parentsUntil('tr').siblings('[class=collapsing]').find('.trash.icon').should('be.visible').click();
    cy.get('.active .header').should('contain','Remove category');
    cy.get('.content .name').should('contain', 'Hotel');
    cy.get('.ui.small.basic.button').contains('Abort').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').should('contain', 'Hotel');

    //should not remove payment
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(2)').contains('Cash')
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .window();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(2)').contains('Cash')
        .parentsUntil('tr').siblings('[class=collapsing]').find('.trash.icon').should('be.visible').click()
    cy.get('.active .header').should('contain','Remove method');
    cy.get('.content .name').should('contain', 'Cash');
    cy.get('.ui.small.basic.button').contains('Abort').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').should('contain', 'Cash');

    //should not remove currency
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(3)').contains('USD')
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .window();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(3)').contains('USD')
        .parentsUntil('tr').siblings('[class=collapsing]').find('.trash.icon').should('be.visible').click()
    cy.get('.active .header').should('contain','Exclude currency');
    cy.get('.content .name').should('contain', 'United States Dollar');
    cy.get('.ui.small.basic.button').contains('Abort').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(3)').should('contain', 'USD');

    //should not remove VAT
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').contains('7%')
        .parentsUntil('tr').siblings('[class=collapsing]').click()
        .window();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').contains('7%')
        .parentsUntil('tr').siblings('[class=collapsing]').find('.trash.icon').should('be.visible').click()
    cy.get('.active .header').should('contain','Remove VAT');
    cy.get('.content .name').should('contain', '7%');
    cy.get('.ui.small.basic.button').contains('Abort').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').should('contain', '7%');
  });

  //todo skipped beacuse of save button issue
  it.skip('Edit preferences', () => {
    //Add preferences
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(1)').should('not.contain', pref.categoryName);
    cy.get('.Pair-left').contains('Categories').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'New category');
    cy.get('[name=name]').clear().type(pref.categoryName);
    cy.get('[name="datev_account"]').type(pref.categoryAccount);
    cy.uploadAnyFile('icon.png', 'base64',
        'input[type=file]', 'image/png', 'input');
    cy.get('.ui.small.positive.button').contains('Add').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(2)').should('not.contain', pref.paymentName);
    cy.get('.Pair-left').contains('Payments').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'New method');
    cy.get('[name=name]').clear().type(pref.paymentName);
    cy.get('[name="datev_account"]').type(pref.paymentAccount);
    cy.get('.ui.small.positive.button').contains('Add').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
        .find('div:nth-child(4)').should('not.contain', pref.vatName);
    cy.get('.Pair-left').contains('VAT').parent().siblings('div')
        .click();
    cy.get('.active .header').should('contain', 'New VAT');
    cy.get('[name=name]').clear().type(pref.vatName);
    cy.get('[name=percentage]').clear().type(pref.vatPercentage);
    cy.get('[name=datev_id]').clear().type(pref.vatID);
    cy.get('.ui.small.positive.button').contains('Add').click();

    //Edit category
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(1) table tbody tr').contains(pref.categoryName)
      .click();
    cy.get('.active .header').should('contain', 'Edit category');
    cy.get('[name=name]').should('have.value', `${pref.categoryName}`)
      .clear().type(`new${pref.categoryName}`);
    cy.get('[name=datev_account]').should('have.value', `${pref.categoryAccount}`)
      .clear().type(`new${pref.categoryAccount}`);
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(1)').should('contain', pref.categoryName)
      .and('not.contain', `'new' + ${pref.categoryName}`);
    cy.get('.ui.small.positive.button').contains('Save').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(1)').should('contain', `'new' + ${pref.categoryName}`);

   // Edit Payments
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(2) table tbody tr').contains(pref.paymentName)
      .click();
    cy.get('.active .header').should('contain', 'Edit method');
    cy.get('[name=name]').should('have.value',`${pref.paymentName}`)
      .clear().type(`new${pref.paymentName}`);
    cy.get('[name="datev_account"]').should('have.value', `${pref.paymentAccount}`)
      .clear().type(`new${pref.paymentAccount}`);
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(2)').should('contain', pref.paymentName)
      .and('not.contain', `new${pref.paymentName}`);
    cy.get('.ui.small.positive.button').contains('Save').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(1)').should('contain', `new${pref.paymentAccount}`);

    //Edit VAT
    cy.wait(500);
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(4) table tbody tr').contains(pref.vatName)
      .click();
    cy.get('.active .header').should('contain', 'Edit VAT');
    cy.get('[name=name]').should('have.value', `${pref.vatName}`)
      .clear().type(`new${pref.vatName}`);
    cy.get('[name=percentage]').should('have.value', `${pref.vatPercentage},00`)
      .clear().type(`1${pref.vatPercentage}`);
    cy.get('[name=datev_id]').should('have.value',  `${pref.vatID}`)
      .clear().type(`new${pref.vatID}`);
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(4)').should('contain', pref.vatName)
      .and('not.contain', `new${pref.vatName}`);
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(4) table tbody tr').contains(pref.vatName)
      .click();
    cy.get('.active .header').should('contain', 'Edit VAT');
    cy.get('[name=name]').should('have.value', `${pref.vatName}`)
      .clear().type(`new${pref.vatName}`);
    cy.get('[name=percentage]').should('have.value', `${pref.vatPercentage},00`)
      .clear().type(`1${pref.vatPercentage}`);
    cy.get('[name=datev_id]').should('have.value', `${pref.vatID}`)
      .clear().type(`new${pref.vatID}`);
    cy.get('.ui.small.positive.button').contains('Save').click();
    cy.reload();
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(4) table tbody tr').should('contain', `new${pref.vatName}`);
    });
});
