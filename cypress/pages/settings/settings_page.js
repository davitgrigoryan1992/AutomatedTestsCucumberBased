import {getCompanyInfo, getCredentials, getMailInfo, getPreferencesinfo} from '../../support/commands';
import faker from "faker";
import 'cypress-file-upload';


cy.faker = require('faker');
global.creds = getCredentials();
global.info = getCompanyInfo();
global.info2 = getCompanyInfo();
global.stat = getMailInfo();
global.pref = getPreferencesinfo();
const amount = faker.random.number({min: 20, max: 80});


const company_name = '[name=name]';
const vat_id = '[name=vat_id]';
const consultant_number = '[name="datev_consultant_number"]';
const client_number = '[name="datev_client_number"]';
const account_digits = '[name="datev_account_digits"]';
const repo_path = '[name="datev_repository_path"]';
const invoice_prefix = '[name="invoice_prefix"]';
const bank_name = '[name="bank_name"]';
const bank_iban = '[name="bank_iban"]';
const bank_swift = '[name="bank_swift"]';
const address_city = '[name="address_city"]';
const address_zip = '[name="address_zip"]';
const address_street = '[name="address_street"]';
const save_button = '.ui.small.positive.button';
const X_close = '.remove.link.icon';
const close_button = '.ui.small.basic.button';
const address_country = '[name="address_country"]';
const bank_country = '[name="bank_country"]';
const edit_mail_sending = '[data-test-id="edit-sending"]';
const send_from_field = '[name="smtp.from"]';
const host_name_field = '[name="smtp.host"]';
const server_port_field = '[name="smtp.port"]';
const user_email_field = '[name="smtp.user"]';
const user_password_field = '[name="smtp.password"]';
const edit_email_template = '[data-test-id="edit-template"]';
const button_close = '[ data-test-id="button-close"]';
const button_save = '[ data-test-id="button-save"]';
const name_field = '[name=name]';
const account_field = '[name="datev_account"]';
const currency_name = '[name=id]';
const vat_percentage = '[name=percentage]';
const vat_datev_id = '[name=datev_id]';
const new_receipt_button = '[data-test-id=button-new-invoice]';
const invoice_amount_field = "[name='amount']";
const invoice_description_field = "[name='description']";
const add_button = "[data-test-id='button-add']";


