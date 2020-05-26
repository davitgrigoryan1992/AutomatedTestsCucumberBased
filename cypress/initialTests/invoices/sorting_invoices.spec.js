import faker from 'faker';
import {getCredentials} from '../../support/commands';
import 'cypress-file-upload';

cy.faker = require('faker');

describe('Invoices page', () => {
    const creds = getCredentials();
    const creds2 = getCredentials();
    const creds3 = getCredentials();
    const amount = faker.random.number({min: 20, max: 80});
    const amount2 = faker.random.number({min: 100, max: 500});
    const amount3 = faker.random.number({min: 600, max: 999});

    beforeEach(() => {
        cy.server();
        cy.route('GET', '**receipt?limit=30**').as('invoicePage');
        cy.clearLocalStorage();
        cy.visit('/');
        // Create five users
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

    it('Should be able to sort invoices', () => {
        // Check that the numbers are sorted by descending order
        cy.get('table thead th:nth-child(1)')
            .should('have.class', 'Num').click()
            .should('have.class', 'descending');
        for (var i = 1; i < 3; i++) {
            cy.get(`table tbody tr:nth-child(${i}) td:nth-child(1) p`).then(($p) => {
                global.text1 = $p.text();
                global.text2 = $p.parent().parent().next('tr').find('td:nth-child(1) p').text();
                if (`${text1}` >= `${text2}`) {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                } else {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                    throw new Error("Invoices are not sorted correctly by number !!!");
                }
            });
            cy.log("Invoices are sorted correctly by number!!!");
        }

        //Check that the numbers are sorted by ascending order
        cy.get('table thead th:nth-child(1)')
            .should('have.class', 'descending').click();
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get('[data-test-id="input-field-search"]').click();
        cy.get('table thead th:nth-child(1)').should('have.class', 'ascending');
        for (var i = 1; i < 3; i++) {
            cy.get(`table tbody tr:nth-child(${i}) td:nth-child(1) p`).then(($p) => {
                global.text1 = $p.text();
                global.text2 = $p.parent().parent().next('tr').find('td:nth-child(1) p').text();
                if (`${text1}` <= `${text2}`) {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                } else {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                    throw new Error("Invoices are not sorted correctly by number !!!");
                }
            });
        }
        cy.log("Invoices are sorted correctly by number!!!");

        // Check that the amounts are sorted by ascending order
        cy.get('table thead th:nth-child(7)')
            .should('have.class', 'sortable').click();
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get('[data-test-id="input-field-search"]').click();
        cy.get('table thead th:nth-child(7)').should('have.class', 'ascending');
        for (var i = 1; i < 3; i++) {
            cy.get(`table tbody tr:nth-child(${i}) td:nth-child(7) span`).then(($span) => {
                global.text1 = $span.text();
                global.text2 = $span.parent().parent().next('tr').find('td:nth-child(7) span').text();
                if (`${text1}` <= `${text2}`) {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                } else {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                    throw new Error("Invoices are not sorted correctly by amount !!!");
                }
            });
        }
        cy.log("Invoices are sorted correctly by number!!!");

        // Check that the amounts are sorted by descending order
        cy.get('table thead th:nth-child(7)')
            .should('have.class', 'ascending').click();
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get('[data-test-id="input-field-search"]').click();
        cy.get('table thead th:nth-child(7)').should('have.class', 'descending');
        for (var i = 1; i < 3; i++) {
            cy.get(`table tbody tr:nth-child(${i}) td:nth-child(7) span`).then(($span) => {
                global.text1 = $span.text();
                global.text2 = $span.parent().parent().next('tr').find('td:nth-child(7) span').text();
                if (`${text1}` >= `${text2}`) {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                } else {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                    throw new Error("Invoices are not sorted correctly by amount !!!");
                }
            });
        }
        cy.log("Invoices are sorted correctly by number!!!");

        // Check that the descriptions are sorted by descending order
        cy.get('table thead th:nth-child(2)')
            .should('have.class', 'sortable').click();
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get('[data-test-id="input-field-search"]').click();
        cy.get('table thead th:nth-child(2)').should('have.class', 'descending');
        for (var i = 1; i < 3; i++) {
            cy.get(`table tbody tr:nth-child(${i}) td:nth-child(2) p`).then(($p) => {
                global.text1 = $p.text();
                global.text2 = $p.parent().parent().next('tr').find('td:nth-child(2) p').text();
                if (`${text1}` >= `${text2}`) {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                } else {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                    throw new Error("Invoices are not sorted correctly by description!!!");
                }
            });
        }
        cy.log("Invoices are sorted correctly by description!!!");

        // Check that the descriptions are sorted by ascending order
        cy.get('table thead th:nth-child(2)')
            .should('have.class', 'descending').click();
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get('[data-test-id="input-field-search"]').click();
        cy.get('table thead th:nth-child(2)').should('have.class', 'ascending');
        for (var i = 1; i < 3; i++) {
            cy.get(`table tbody tr:nth-child(${i}) td:nth-child(2) p`).then(($p) => {
                global.text1 = $p.text();
                global.text2 = $p.parent().parent().next('tr').find('td:nth-child(2) p').text();
                if (`${text1}` <= `${text2}`) {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                } else {
                    cy.log(`${text1}`);
                    cy.log(`${text2}`);
                    throw new Error("Invoices are not sorted correctly by description !!!");
                }
            });
        }
        cy.log("Invoices are sorted correctly by description!!!");
    });
});
