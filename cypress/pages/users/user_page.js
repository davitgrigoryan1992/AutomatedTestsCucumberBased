import {getCredentials} from '../../support/commands';
import faker from "faker";

cy.faker = require('faker');
global.creds = getCredentials();
global.positionName = faker.random.words();
global.positionName1 = faker.random.words();
global.newPositionName = faker.random.words();
global.number = faker.random.number({digits: 5});
global.number1 = faker.random.number({digits: 4});
global.number2 = faker.random.number({digits: 5});


const New_User_Button = "[data-test-id='button-new-user']";
const New_User_Text = 'New user';
const First_Name_Field = "[name='fname']";
const Last_Name_Field = "[name='lname']";
const Email_Field = "[name='email']";
const Password_Field = "[name='passwd']";
const Password_Confirm_Field = "[name='passwdCheck']";
const Add_Button = "[data-test-id='button-add']";
const Search_Field = "[data-test-id='input-field-search'] input";
const Click_User = ".current_user";
const Click_Close = "[data-test-id='button-close']";
const CLick_Remeve_User = ".content .column .red.button";
const Remove_User_Text = 'Remove User';
const Confirm_Remove_User = '.userDeleteConfirm button.ui.red';
const Click_Abort = '[data-test-id="button-abort"]';
const Click_Edit = "[data-test-id='button-edit']";
const Click_Unblock = "[data-test-id='button-blockWeb']";
const Click_Save = '[data-test-id="button-save"]';
const Click_Role = "[name='role']";
const Select_Role = "[name='role'] [role='option']:nth-child(1)";
const Select_Position = "[name='position'] [role='option']:nth-child(2)";
const Click_Position = "[name='position']";
const Click_Change_Password = "[data-test-id='button-change-password']";
const Click_Confirm_Button = " [data-test-id='button-confirm']";
const Click_Delete = 'button.ui.red';
const Click_Sort_Number = '[data-test-id=user-page] table thead th:nth-child(1)';
const Click_Sort_Email = '[data-test-id=user-page] table thead th:nth-child(2)';
const Click_Add_Position = '.ui.icon.primary.button';
const Position_Name_Field = '[name=name]';
const Click_Save_Position = '[data-test-id="save-button"]';
const Click_Close_Position = '[data-test-id="close-button"]';
const Click_New_Position = '.six.wide.column';
const Click_Remove_Position = '.menu.transition.left.visible';
const Click_Abort_Remove = '.ui.small.basic.button';
const Click_Delete_Position = '.ui.red.small.button';


class UserPage {
    static visit() {
        cy.clearLocalStorage();
        cy.visit('/');
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.get("[href='/users']").should('contain', 'Users').click();
        cy.url().should('contain', 'users');
    }

    static clickNewUSer() {
        cy.get(New_User_Button).contains(New_User_Text)
            .click();
    }

    static typeFirstName() {
        cy.get(First_Name_Field)
            .clear().type(creds.firstName);
    }

    static typeNewFirstName() {
        cy.get(First_Name_Field)
            .clear().type('new' + creds.firstName);
    }

    static typelastName() {
        cy.get(Last_Name_Field)
            .clear().type(creds.lastName);
    }

    static typeNewlastName() {
        cy.get(Last_Name_Field)
            .clear().type('new' + creds.lastName);
    }

    static typeEmail() {
        cy.get(Email_Field)
            .clear().type(creds.email);
    }

    static typeNewEmail() {
        cy.get(Email_Field)
            .clear().type('new' + creds.email);
    }

    static typeShortEmail() {
        cy.get(Email_Field)
            .clear().type('tt');
    }

    static typeInvalidEmail() {
        cy.get(Email_Field)
            .clear().type('Invalidemail');
    }

    static typePassword() {
        cy.get(Password_Field)
            .clear().type(creds.password);
    }

    static typeNewPassword() {
        cy.get(Password_Field)
            .clear().type('new' + creds.password);
    }

    static typeInvalidPassword() {
        cy.get(Password_Field)
            .clear().type('invalidpassword');
    }

    static typeConfirmPassword() {
        cy.get(Password_Confirm_Field)
            .clear().type(creds.password);
    }

    static clickAdd() {
        cy.get(Add_Button)
            .click();
        return new UserPage();
    }

    static searchEmail() {
        cy.get(Search_Field)
            .clear().type(creds.email).wait(500);
    }

    static clickUser() {
        cy.get(Click_User)
            .click()
    }

    static clickCLose() {
        cy.get(Click_Close)
            .click()
    }

    static clickAbort() {
        cy.get(Click_Abort)
            .click()
    }

    static clickUnblock() {
        cy.get(Click_Unblock)
            .click()
    }

    static clickEdit() {
        cy.get(Click_Edit)
            .click()
    }

    static clickRemove() {
        cy.get(CLick_Remeve_User).contains(Remove_User_Text)
            .click()
    }

    static confirmRemove() {
        cy.get(Confirm_Remove_User)
            .click()
    }

    static createUser(cred) {
        cy.get(New_User_Button).contains(New_User_Text)
            .click();
        cy.get(First_Name_Field)
            .clear().type(cred.firstName);
        cy.get(Last_Name_Field)
            .clear().type(cred.lastName);
        cy.get(Email_Field)
            .clear().type(cred.email);
        cy.get(Password_Field)
            .clear().type(cred.password);
        cy.get(Password_Confirm_Field)
            .clear().type(cred.password);
        cy.get(Add_Button).should('contain', 'Add')
            .click();
        cy.get('[data-test-id=user-page]').should('contain', 'Users');

    }

