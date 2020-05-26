import {getCredentials, userId} from "../../../support/commands";
cy.faker = require('faker');

var creds = getCredentials();

describe('User management spec', () => {

    beforeEach('Log in home page',() => {
        cy.clearLocalStorage();
        cy.visit('/');
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get("[href='/users']").should('contain', 'Users').click();
        cy.url().should('contain', 'users');
    });


    it('Should create New User', () => {
        cy.get("[data-test-id='button-new-user']").should('contain', 'New user').click();
        cy.get(".AddUserModal").should('contain', 'New user');
        cy.get("[name='fname']").type(creds.firstName);
        cy.get("[name='lname']").type(creds.lastName);
        cy.get("[name='email']").type(creds.email);
        cy.get("[name='passwd']").type(creds.password);
        cy.get("[name='passwdCheck']").type(creds.password);
        cy.get("[data-test-id='button-add']").should('contain', 'Add').click();
        cy.get("[data-test-id='input-field-search'] input").clear().type(creds.email);
        cy.get(".current_user")
            .should('contain', creds.firstName + " " + creds.lastName);
        cy.get(".current_user+div")
            .should('contain', creds.email)
            .parents("tr")
            .find("td:nth-child(3)")
            .should('not.contain', 'Active');
        cy.get(".current_user+div")
            .parents("tr")
            .find("td:nth-child(4)")
            .should('be.empty');
        cy.get(".current_user").click();
        cy.get(".UserPage .header")
            .should('contain', 'User ' + creds.firstName + " " + creds.lastName);
        cy.get("[data-test-id='personal-data-firstName'] label+div")
            .should('contain', creds.firstName);
        cy.get("[data-test-id='personal-data-lastName'] label+div")
            .should('contain', creds.lastName);
        cy.get(".PersonalData form > .seal")
            .should('contain', creds.email);
        cy.get("[data-test-id='button-close']")
            .should('contain', 'Close')
            .click()
            .get("[data-test-id='user-page'] .name")
            .should('contain', 'Users');

        cy.get("[data-test-id='input-field-search'] input")
            .clear().type(creds.email);
        cy.get("body").then($body => {
            if ($body.find(".container.nothing-found").length === 0) {
                cy.get(".current_user")
                    .should('contain', creds.firstName + " " + creds.lastName).click();
                cy.get(".content .column .red.button")
                    .should('contain', 'Remove User').click();
                cy.get('.userDeleteConfirm button.ui.red').click();
            } else {
                console.log("User by that email not found!!!");
            }
        });
        cy.get("[data-test-id='input-field-search'] input").clear();
    });

    it('Should not log in when user is blocked', () => {
        cy.createNewUser(creds);
        cy.logout();
        cy.webLogin(creds.email, creds.password);
        cy.get('.noty_body')
            .should('contain', 'Your account is blocked. Please contact your company.');
        cy.webLogin(creds.login, creds.pass);
        cy.deleteUser(creds);
    });

    it('Should not create New User with invalid input data', () => {
        cy.get("[data-test-id='button-new-user']")
            .should('contain', 'New user').click();
        cy.get(".AddUserModal").should('contain', 'New user');
        cy.get("[data-test-id='button-add']").should('contain', 'Add').click();
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(1)").should('contain', 'This field is required');
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(2)").should('contain', 'This field is required');
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(3)").should('contain', 'This field is required');
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(4)").should('contain', 'This field is required');
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(5)").should('contain', 'This field is required');
        cy.get("[name='fname']").type(creds.firstName);
        cy.get("[name='lname']").type(creds.lastName);
        cy.get("[name='email']").type("tt");
        cy.get("[name='passwd']").type('invalidpassword');
        cy.get("[name='passwdCheck']").type(creds.password);
        cy.get("[data-test-id='button-add']").should('contain', 'Add').click();
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(3)").should('contain', 'Length must be greater than 3');
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(4)").should('contain', 'Does not match requirements');
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(5)").should('contain', 'Passwords don\'t match');
        cy.get("[name='email']").clear().type("invalidmail");
        cy.get("[name='passwd']").clear().type(creds.password);
        cy.get("[data-test-id='button-add']").should('contain', 'Add').click();
        cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(3)").should('contain', 'Invalid email');
        cy.get("[data-test-id='button-abort']").click();
    });

    it('Should be able to log in successfully when user status is active', () => {
        cy.createNewUser(creds);
        cy.get(".input.search input").clear().type(creds.email);
        cy.get(".current_user").click();
        cy.get("[data-test-id='button-edit']")
            .should('contain', 'Edit').click();
        cy.get("[data-test-id='button-blockWeb']")
            .should('contain', 'Unblock browser').click()
            .should('contain', 'Block browser');
        cy.get("[data-test-id='button-save']")
            .should('contain', 'Save').click();
        cy.logout();
        cy.webLogin(creds.email, creds.password);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get("[href='/users']").should('not.exist');
        cy.get("[href='/services']").should('not.exist');
        cy.get("[href='/settings']").should('not.exist');
        cy.logout();
        cy.webLogin(creds.login, creds.pass);
        cy.deleteUser(creds);
    });
});
