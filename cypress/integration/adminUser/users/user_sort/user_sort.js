import {Given, Then, When, And, Before, After} from 'cypress-cucumber-preprocessor/steps';
import UserPage from '../../../../pages/users/user_page'
import {
    SortByEmailsAsc, SortByNumberAsc, SortByNumberDesc,
    SortByEmailsDesc, AddUserResultPage
}
    from "../../../../pages/users/user_result_page";
import {getCredentials} from '../../../../support/commands';

cy.faker = require('faker');
global.creds = getCredentials();
global.creds2 = getCredentials();
global.creds3 = getCredentials();
global.creds4 = getCredentials();
global.creds5 = getCredentials();

// Delete all users
After(() => {
    cy.deleteUser(creds);
    cy.deleteUser(creds2);
    cy.deleteUser(creds3);
    cy.deleteUser(creds4);
    cy.deleteUser(creds5);
});

Given(/^I'm logged in Users page$/, () => {
    UserPage.visit()
});

And(/^I create 5 new users$/, () => {
    cy.createNewUser(creds);
    cy.createNewUser(creds2);
    cy.createNewUser(creds3);
    cy.createNewUser(creds4);
    cy.createNewUser(creds5);
});

And(/^I click Sort by number$/, () => {
    UserPage.ClickSortByNumber();
});

And(/^Numbers are sorted by ascending order$/, () => {
    SortByNumberAsc.expect().toSortNumbersByAsc()
});

And(/^Numbers are sorted by descending order$/, () => {
    SortByNumberDesc.expect().toSortNumbersByDesc()
});

And(/^I edit user emails$/, () => {
    cy.server();
    cy.route('GET', '**/user?page=1**').as('userPage');
    cy.updateUserEmail(creds.email, "AA" + creds.email);
    cy.updateUserEmail(creds2.email, "Bz" + creds2.email);
    cy.updateUserEmail(creds3.email, "Af" + creds3.email);
    cy.updateUserEmail(creds4.email, "Aa" + creds4.email);
    cy.updateUserEmail(creds5.email, "Ba" + creds5.email);
});

And(/^Emails are sorted by ascending order$/, () => {
    SortByEmailsAsc.expect().toSortEmailsByAsc()
});

When(/^I click Sort by email$/, () => {
    UserPage.ClickSortByEmail();
});

Then(/^Emails are sorted by descending order$/, () => {
    SortByEmailsDesc.expect().toSortEmailsByDesc()
});

And(/^I have matching result$/, () => {
    AddUserResultPage.expect().toHaveMatchingResult()
});

When(/^I search user by email$/, () => {
    UserPage.searchEmail()
});

And(/^I search user by first name$/, () => {
    UserPage.searchFirstName()
});

And(/^I search user by last name$/, () => {
    UserPage.searchLastName()
});

Then(/^I have matching result$/, () => {
    AddUserResultPage.expect().toHaveMatchingResult()
});

And(/^I create new user$/, () => {
    UserPage.createUser(creds)
});
