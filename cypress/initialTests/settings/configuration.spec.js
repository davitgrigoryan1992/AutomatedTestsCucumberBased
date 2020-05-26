import { getCredentials, getMailInfo} from '../../support/commands';

cy.faker = require('faker');
const creds = getCredentials();
const info = getMailInfo();

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

    it('Should not edit mail sending', () => {
        cy.get('[data-test-id="edit-sending"]').click();
        cy.get('.active .header').should('contain','Mail sending');
        cy.get('[name="smtp.from"]').clear().type(info.email);
        cy.get('[name="smtp.host"]').clear().type(info.smtpHost);
        cy.get('[name="smtp.port"]').clear().type(info.smtpPort);
        cy.get('[name="smtp.user"]').clear().type(info.userEmail);
        cy.get('[name="smtp.password"]').clear().type(info.password);
        cy.get('.ui.small.basic.button').contains('Close').click();
    });

    it('Should edit mail sending', () => {
        cy.get('[data-test-id="edit-sending"]').click();
        cy.get('.active .header').should('contain','Mail sending');
        cy.get('[name="smtp.from"]').clear().type(info.email);
        cy.get('[name="smtp.host"]').clear().type(info.smtpHost);
        cy.get('[name="smtp.port"]').clear().type(info.smtpPort);
        cy.get('[name="smtp.user"]').clear().type(info.userEmail);
        cy.get('[name="smtp.password"]').clear().type(info.password);
        cy.get('.ui.small.positive.button').contains('Save').click();
        cy.get('[data-test-id="edit-sending"]').click();
        cy.get('.active .header').should('contain','Mail sending');
        cy.get('[name="smtp.from"]').should('have.value',`${info.email}`);
        cy.get('[name="smtp.host"]').should('have.value',`${info.smtpHost}`);
        cy.get('[name="smtp.port"]').should('have.value',`${info.smtpPort}`);
        cy.get('[name="smtp.user"]').should('have.value',`${info.userEmail}`);
        cy.get('[name="smtp.password"]').should('have.value',`${info.password}`);
    });

    it('Should not edit email templeting', () => {
        cy.get('[data-test-id="edit-template"]')
            .contains('Edit').click();
        cy.get('.button').contains('QR code').click();
        cy.get('.button').contains('Password Reset Link').click();
        cy.get('.button').contains('Login Link').click();
        cy.get('.button').contains('QR code').click();
        cy.get('.button').contains('First Name').click();
        cy.get('.button').contains('Last Name').click();
        cy.get('[ data-test-id="button-close"]').contains('Close').click();
        cy.get('[data-test-id="edit-template"]')
            .contains('Edit').click();
        cy.get('[role=textbox] div').should('contain','${qr}')
            .should('not.contain','${reset_password_link}')
            .should('not.contain','${login_link}')
            .should('not.contain','${first_name}')
            .should('not.contain','${last_name}');
    });

    it('Should edit email templeting', () => {
        cy.get('[data-test-id="configuration"]')
            .should('contain', 'Mail sending')
            .should('contain', 'Email templates');
        cy.get('[data-test-id="edit-template"]')
            .contains('Edit').click();
        cy.get('.active .header').should('contain','Email templates');
        cy.get('.tabular.menu').should('contain','New user')
            .should('contain','Reset password')
            .should('contain','Send QR Code');
        cy.get('.field').should('contain','Subject');
        cy.get('[class*=placeholdersWrapper]').should('contain','QR code')
            .should('contain','Password Reset Link')
            .should('contain','Login Link')
            .should('contain','First Name')
            .should('contain','Last Name');
        cy.get('.button').contains('QR code').click();
        cy.get('.button').contains('Password Reset Link').click();
        cy.get('.button').contains('Login Link').click();
        cy.get('.button').contains('QR code').click();
        cy.get('.button').contains('First Name').click();
        cy.get('.button').contains('Last Name').click();
        cy.get('[role=textbox] div').should('contain','${qr}')
            .should('contain','${reset_password_link}')
            .should('contain','${login_link}')
            .should('contain','${first_name}')
            .should('contain','${last_name}');
        // cy.get('.ui.small.basic.button').contains('Test E-Mail').click();
         cy.on('window:confirm', function(confirmText) {
           expect(confirmText).eq('We have sent a test email to your mailbox.')
         });
        cy.get('[ data-test-id="test-email"]').contains('Test E-Mail').click();
        cy.get('[ data-test-id="button-save"]').contains('Save').click();
        cy.get('[data-test-id="edit-template"]')
            .contains('Edit').click();
        cy.get('[role=textbox] div').should('contain','${qr}')
           .should('contain','${reset_password_link}')
           .should('contain','${login_link}')
           .should('contain','${first_name}')
           .should('contain','${last_name}');
    });
});
