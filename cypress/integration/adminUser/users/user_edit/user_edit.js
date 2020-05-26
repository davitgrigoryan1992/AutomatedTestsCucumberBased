import {Given, Then, When, And, After} from 'cypress-cucumber-preprocessor/steps';
import UserPage from '../../../../pages/users/user_page'
import {getCredentials} from '../../../../support/commands';
import {
    AddUserProfilePage,
    InvalidPasswordError,
    LoginPage,
    EditedCredentialsPage,
    PasswordErrorMessage,
    RemoveUserPage, AddPositionError, LoginBlockedUserPage
}
    from "../../../../pages/users/user_result_page";

cy.faker = require('faker');
global.creds = getCredentials();

// Delete created user
After(()=> {
    cy.deleteUser(creds);
});

Given(/^I'm logged in Users page$/, () => {
    UserPage.visit()
});

And(/^I create new user$/, () => {
    cy.createNewUser(creds);
});

And(/^I search the email$/, () => {
    UserPage.searchEmail()
});

And(/^I click on user$/, () => {
    UserPage.clickUser()
});

And(/^Window contains user's credentials$/, () => {
    AddUserProfilePage.expect().toHaveUsersCredentials()
});

And(/^I click Edit$/, () => {
    UserPage.clickEdit()
});

And(/^I edit all fields$/, () => {
    UserPage.typeNewFirstName();
    UserPage.typeNewlastName();
    UserPage.typeNewEmail();
    UserPage.SelectRole();
    UserPage.SelectPosition();
});

And(/^I click change password$/, () => {
    UserPage.ClickChangePassword()
});

And(/^I click Confirm button$/, () => {
    UserPage.ConfirmPassword()
});

And(/^I receive error messages$/, () => {
    PasswordErrorMessage.expect().toReceiveErrorMessages()
});

And(/^I type invalid password$/, () => {
    UserPage.typeInvalidPassword()
});

And(/^I confirm password$/, () => {
    UserPage.typeConfirmPassword()
});

And(/^I click Save$/, () => {
    UserPage.clickSave()
});

And(/^Error messages are received$/, () => {
    InvalidPasswordError.expect().toReceiveErrorMessage()
});

And(/^I type new password$/, () => {
    UserPage.typeNewPassword()
});

And(/^I confirm new password$/, () => {
    UserPage.typeNewConfirmPassword()
});

And(/^I unblock user$/, () => {
    UserPage.clickUnblock()
});

And(/^I logout$/, () => {
    cy.logout()
});

When(/^I login as new user$/, () => {
    cy.webLogin('new' + creds.email, 'new' + creds.password);
});

When(/^I login as user$/, () => {
    cy.webLogin(creds.email, 'new' + creds.password);
});

And(/^I login with created user$/, () => {
    cy.webLogin(creds.email, creds.password)
});

Then(/^Your account is blocked is shown$/, () => {
    LoginBlockedUserPage.expect().toShowAccountIsBlocked()
});

Then(/^I successfully login$/, () => {
    LoginPage.expect().toLoginSuccessfully()
});

And(/^User credentials are as edited$/, () => {
    EditedCredentialsPage.expect().toHaveCredentialsAsEdited()
});

And(/^I remove the user$/, () => {
    cy.webLogin(creds.login, creds.pass);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    UserPage.removeUser(creds)
});

And(/^I click 3-dot menu$/, () => {
    UserPage.Click3DotMenu()
});

And(/^I select change password$/, () => {
    UserPage.SelectChangePassword()
});

And(/^I close the window$/, () => {
    UserPage.clickCLose()
});

And(/^Select unblock user$/, () => {
    UserPage.SelectUnblockUser()
});

And(/^Select remove user$/, () => {
    UserPage.SelectRemoveUser()
});

And(/^I click Delete$/, () => {
    UserPage.ClickDelete()
});

Then(/^User should not exist$/, () => {
    RemoveUserPage.expect().notToFindEmail()
});
