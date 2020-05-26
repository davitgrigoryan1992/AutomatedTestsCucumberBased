import faker from 'faker';
import { getCredentials } from '../../support/commands';
import 'cypress-file-upload';
cy.faker = require('faker');

describe('Invoices page', () => {
  const creds = getCredentials();
  const creds2 = getCredentials();
  const creds3 = getCredentials();
  const amount = faker.random.number({ min: 20, max: 80 });
  const amount2 = faker.random.number({ min: 100, max: 500 });
  const amount3 = faker.random.number({ min: 501, max: 999 });

  before(() => {
    cy.server();
    cy.route('GET', '**receipt?limit=30**').as('invoicePage');
    cy.clearLocalStorage();
    cy.visit('/');
    // Create three invoices
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
  });

  it('Should be able to filter invoices', () => {
    // should be able to filter by amount
    cy.get('[data-test-id="filters-button"]').click();
    cy.get('[name=amount_from]').clear().type('20');
    cy.get('[name=amount_to]').clear().type('80');
    cy.get('[data-test-id="clear-all-button"]').click();
    cy.get('[name=amount_from]').should('be.empty');
    cy.get('[name=amount_to]').should('be.empty');
    cy.get('[name=amount_from]').clear().type('20');
    cy.get('[name=amount_to]').clear().type('80');
    cy.get('[data-test-id="apply-button"]').click();
    cy.get('tbody tr[class]').should('contain', amount);

    // should be able to filter by category
    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
      .click({ force: true });
    cy.get('[data-test-id="clear-all-button"]').click();
    cy.get('[name=purchase_category] div').invoke('attr', 'class')
      .should('contain', 'default');
    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
      .then(($div) => {
        const text = $div.text();
        cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
          .click({ force: true });
        cy.get('[data-test-id="apply-button"]').click();
        cy.get('tbody tr[class]').should('contain', text);
        if (creds.purchase_category < creds2.purchase_category) {
          cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`).prev()
            .then(($div) => {
              const text2 = $div.text();
              cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`).prev()
                .click({ force: true });
              cy.get('[data-test-id="apply-button"]').click();
              cy.get('tbody tr[class]').should('contain', text).and('contain', text2);
            });
        } else if(`${creds.purchase_category} == ${creds2.purchase_category}`){
            cy.get('[data-test-id="apply-button"]').click();
            cy.get('tbody tr[class]').should('contain', text);
        }
        else {
          cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`)
            .then(($div) => {
              const text2 = $div.text();
              cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`)
                .click({ force: true });
              cy.get('[data-test-id="apply-button"]').click();
              cy.get('tbody tr[class]').should('contain', text).and('contain', text2);
            });
        }
      });
    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds3.purchase_category})`)
      .then(($div) => {
        const text3 = $div.text();
        cy.get('tbody tr[class]').should('not.contain', text3);
      });

    // should be able to filter by payment method
    cy.get('[data-test-id="clear-all-button"]').click({ force: true });
    cy.get(`[name=payment_method] .menu div:nth-child(${creds.payment_method})`)
      .click({ force: true });
    cy.get('[data-test-id="clear-all-button"]').click({ force: true });
    cy.get('[name=payment_method] div').invoke('attr', 'class')
      .should('contain', 'default');
    cy.get(`[name=payment_method] .menu div:nth-child(${creds.payment_method})`)
      .then(($div) => {
        const text4 = $div.text();
        cy.get(`[name=payment_method] .menu div:nth-child(${creds.payment_method})`)
          .click({ force: true });
        cy.get('[data-test-id="apply-button"]').click({ force: true }).wait(2000);
        cy.get('tbody tr[class]:nth-child(1)').click().window();
        cy.get('.active .header').should('contain', 'Invoice');
        cy.get('[class*=detailTable] tr:nth-child(3) td:nth-child(2)')
          .should('have.text', text4);
        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
      });
    cy.get(`[name=payment_method] .menu div:nth-child(${creds3.payment_method})`)
      .then(($div) => {
        const text5 = $div.text();
        cy.get('tbody tr[class]:nth-child(2)').click().window();
        cy.get('.active .header').should('contain', 'Invoice');
        cy.get('[class*=detailTable] tr:nth-child(3) td:nth-child(2)')
          .should('not.have.text', text5);
        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
      });
    // should be able to filter by VAT
    cy.get('[data-test-id="clear-all-button"]').should('contain', 'Clear all').click({ force: true });
    cy.get('[name=vat] > i').click({ force: true });
    cy.get(`[name=vat] .menu div:nth-child(${creds.vat})`)
      .click({ force: true });
    cy.get('[data-test-id="clear-all-button"]').should('contain', 'Clear all').click({ force: true });
    cy.get('[name=vat] div').invoke('attr', 'class')
      .should('contain', 'default');
    cy.get('[name=vat] > i').click({ force: true });
    cy.get(`[name=vat] .menu div:nth-child(${creds.vat})`)
      .then(($div) => {
        const text6 = $div.text();
        cy.get(`[name=vat] .menu div:nth-child(${creds.vat})`)
          .click({ force: true });
        cy.get('[data-test-id="apply-button"]').click({ force: true }).wait(2000);
        cy.get('tbody tr[class]:nth-child(1)').click().window();
        cy.get('.active .header').should('contain', 'Invoice');
        cy.get('[class*=detailTable] tr:nth-child(5) td:nth-child(2)')
          .should('have.text', text6);
        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
      });
    cy.get('[name=vat] > i').click({ force: true });
    cy.get(`[name=vat] .menu div:nth-child(${creds3.vat})`)
      .then(($div) => {
        const text7 = $div.text();
        cy.get('tbody tr[class]:nth-child(1)').click().window();
        cy.get('.active .header').should('contain', 'Invoice');
        cy.get('[class*=detailTable] tr:nth-child(5) td:nth-child(2)')
          .should('not.have.text', text7);
        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
      });
      cy.get('[data-test-id="clear-all-button"]').should('contain', 'Clear all').click({ force: true });
      cy.get('[data-test-id="filters-button"]').click();
  });

  it('Should be able to filter invoices by two filters', () => {
    // should be able to filter by amount and category
    cy.get('[data-test-id="filters-button"]').click();
    cy.get('[name=amount_from]').clear().type('20');
    cy.get('[name=amount_to]').clear().type('80');
    cy.get('[name=purchase_category] div').invoke('attr', 'class')
      .should('contain', 'default');
    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
      .then(($div) => {
        const text2 = $div.text();
        cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
          .click({ force: true });
        cy.get('[data-test-id="apply-button"]').click();
        cy.get('tbody tr[class]').should('contain', amount);
        cy.get('tbody tr[class]').should('contain', text2);
      });

    // should be able to filter by payment method and VAT
    cy.get('[data-test-id="clear-all-button"]').should('contain', 'Clear all').click({ force: true });
    cy.get('[name=payment_method] div').invoke('attr', 'class')
      .should('contain', 'default');
    cy.get(`[name=payment_method] .menu div:nth-child(${creds2.payment_method})`)
      .then(($div) => {
        const text = $div.text();
        cy.get(`[name=payment_method] .menu div:nth-child(${creds2.payment_method})`);
        cy.get(`[name=payment_method] .menu div:nth-child(${creds2.payment_method})`)
          .click({ force: true });
        cy.get('[name=vat] div').invoke('attr', 'class')
          .should('contain', 'default');
        cy.get('[name=vat] > i').click({ force: true });
        cy.get(`[name=vat] .menu div:nth-child(${creds2.vat})`)
          .then(($div) => {
            const text2 = $div.text();
            cy.get('[name=vat] > i').click({ force: true });
            cy.get(`[name=vat] .menu div:nth-child(${creds2.vat})`)
              .click({ force: true });
            cy.get('[data-test-id="apply-button"]').should('contain', 'Apply filters')
                .click({ force: true }).wait(2000);
            cy.get('tbody tr[class]:nth-child(1)').click({ force: true }).window();
            cy.get('.active .header').should('contain', 'Invoice');

            cy.get('body').then(($body) => {
              if ($body.find('[class*=detailTable] tr:nth-child(5) td:nth-child(2)').text() === text2) {
                cy.get('[data-test-id=button-close]').should('contain', 'Close').click({ force: true });
              } else if ($body.find('[class*=detailTable] tr:nth-child(3) td:nth-child(2)').text() === text) {
                cy.get('[data-test-id=button-close]').should('contain', 'Close').click({ force: true });
              } else throw new Error('Filter Not Working Properly!!!');
            });
          });
      });
  });
});
