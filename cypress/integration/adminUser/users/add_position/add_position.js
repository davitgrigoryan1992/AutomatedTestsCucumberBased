import {Given, Then, When, And} from 'cypress-cucumber-preprocessor/steps';
import UserPage from '../../../../pages/users/user_page'
import {getCredentials} from '../../../../support/commands';
import {
    AddPositionError,
    PositionDoesNotExist,
    PositionExists,
    UserHasNewPosition,
    PositionIsNotEdited,
    PositionIsEdited,
    RemovePositionWindow,
    NewPositionExists,
    NewPositionDoesNotExist,

}
    from "../../../../pages/users/user_result_page";

cy.faker = require('faker');
global.creds = getCredentials();


Given(/^I'm logged in Users page$/, () => {
    UserPage.visit()
});

And(/^I create new user$/, () => {
    cy.createNewUser(creds);
});

And(/^I click add position$/, () => {
    UserPage.ClickAddPosition()
});

When(/^I click save position$/, () => {
    UserPage.ClickSavePosition()
});

And(/^I type position name$/, () => {
    UserPage.TypePositionname(positionName)
});

And(/^I type new position name$/, () => {
    UserPage.TypePositionname(positionName1)
});

And(/^I click close position$/, () => {
    UserPage.ClickClosePosition()
});

When(/^I click close position$/, () => {
    UserPage.ClickClosePosition()
});

And(/^I get error message$/, () => {
    AddPositionError.expect().toGetError()
});

And(/^New position does not exist$/, () => {
    PositionDoesNotExist.expect().notToShowNewPosition()
});

And(/^I search the email$/, () => {
    UserPage.searchEmail()
});

And(/^I click on user$/, () => {
    UserPage.clickUser()
});

And(/^I click Edit$/, () => {
    UserPage.clickEdit()
});

And(/^I change position$/, () => {
    UserPage.ChangePosition()
});

And(/^I click Save$/, () => {
    UserPage.clickSave()
});

When(/^I search the email$/, () => {
    UserPage.searchEmail()
});

Then(/^User has new position$/, () => {
    UserHasNewPosition.expect().toHaveNewPosition()
});

And(/^I click on position$/, () => {
    UserPage.ClickOnPosition()
});

And(/^I edit position name$/, () => {
    UserPage.TypeNewPositionName()
});

And(/^I uncheck all categories$/, () => {
    UserPage.UncheckAllCategories()
});

And(/^I edit payment accounts$/, () => {
    UserPage.EditPaymentAccounts()
});

Then(/^Position is not edited$/, () => {
    PositionIsNotEdited.expect().notToSaveEdition()
});

Then(/^Position is edited$/, () => {
    PositionIsEdited.expect().toSaveEdition()
});

And(/^I click on position 3-dot menu$/, () => {
    UserPage.ClickPosition3DotMenu(positionName)
});

And(/^I click position 3-dot menu$/, () => {
    UserPage.ClickPosition3DotMenu(positionName1)
});

And(/^I click remove position$/, () => {
    UserPage.ClickRemovePosition()
});

And(/^I click abort$/, () => {
    UserPage.ClickAbortRemove()
});

And(/^Window contains the position name$/, () => {
    RemovePositionWindow.expect().toContainPositionName()
});

Then(/^Position exists$/, () => {
    PositionExists.expect().ToShowPosition()
});
And(/^Position exists$/, () => {
    PositionExists.expect().ToShowPosition()
});

And(/^New position exists/, () => {
    NewPositionExists.expect().ToShowNewPosition()
});

When(/^I click Delete Position$/, () => {
    UserPage.ClickDeletePosition()
});

Then(/^Position does not exists$/, () => {
    PositionDoesNotExist.expect().notToShowNewPosition()
});

Then(/^New Position does not exist$/, () => {
    NewPositionDoesNotExist.expect().notToShowNewPosition()
});

And(/^I remove position$/, () => {
    UserPage.RemovePosition()
});

And(/^I remove the user$/, () => {
    cy.deleteUser(creds);
});
