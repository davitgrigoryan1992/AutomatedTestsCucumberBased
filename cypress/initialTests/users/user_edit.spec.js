import {getCredentials} from "../../../support/commands";
cy.faker = require('faker');

describe('User management spec', () => {

    beforeEach('Log in home page',() => {
        cy.clearLocalStorage();
        cy.visit('/');
        global.creds = getCredentials();
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('not.contain', 'login');
        cy.get("[href='/users']").should('contain', 'Users').click();
        cy.url().should('contain', 'users');
    });

    it('Should be able to edit New User data', () => {
        cy.createNewUser(creds);
        cy.get("[data-test-id='input-field-search'] input").clear().type(creds.email);
        cy.get(".current_user").click();
        cy.get("[data-test-id='button-edit']")
            .should('contain', 'Edit').click();
        cy.get("[name='fname']").clear().type('new'+creds.firstName);
        cy.get("[name='lname']").clear().type('new'+creds.lastName);
        cy.get("[name='email']").clear().type('new'+creds.email);
        cy.get("[name='role']").click();
        cy.get("[name='role'] [role='option']:nth-child(1)")
            .should('contain', 'Admin').click();
        cy.get("[name='position']").click();
        cy.get("[name='position'] [role='option']:nth-child(2)")
            .should('contain', 'Accounting').click();
        cy.get("[data-test-id='button-change-password']")
            .should('contain', 'Change Password').click();
        cy.get(".AddUserModal .header")
            .should('contain', 'Change Password');
        cy.get("[data-test-id='button-confirm']")
            .should('contain', 'Confirm').click();
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(1)")
            .should('contain', 'This field is required');
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(2)")
            .should('contain', 'This field is required');
        cy.get("[name='passwd']").type('invalidpass');
        cy.get("[name='passwdCheck']").type(creds.password);
        cy.get("[data-test-id='button-confirm']").should('contain', 'Confirm').click();
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(1)")
            .should('contain', 'Does not match requirements');
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(2)")
            .should('contain', 'Passwords don\'t match');
        cy.get("[name='passwd']").clear().type('new'+creds.password);
        cy.get("[name='passwdCheck']").clear().type('new'+creds.password);
        cy.get("[data-test-id='button-confirm']")
            .should('contain', 'Confirm').click();
        cy.get("[data-test-id='button-blockWeb']")
            .should('contain', 'Unblock browser').click()
            .should('contain', 'Block browser');
        cy.get("[data-test-id='button-save']")
            .should('contain', 'Save').click();
        cy.logout();
        cy.webLogin('new'+creds.email, 'new'+creds.password);
        cy.url().should('contain', 'invoices');
        cy.get("[href='/users']").should('contain', 'Users').click();
        cy.url().should('contain', 'users');
        cy.get(".input.search input").clear().type('new'+creds.email);
        cy.get(".current_user").click();
        cy.get("[data-test-id='personal-data-firstName'] label+div").invoke('text').should('eq', 'new'+creds.firstName);
        cy.get("[data-test-id='personal-data-lastName'] label+div").invoke('text').should('eq', 'new'+creds.lastName);
        cy.get(".PersonalData form > .seal")
            .should('contain', creds.email);
        cy.get("[data-test-id='button-close']")
            .should('contain', 'Close')
            .click()
            .get("[data-test-id='user-page'] .name")
            .should('contain', 'Users');
        cy.get(`[data-test-id='three-dot-new${creds.email}'] .menu .item`)
            .should('have.length', 1);
        cy.logout();
        cy.webLogin(creds.login, creds.pass);
        cy.deleteUser(creds);
    });

    it('Should be able to change user password from 3-dot menu', () => {
        cy.createNewUser(creds);
        cy.get(".input.search input").clear().type(creds.email);
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`)
            .should('have.length', 3);
        cy.get(`[data-test-id='three-dot-${creds.email}']`).click();
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`)
            .first().click();
        // change password, check invalid password validation
        cy.get(".AddUserModal .header")
            .should('contain', 'Change Password');
        cy.get("[data-test-id='button-confirm']")
            .should('contain', 'Confirm').click();
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(1)")
            .should('contain', 'This field is required');
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(2)")
            .should('contain', 'This field is required');
        cy.get("[name='passwd']").type('invalidpass');
        cy.get("[name='passwdCheck']").type(creds.password);
        cy.get("[data-test-id='button-confirm']").should('contain', 'Confirm').click();
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(1)")
            .should('contain', 'Does not match requirements');
        cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(2)")
            .should('contain', 'Passwords don\'t match');
        cy.get("[name='passwd']").clear().type('new'+creds.password);
        cy.get("[name='passwdCheck']").clear().type('new'+creds.password);
        cy.get("[data-test-id='button-confirm']")
            .should('contain', 'Confirm').click();
        cy.logout();
        cy.webLogin(creds.login, creds.pass);
        cy.deleteUser(creds);
    });

    it('Should be able to block the user from 3-dot menu', () => {
        cy.createNewUser(creds);
        cy.get("[data-test-id='input-field-search'] input")
            .clear().type(creds.email);
        cy.get(`[data-test-id='three-dot-${creds.email}']`).click();
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`)
            .eq(1).click(); // click 2nd child
        cy.get(".input.search input").clear().type(creds.email);
        cy.logout();
        cy.webLogin(creds.email, creds.password);
        cy.get('.noty_body')
            .should('contain', 'Your account is blocked. Please contact your company.');
        cy.webLogin(creds.login, creds.pass);
        cy.deleteUser(creds);
    });

    it('Should be able to remove the user from 3-dot menu', () => {
        cy.createNewUser(creds);
        cy.get("[data-test-id='input-field-search'] input")
            .clear().type(creds.email);
        cy.get(`[data-test-id='three-dot-${creds.email}']`).click();
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`)
            .eq(2).click(); // click 3rd child
        cy.get('button.ui.red').click();
        cy.get("[data-test-id='input-field-search'] input")
            .clear().type(creds.email);
        cy.get("div.nothing-found")
            .should('exist');
        cy.get("[data-test-id='input-field-search'] input").clear();
    });
});
