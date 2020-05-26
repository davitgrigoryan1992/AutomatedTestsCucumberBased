import faker from "faker";
import {getCredentials} from "../../../support/commands";
cy.faker = require('faker');

describe('User management spec', () => {

    beforeEach('Log in home page', () => {
        global.creds = getCredentials();
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get("[href='/users']").should('contain', 'Users').click();
        cy.url().should('contain', 'users');
        global.positionName = faker.random.words();
        global.positionName1 = faker.random.words();
        global.newPositionName = faker.random.words();
        global.number = faker.random.number({digits:5});
        global.number1 = faker.random.number({digits:4});
        global.number2 = faker.random.number({digits:5});
    });

    it('Should add new position', () => {
        cy.createNewUser(creds);
        cy.get('.ui.icon.primary.button').click();
        cy.get('[data-test-id="position-modal"] .header').should('contain', 'New position');
        cy.get('[name=name]').clear();
        cy.get('[data-test-id="save-button"]').click();
        cy.get('.input-errors').should('contain','This field is required');
        cy.get('[name=name]').clear().type(positionName);
        cy.get('[data-test-id="close-button"]').click();
        cy.get('.six.wide.column').should('not.contain', positionName);
        cy.get('.ui.icon.primary.button').click();
        cy.get('[data-test-id="position-modal"] .header').should('contain', 'New position');
        cy.get('[name=name]').clear().type(positionName);
        cy.get('[data-test-id="save-button"]').click();
        cy.get('.six.wide.column').should('contain', positionName);
        cy.get("[data-test-id='input-field-search'] input").clear().type(creds.email);
        cy.get(".current_user").click();
        cy.get("[data-test-id='button-edit']")
            .should('contain', 'Edit').click();
        cy.get("[name='position']").click();
        cy.get("[name='position'] [role='option']").contains(positionName).parent().click();
        cy.get("[data-test-id='button-save']")
            .should('contain', 'Save').click();
        cy.get("[data-test-id='input-field-search'] input").clear().type(creds.email);
        cy.get(".current_user").click();
        cy.get('.seal').contains('Position').parent().find('div').should('contain',positionName);
        cy.get('[data-test-id=button-close]').click();

        // Edit position
        cy.get('tbody tr td:nth-child(1)')
            .contains(positionName).click();
        cy.get('[name=name]').clear().type(newPositionName);
        cy.get('.checkbox').contains('Fuel').click();
        cy.get('.checkbox').contains('Fuel')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Food').click();
        cy.get('.checkbox').contains('Food')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Hotel').click();
        cy.get('.checkbox').contains('Hotel')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Rent a car').click();
        cy.get('.checkbox').contains('Rent a car')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Dinner with clients').click();
        cy.get('.checkbox').contains('Dinner with clients')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Miscellaneous').click();
        cy.get('.checkbox').contains('Miscellaneous')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('[data-test-id="position-content"] .name')
            .contains('CC').parent().find('[type="text"]').clear().type(number);
        cy.get('[data-test-id="position-content"] .name')
            .contains('Cash').parent().find('[type="text"]').clear().type(number1);
        cy.get('[data-test-id="position-content"] .name')
            .contains('Cash card').parent().find('[type="text"]').clear().type(number2);
        cy.get('[data-test-id="close-button"]').click();
        cy.get('.six.wide.column').should('not.contain', newPositionName);

        cy.get('tbody tr td:nth-child(1)')
            .contains(positionName).click();
        cy.get('[name=name]').clear().type(newPositionName);
        cy.get('.checkbox').contains('Fuel').click();
        cy.get('.checkbox').contains('Fuel')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Food').click();
        cy.get('.checkbox').contains('Food')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Hotel').click();
        cy.get('.checkbox').contains('Hotel')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Rent a car').click();
        cy.get('.checkbox').contains('Rent a car')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Dinner with clients').click();
        cy.get('.checkbox').contains('Dinner with clients')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('.checkbox').contains('Miscellaneous').click();
        cy.get('.checkbox').contains('Miscellaneous')
            .parent().invoke('attr', 'class').should('not.contain','checked');
        cy.get('[data-test-id="position-content"] .name')
            .contains('CC').parent().find('[type="text"]').clear().type(number);
        cy.get('[data-test-id="position-content"] .name')
            .contains('Cash card').parent().find('[type="text"]').clear().type(number2);
        cy.get('[data-test-id="position-content"] .name').last()
            .parent().find('[type="text"]').clear().type(number1);
        cy.get('[data-test-id="save-button"]').click();

        // todo: Edit existed Position feature is not implemented yet.
        // cy.get('tbody tr td:nth-child(1)').should('contain',newPositionName);
        // cy.get('tbody tr td:nth-child(1)').contains(newPositionName).click();
        // cy.get('.checkbox').contains('Food')
        //     .parent().invoke('attr', 'class').should('not.contain','checked');
        // cy.get('.checkbox').contains('Hotel')
        //     .parent().invoke('attr', 'class').should('not.contain','checked');
        // cy.get('.checkbox').contains('Rent a car')
        //     .parent().invoke('attr', 'class').should('not.contain','checked');
        // cy.get('.checkbox').contains('Dinner with clients')
        //     .parent().invoke('attr', 'class').should('not.contain','checked');
        // cy.get('.checkbox').contains('Miscellaneous')
        //     .parent().invoke('attr', 'class').should('not.contain','checked');
        //
        // cy.get('[data-test-id="position-content"] .name')
        //     .contains('CC').parent().find('[type="text"]').should('contains',number);
        // cy.get('[data-test-id="position-content"] .name').last()
        //     .parent().find('[type="text"]').should('contains',number1);
        // cy.get('[data-test-id="position-content"] .name')
        //     .contains('Cash card').parent().find('[type="text"]').should('contains',number2);

    });

    it('Should be able to remove the position from 3-dot menu', () => {
        cy.get('.ui.icon.primary.button').click();
        cy.get('[data-test-id="position-modal"] .header').should('contain', 'New position');
        cy.get('[name=name]').clear();
        cy.get('[data-test-id="save-button"]').click();
        cy.get('.input-errors').should('contain', 'This field is required');
        cy.get('[name=name]').clear().type(positionName1);
        cy.get('[data-test-id="save-button"]').click();
        cy.get('.six.wide.column').should('contain', positionName1);
        cy.get('tbody tr td:nth-child(1)').contains(positionName1).parent().find('.dropdown').click();
        cy.get('.menu.transition.left.visible').click();
        cy.get('.name').should('contain',positionName1);
        cy.get('.ui.small.basic.button').click();
        cy.get('.six.wide.column').should('contain', positionName1);
        cy.get('.menu.transition.left.visible').click();
        cy.get('.name').should('contain',positionName1);
        cy.get('.ui.red.small.button').click();
        cy.get('.six.wide.column').should('not.contain', positionName1);
    });
});