    static removeUser(cred) {
        cy.server();
        cy.route('GET', '**/user?page=1**').as('userPage');
        cy.visit('/users').wait('@userPage');
        cy.get('[data-test-id=user-page]').should('contain', 'Users');
        cy.url().should('contain', 'users');
        cy.get(Search_Field)
            .clear().type(cred.email);
        cy.get(Click_User)
            .click();
        cy.get(CLick_Remeve_User).contains(Remove_User_Text)
            .click();
        cy.get(Confirm_Remove_User)
            .click();
    }

    static clickSave() {
        cy.get(Click_Save).should('contain', 'Save').click()

    }

    static SelectRole() {
        cy.get(Click_Role).click();
        cy.get(Select_Role).should('contain', 'Admin').click();
    }

    static SelectPosition() {
        cy.get(Click_Position).click();
        cy.get(Select_Position).should('contain', 'Accounting').click();
    }

    static SelectNewPosition() {
        cy.get(Click_Position).click();
        cy.get(Select_Position).should('contain', positionName).click();
    }

    static ClickChangePassword() {
        cy.get(Click_Change_Password).click();
    }

    static ConfirmPassword() {
        cy.get(Click_Confirm_Button).click();
    }

    static ChangePassword() {
        cy.get(Password_Field).clear().type('invalidpass');
    }

    static TypeNewPassword() {
        cy.get(Password_Field).clear().type('new' + creds.password);
    }

    static typeNewConfirmPassword() {
        cy.get(Password_Confirm_Field)
            .clear().type('new' + creds.password);
    }

    static Click3DotMenu() {
        cy.get(`[data-test-id='three-dot-${creds.email}']`)
            .click();
    }

    static SelectChangePassword() {
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`).first()
            .click();
    }

    static SelectUnblockUser() {
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`)
            .eq(1).click();
    }

    static SelectRemoveUser() {
        cy.get(`[data-test-id='three-dot-${creds.email}'] .menu .item`)
            .eq(2).click();
    }

    static ClickDelete() {
        cy.get(Click_Delete)
            .click();
    }

    static ClickSortByNumber() {
        cy.get(Click_Sort_Number).click().wait(500);

    }

    static ClickSortByEmail() {
        cy.get(Click_Sort_Email)
            .should('have.class', 'ascending').click().wait(500);
        cy.get(Click_Sort_Email)
            .should('have.class', 'descending');
    }

    static searchFirstName() {
        cy.get(Search_Field)
            .clear().type(creds.firstName).wait(500);
    }

    static searchLastName() {
        cy.get(Search_Field)
            .clear().type(creds.lastName);
    }

    static ClickAddPosition() {
        cy.get(Click_Add_Position).click();
        cy.get('[data-test-id="position-modal"] .header').should('contain', 'New position');
    }

    static TypePositionname(positionName) {
        cy.get(Position_Name_Field).clear().type(positionName);
    }

    static TypeNewPositionName() {
        cy.get(Position_Name_Field).clear().type(newPositionName);
    }

    static ClickSavePosition() {
        cy.get(Click_Save_Position).click();
    }

    static ClickClosePosition() {
        cy.get(Click_Close_Position).click();
    }

    static ChangePosition() {
        cy.get(Click_Position).click();
        cy.get("[name='position'] [role='option']").contains(positionName).parent().click();
    }

    static ClickOnPosition() {
        cy.get(Click_New_Position).contains(positionName).click();
    }

    static UncheckAllCategories() {
        cy.get('.checkbox').contains('Fuel').click();
        cy.get('.checkbox').contains('Fuel')
            .parent().invoke('attr', 'class').should('not.contain', 'checked');
        cy.get('.checkbox').contains('Food').click();
        cy.get('.checkbox').contains('Food')
            .parent().invoke('attr', 'class').should('not.contain', 'checked');
        cy.get('.checkbox').contains('Hotel').click();
        cy.get('.checkbox').contains('Hotel')
            .parent().invoke('attr', 'class').should('not.contain', 'checked');
        cy.get('.checkbox').contains('Rent a car').click();
        cy.get('.checkbox').contains('Rent a car')
            .parent().invoke('attr', 'class').should('not.contain', 'checked');
        cy.get('.checkbox').contains('Dinner with clients').click();
        cy.get('.checkbox').contains('Dinner with clients')
            .parent().invoke('attr', 'class').should('not.contain', 'checked');
        cy.get('.checkbox').contains('Miscellaneous').click();
        cy.get('.checkbox').contains('Miscellaneous')
            .parent().invoke('attr', 'class').should('not.contain', 'checked');
    }

    static EditPaymentAccounts() {
        cy.get('[data-test-id="position-content"] .name')
            .contains('CC').parent().find('[type="text"]').clear().type(number);
        cy.get('[data-test-id="position-content"] .name').last()
            .parent().find('[type="text"]').clear().type(number1);
        cy.get('[data-test-id="position-content"] .name')
            .contains('Cash card').parent().find('[type="text"]').clear().type(number2);

    }

    static ClickPosition3DotMenu(positionName) {
        cy.get('tbody tr td:nth-child(1)').contains(positionName)
            .parent().find('.dropdown').click();
    }

    static ClickRemovePosition() {
        cy.get(Click_Remove_Position).click();
    }

    static ClickAbortRemove() {
        cy.get(Click_Abort_Remove).click();
    }

    static ClickDeletePosition() {
        cy.get(Click_Delete_Position).click();
    }

    static RemovePosition() {
        this.ClickPosition3DotMenu(positionName);
        this.ClickRemovePosition();
        this.ClickDeletePosition()
    }
}

export default UserPage;
