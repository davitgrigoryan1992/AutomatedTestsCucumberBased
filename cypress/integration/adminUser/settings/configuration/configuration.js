import {Given, Then, When, And} from 'cypress-cucumber-preprocessor/steps';
import SettingsPage from '../../../../pages/settings/settings_page';
import {
    MailSendingWindow,
    MailSendingNotEdited,
    EmailTemplateNotEdited,
    EmailTemplateEdited,
    MailSendingEdited,
    EmailTemplateTabs

} from '../../../../pages/settings/settings_result_page';
import {getCompanyInfo, getCredentials} from '../../../../support/commands';

cy.faker = require('faker');
global.creds = getCredentials();
global.info = getCompanyInfo();
global.info2 = getCompanyInfo();

Given(/^I'm logged in Settings page$/, () => {
    SettingsPage.visit()
});

When(/^I click edit mail sending$/, () => {
    cy.reload();
    SettingsPage.clickEditMailSending()
});

And(/^Mail Sending Window is opened$/, () => {
    MailSendingWindow.expect().toOpenMailSendingWindow()
});

And(/^I edit all Mail Sending fields$/, () => {
    SettingsPage.editMailSendingFields()
});

Then(/^Mail Sending fields are not as edited$/, () => {
    MailSendingNotEdited.expect().notToEditMailSending()
});

And(/^I click Close button$/, () => {
    SettingsPage.clickClose()
});

And(/^I click Save button$/, () => {
    SettingsPage.clickSaveButton()
});

Then(/^Mail Sending fields are as edited$/, () => {
    MailSendingEdited.expect().toEditMailSending()
});

Given(/^I click edit email template$/, () => {
    SettingsPage.clickEditEmailTemplate()
});

And(/^I click on all placeholders$/, () => {
    SettingsPage.clickAllPlaceholders()
});

And(/^I click Close$/, () => {
    SettingsPage.clickCloseButton()
});

When(/^I click edit email template$/, () => {
    cy.reload();
    SettingsPage.clickEditEmailTemplate()
});

Then(/^Placeholders are not saved$/, () => {
    EmailTemplateNotEdited.expect().notToEditEmailTemplate()
});

And(/^I click Save$/, () => {
    SettingsPage.clickSave()
});

Then(/^Placeholders are saved$/, () => {
    EmailTemplateEdited.expect().toEditEmailTemplate()
});

And(/^Assert that all tabs are present$/, () => {
    EmailTemplateTabs.expect().toShowAllTabs()
});
