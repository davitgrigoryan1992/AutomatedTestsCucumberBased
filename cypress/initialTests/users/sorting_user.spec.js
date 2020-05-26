import {getCredentials} from "../../../support/commands";
cy.faker = require('faker');

describe('User page', () => {

    var creds = getCredentials();
    var creds2 = getCredentials();
    var creds3 = getCredentials();
    var creds4 = getCredentials();
    var creds5 = getCredentials();

    beforeEach(() => {
        // Create five users
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.createNewUser(creds);
        cy.createNewUser(creds2);
        cy.createNewUser(creds3);
        cy.createNewUser(creds4);
        cy.createNewUser(creds5);
        cy.server();
        cy.route('GET', '**/user?page=1**').as('userPage');
        cy.route('GET', '**/organization**').as('login');
        // cy.route('GET', '**/user?page=1&sort**').as('userSort');
        cy.get("[href='/users']").should('contain', 'Users').click();
        cy.url().should('contain', 'users');
    });

    afterEach('Delete created user', () => {
        cy.deleteUser(creds);
        cy.deleteUser(creds2);
        cy.deleteUser(creds3);
        cy.deleteUser(creds4);
        cy.deleteUser(creds5);
    });

    it('Should be able to sort users', () => {
        //Check that the numbers are sorted by ascending order
        cy.get('[data-test-id=user-page] table thead th:nth-child(1)')
            .should('have.class', 'sortable').click()
            .should('have.class', 'ascending');

        cy.get('[data-test-id=user-page] tbody tr:nth-child(3)')
            .should('contain', creds.email)
            .contains(creds.email).closest('tr')
            .find('+tr').should('contain', creds2.email)
            .find('+tr').should('contain', creds3.email)
            .find('+tr').should('contain', creds4.email)
            .find('+tr').should('contain', creds5.email);

        //Check that the numbers are sorted by descending order
        cy.get('[data-test-id=user-page] table thead th:nth-child(1)')
            .should('have.class', 'sortable').click()
            .should('have.class', 'descending');

        cy.get('[data-test-id=user-page] tbody tr:nth-child(1)')
            .should('contain', creds5.email)
            .contains(creds5.email).closest('tr')
            .find('+tr').should('contain', creds4.email)
            .find('+tr').should('contain', creds3.email)
            .find('+tr').should('contain', creds2.email)
            .find('+tr').should('contain', creds.email);

        //Update User email
        cy.updateUserEmail(creds.email, "AA"+creds.email);
        cy.updateUserEmail(creds2.email, "Bz"+creds2.email);
        cy.updateUserEmail(creds3.email, "Af"+creds3.email);
        cy.updateUserEmail(creds4.email, "Aa"+creds4.email);
        cy.updateUserEmail(creds5.email, "Ba"+creds5.email);

        //Check that the emails are sorted by ascending order
        cy.get('[data-test-id=user-page] tbody tr:nth-child(1)')
            .should('contain', 'AA'+creds.email)
            .contains("AA"+creds.email).closest('tr')
            .find('+tr').should('contain', "Aa"+creds4.email)
            .find('+tr').should('contain',"Af"+creds3.email)
            .find('+tr').should('contain',"Ba"+creds5.email)
            .find('+tr').should('contain',"Bz"+creds2.email);

        //Change sorting order
        cy.get('[data-test-id=user-page] table thead th:nth-child(2)')
            .should('have.class', 'ascending').click();
        cy.get('[data-test-id=user-page] table thead th:nth-child(2)')
            .should('have.class', 'descending');

        //Check that the emails are sorted by descending order
        cy.get('[data-test-id=user-page] tbody tr:nth-child(3)')
            .should('contain', 'Bz'+creds2.email)
            .contains("Bz"+creds2.email).closest('tr')
            .find('+tr').should('contain','Ba'+creds5.email)
            .find('+tr').should('contain','Af'+creds3.email)
            .find('+tr').should('contain','Aa'+creds4.email)
            .find('+tr').should('contain','AA'+creds.email);
    });

    it('Should be able to search for users', () => {
        //search users by first name
        cy.get(".input.search input").clear().type(creds.firstName);
        cy.get(".current_user")
            .should('contain', creds.firstName + " " + creds.lastName);
        cy.get(".current_user+div")
            .should('contain', creds.email);
        //search users by last name
        cy.get(".input.search input").clear().type(creds2.lastName);
        cy.get(".current_user")
            .should('contain', creds2.firstName + " " + creds2.lastName);
        cy.get(".current_user+div")
            .should('contain', creds2.email);
        //search users by email
        cy.get(".input.search input").clear().type(creds3.email);
        cy.get(".current_user")
            .should('contain', creds3.firstName + " " + creds3.lastName);
        cy.get(".current_user+div")
            .should('contain', creds3.email);
    });
});
