import faker from 'faker';
import { getCredentials } from '../../support/commands';
import 'cypress-file-upload';

cy.faker = require('faker');

global.creds = getCredentials();
global.amount = faker.random.number({ min: 20, max: 80 });


describe('Invoices spec', () => {

  beforeEach('Log in home page', () => {
    cy.server();
    cy.route('GET', '**receipt?limit=30**').as('invoicePage');
    cy.clearLocalStorage();
    cy.visit('/');
    cy.webLogin(creds.login, creds.pass);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login').wait('@invoicePage');
  });

  it('Should download receipt data', () => {
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    cy.createNewInvoice(creds, 'receipt1.jpg', '1', amount);
    cy.get("[data-test-id='input-field-search'] input")
      .clear().type(creds.description);
    cy.get('tbody tr[class]:nth-child(1)').click();
    cy.get('[class*=detailTable] tr:nth-child(3) td:nth-child(2)')
      .then(($div) => {
        const method = $div.text();
        cy.get('[class*=detailTable] tr:nth-child(5) td:nth-child(2)')
          .then(($div) => {
            const vat = $div.text();
            cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
            cy.get('.ellipsis.horizontal.icon').first().click();
            cy.get('[class*=transition] a:nth-child(1)').invoke('attr', 'href').then((href) => {
              cy.request(href).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.include('User: Client User');
                expect(response.body).to.include('User Email: admin@test.com');
                expect(response.body).to.include(`${'Payment method:' + ' '}${method}`);
                expect(response.body).to.include(`${'VAT:' + ' '}${vat}`);
              });
            });
          });
      });
  });
});