class SettingsPage {
    static visit() {
        cy.clearLocalStorage();
        cy.visit('/');
        cy.webLogin(creds.login, creds.pass);
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'login');
        cy.visit('/settings');
        cy.url().should('contain', 'settings');
        cy.url().should('not.contain', 'invoices');
    }

    static visitSettingsPage() {
        cy.visit('/settings');
        cy.url().should('contain', 'settings');
        cy.url().should('not.contain', 'invoices');

    }

    static clickEdit() {
        cy.get('.column').contains('Company Information')
            .parent().find('div')
            .contains('Edit')
            .as('edit')
            .click();
        cy.reload();
        cy.get('@edit').click();
    }

    static clearCompanyInfoFields() {
        cy.get(company_name).clear();
        cy.get(vat_id).clear();
        cy.get(consultant_number).clear();
        cy.get(client_number).clear();
        cy.get(account_digits).clear();
        cy.get(repo_path).clear();
        cy.get(invoice_prefix).clear();
        cy.get('.item').contains('Bank').click();
        cy.get(bank_name).clear();
        cy.get(bank_iban).clear();
        cy.get(bank_swift).clear();
        cy.get('.item').contains('Address').click();
        cy.get(address_city).clear();
        cy.get(address_zip).clear();
        cy.get(address_street).clear();
    }

    static clickSaveButton() {
        cy.get(save_button).click();
    }

    static clickXToClose() {
        cy.get(X_close).click();
    }

    static EditCompanyInfoFieldsInfo(info) {
        cy.get(name_field).clear().type(info.name);
        cy.get(vat_id).clear().type(info.vat);
        cy.get(consultant_number).clear()
            .type(info.consultantNumber);
        cy.get(client_number).clear()
            .type(info.clientNumber);
        cy.get(account_digits).clear()
            .type(info.accountDigits);
        cy.get(repo_path).clear()
            .type(info.repositoryPath);
        cy.get(invoice_prefix).clear()
            .type(info.invoicePrefix);
        cy.get(address_country).click();
        cy.get(`.visible.menu.transition div:nth-child(${info.country})`).click();
        cy.get(address_city).clear()
            .type(info.city);
        cy.get(address_zip).clear()
            .type(info.zipCode);
        cy.get(address_street).clear()
            .type(info.street);
        cy.get('.item').contains('Bank').click();
        cy.get(bank_name).clear()
            .type(info.bankName);
        cy.get(bank_country).click();
        cy.get(`.visible.menu.transition div:nth-child(${info.country})`).click();
        cy.get(bank_iban).clear().type(info.iban);
        cy.get(bank_swift).clear().type(info.swift);
    }

    static clickClose() {
        cy.get(close_button).click()
    }

    static clickEditMailSending() {
        cy.get(edit_mail_sending).click()
    }

    static editMailSendingFields() {
        cy.get(send_from_field).clear().type(stat.email);
        cy.get(host_name_field).clear().type(stat.smtpHost);
        cy.get(server_port_field).clear().type(stat.smtpPort);
        cy.get(user_email_field).clear().type(stat.userEmail);
        cy.get(user_password_field).clear().type(stat.password);

    }

    static clickEditEmailTemplate() {
        cy.get(edit_email_template).contains('Edit').click()
    }

    static clickAllPlaceholders() {
        cy.get('.button').contains('QR code').click();
        cy.get('.button').contains('Password Reset Link').click();
        cy.get('.button').contains('Login Link').click();
        cy.get('.button').contains('QR code').click();
        cy.get('.button').contains('First Name').click();
        cy.get('.button').contains('Last Name').click();
    }

    static clickCloseButton() {
        cy.get(button_close).contains('Close').click();
    }

    static clickSave() {
        cy.get(button_save).contains('Save').click();
    }

    static clickAddPreference(name) {
        cy.get('.Pair-left').contains(name).parent().siblings('div')
            .click();
    }


    static fillInFieldsCategory() {
        cy.get(name_field).clear().type(pref.categoryName);
        cy.get(account_field).type(pref.categoryAccount);
    }

    static fillInFieldsPayment() {
        cy.get(name_field).clear().type(pref.paymentName);
        cy.get(account_field).type(pref.paymentAccount);
    }

    static attachIcon() {
        cy.uploadAnyFile('icon.png', 'base64',
            'input[type=file]', 'image/png', 'input');
    }

    static fillInFieldCurrency() {
        cy.get(currency_name).click().type('CZK');
    }

    static fillInFieldsVat() {
        cy.get(name_field).clear().type(pref.vatName);
        cy.get(vat_percentage).clear().type(pref.vatPercentage);
        cy.get(vat_datev_id).clear().type(pref.vatID);

    }

    static navigateInvoicesPage() {
        cy.visit('/invoices');
        cy.url().should('contain', 'invoices');
        cy.url().should('not.contain', 'settings');
        cy.url().should('contain', 'invoices');
        cy.get('table .datagrid-body').should('exist');
        cy.get("[data-test-id='input-field-search'] input").click({force: true});
    }

    static clickNewReceipt() {
        cy.get(new_receipt_button)
            .should('contain', 'New receipt').should('be.visible').click();
    }

    static createInvoice() {
        cy.uploadAnyFile('invoice.jpg', 'base64',
            '[class*="dropzone"] input', 'image/jpg', 'input');
        cy.get(invoice_amount_field).clear().type(amount);
        cy.get('[name=currency]').click();
        cy.get('[name=currency] .menu div').contains('CZK').click();
        cy.get("[name='purchase_category'] input").click();
        cy.get('[name="purchase_category"] .menu div').contains(`${pref.categoryName}`).click();
        cy.wait(2000);
        cy.get('[name=vat] .button').contains(`${pref.vatName}`).click();
        cy.get('[name=payment_method] .button').contains(`${pref.paymentName}`).click();
        cy.get(invoice_description_field).type(creds.description);
    }

    static clickAdd() {
        cy.get(add_button).click()
    }

    static removeCategory() {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(1)').contains(pref.categoryName)
            .parentsUntil('tr').siblings('[class=collapsing]').click()
            .find('.trash.icon').should('be.visible').click();
        cy.get('.active .header').should('contain', 'Remove category');
        cy.get('.content .name').should('contain', pref.categoryName);
        cy.get('.ui.red.small.button').contains('Delete').click();
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(1)').should('not.contain', pref.categoryName);
    }

    static removePaymentMethod() {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(2)').contains(pref.paymentName)
            .parentsUntil('tr').siblings('[class=collapsing]').click()
            .find('.trash.icon').should('be.visible').click();
        cy.get('.active .header').should('contain', 'Remove method');
        cy.get('.content .name').should('contain', pref.paymentName);
        cy.get('.ui.red.small.button').contains('Delete').click();
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(2)').should('not.contain', pref.paymentName);

    }

    static removeCurrency() {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(3)').contains('CZK')
            .parentsUntil('tr').siblings('[class=collapsing]').click()
            .find('.trash.icon').should('be.visible').click({force: true});
        cy.get('.active .header').should('contain', 'Exclude currency');
        cy.get('.content .name').should('contain', 'Czech Republic Koruna');
        cy.get('.ui.red.small.button').contains('Delete').click();
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(3)').should('not.contain', 'CZK');
    }

    static removeVAT() {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(4)').contains(pref.vatName)
            .parentsUntil('tr').siblings('[class=collapsing]').click()
            .find('.trash.icon').should('be.visible').click();
        cy.get('.active .header').should('contain', 'Remove VAT');
        cy.get('.content .name').should('contain', pref.vatName);
        cy.get('.ui.red.small.button').contains('Delete').click();
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(4)').should('not.contain', pref.vatName);
    }

    static click3dotMenu(number, string) {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find(`div:nth-child(${number})`).contains(string)
            .parentsUntil('tr').siblings('[class=collapsing]').click()
            .window();
    }

    static clickRemovePreference(number, string) {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find(`div:nth-child(${number})`).contains(string)
            .parentsUntil('tr').siblings('[class=collapsing]').find('.trash.icon').should('be.visible').click();
    }

    static clickNewCategory () {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(1) table tbody tr').contains(pref.categoryName)
            .click();
        cy.get('.active .header').should('contain', 'Edit category');
    }

    static fillInCategoryFields(){
        cy.get(name_field).should('have.value', `${pref.categoryName}`)
            .clear().type(`new${pref.categoryName}`);
        cy.get(account_field).should('have.value', `${pref.categoryAccount}`)
            .clear().type(`new${pref.categoryAccount}`);
    }

    static fillInPaymentFields(){
        cy.get(name_field).should('have.value',`${pref.paymentName}`)
            .clear().type(`new${pref.paymentName}`);
        cy.get(account_field).should('have.value', `${pref.paymentAccount}`)
            .clear().type(`new${pref.paymentAccount}`);
    }

    static fillInVatFields(){
        cy.get(name_field).should('have.value', `${pref.vatName}`)
            .clear().type(`new${pref.vatName}`);
        cy.get(vat_percentage).should('have.value', `${pref.vatPercentage},00`)
            .clear().type(`1${pref.vatPercentage}`);
        cy.get(vat_percentage).should('have.value',  `${pref.vatID}`)
            .clear().type(`new${pref.vatID}`);
    }



    static clickNewPreference(number) {
        cy.get('.page.undefined .container div[class*=grid]').last()
            .find('div:nth-child(1) table tbody tr').contains(pref.categoryName)
            .click();
    }


}

export default SettingsPage;