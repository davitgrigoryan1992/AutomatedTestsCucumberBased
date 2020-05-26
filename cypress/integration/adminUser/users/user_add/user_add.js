import {Given, Then, When, And} from 'cypress-cucumber-preprocessor/steps';
import UserPage from '../../../../pages/users/user_page'
import {
    AddUserResultPage, AddUserProfilePage, AddUsersPage, RemoveUserPage,
    LoginBlockedUserPage, AddUserErrorPage, AddUserShortEmail, AddUserInvalidEmail, LoginPage
}
    from "../../../../pages/users/user_result_page";
import {getCredentials} from '../../../../support/commands';

cy.faker = require('faker');
global.creds = getCredentials();


Given(/^I'm logged in Users page$/, () => {
    UserPage.visit()
});

And(/^I click New User$/, () => {
    UserPage.clickNewUSer()
});

And(/^I fill in first name$/, () => {
    UserPage.typeFirstName()
});

And(/^I fill in last name$/, () => {
    UserPage.typelastName()
});

And(/^I fill in email address$/, () => {
    UserPage.typeEmail()
});

And(/^I fill in password$/, () => {
    UserPage.typePassword()
});

And(/^I confirm password$/, () => {
    UserPage.typeConfirmPassword()
});

And(/^I click Add$/, () => {
    UserPage.clickAdd()
});

And(/^I search the email$/, () => {
    UserPage.searchEmail()
});

And(/^I have matching result$/, () => {
    AddUserResultPage.expect().toHaveMatchingResult()
});

And(/^I click on user$/, () => {
    UserPage.clickUser()
});

And(/^Window contains user's credentials$/, () => {
    AddUserProfilePage.expect().toHaveUsersCredentials()
});

When(/^I close the window$/, () => {
    UserPage.clickCLose()
});

Then(/^I navigate to Users page$/, () => {
    AddUsersPage.expect().toNavigateToUsersPage()
});

And(/^I click Remove User$/, () => {
    UserPage.clickRemove()
});

And(/^I confirm Remove User$/, () => {
    UserPage.confirmRemove()
});

When(/^I search the email$/, () => {
    UserPage.searchEmail()
});

Then(/^User by the email is not found$/, () => {
    RemoveUserPage.expect().notToFindEmail()
});

And(/^I create new user$/, () => {
    UserPage.createUser(creds)
});

And(/^I logout$/, () => {
    cy.logout()
});

And(/^I login as user$/, () => {
    cy.webLogin(creds.email, creds.password)
});

Then(/^Your account is blocked is shown$/, () => {
    LoginBlockedUserPage.expect().toShowAccountIsBlocked()
});

And(/^I remove the user$/, () => {
    cy.clearLocalStorage();
    cy.webLogin(creds.login, creds.pass);
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
    UserPage.removeUser(creds);
});

And(/^Error messages are shown$/, () => {
    AddUserErrorPage.expect().ErrorMessagesToBeShown()
});

And(/^I fill in short email address$/, () => {
    UserPage.typeShortEmail()
});

And(/^I fill in invalid password$/, () => {
    UserPage.typeInvalidPassword()
});

And(/^I get error messages$/, () => {
    AddUserShortEmail.expect().toShowErrorMessages()
});

And(/^I fill in invalid email address$/, () => {
    UserPage.typeInvalidEmail()
});

When(/^I click Add$/, () => {
    UserPage.clickAdd()
});

Then(/^I get error message$/, () => {
    AddUserInvalidEmail.expect().toShowErrorMessage()
});
And(/^I abort the window$/, () => {
    UserPage.clickAbort()
});

And(/^I unblock user$/, () => {
    UserPage.clickUnblock()
});
And(/^I click Edit$/, () => {
    UserPage.clickEdit()
});

And(/^I click Save$/, () => {
    UserPage.clickSave()
});

Then(/^I successfully login$/, () => {
    LoginPage.expect().toLoginSuccessfully()
});

When(/^I click Add$/, () => {
    UserPage.clickAdd()
});
