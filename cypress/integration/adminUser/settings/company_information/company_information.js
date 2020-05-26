import {Given, Then, When, And} from 'cypress-cucumber-preprocessor/steps';
import SettingsPage from '../../../../pages/settings/settings_page';
import {
    companyInfo,
    errorMessages,
    SettingsHeaders,
    companyInfoTable,
    companyInfoEdited,
    companyInfo2Table,
    companyInfo2Edited
} from '../../../../pages/settings/settings_result_page';
import {getCompanyInfo, getCredentials} from '../../../../support/commands';

cy.faker = require('faker');
global.creds = getCredentials();
global.info = getCompanyInfo();
global.info2 = getCompanyInfo();

Given(/^I'm logged in Settings page$/, () => {
    SettingsPage.visit()
});

When(/^I visit Settings page$/, () => {
    SettingsPage.visitSettingsPage()
});

Then(/^All headers are present$/, () => {
    SettingsHeaders.expect().toHaveAllHeaders()
});

And(/^I click edit company information$/, () => {
    SettingsPage.clickEdit()
});

When(/^I click edit company information$/, () => {
    SettingsPage.clickEdit()
});

And(/^Window contains Company information$/, () => {
    companyInfo.expect().toContainCompanyInfo()
});

And(/^I clear all fields$/, () => {
    SettingsPage.clearCompanyInfoFields()
});

And(/^I click Save button$/, () => {
    SettingsPage.clickSaveButton()
});

When(/^I click Save button$/, () => {
    SettingsPage.clickSaveButton()
});

Then(/^Error messages are shown$/, () => {
    errorMessages.expect().toGetErrorMessages()
});

And(/^I click X to close$/, () => {
    SettingsPage.clickXToClose()
});

And(/^I edit all fields with info$/, () => {
    SettingsPage.EditCompanyInfoFieldsInfo(info)
});

And(/^I edit all fields with info2$/, () => {
    SettingsPage.EditCompanyInfoFieldsInfo(info2)
});

And(/^Table contains information as edited info$/, () => {
    companyInfoTable.expect().toContainCompanyInfoAsEdited()
});

And(/^All fields are as edited info$/, () => {
    companyInfoEdited.expect().toContainCompanyInfoChanges()
});

And(/^I click Close button$/, () => {
    SettingsPage.clickClose()
});

And(/^Table contains information as edited info and not info2$/, () => {
    companyInfo2Table.expect().notToContainCompanyInfo2()
});

Then(/^All fields are as edited info and not as info2$/, () => {
    companyInfo2Edited.expect().notToContainCompanyInfo2Changes()
});
