import { getCredentials, getCompanyInfo } from '../../support/commands';

cy.faker = require('faker');

global.creds = getCredentials();
global.info = getCompanyInfo();
global.info2 = getCompanyInfo();

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

  it('Check that all headers are present', () => {
    cy.get('.page.undefined .container div .header').first()
      .should('contain', 'Main settings');
    cy.get('.page.undefined .container div[class*=grid]').first()
      .find('div:nth-child(1)').should('contain', 'Company Information')
      .should('contain', 'Name')
      .should('contain', 'VAT')
      .should('contain', 'Address')
      .should('contain', 'Bank');
    cy.get('.page.undefined .container div[class*=grid]').first()
      .find('div:nth-child(2)').should('contain', 'Configuration')
      .should('contain', 'Mail sending')
      .should('contain', 'Email templates');
    cy.get('[style*="margin-bottom"]').should('contain', 'External Storages');
    cy.get('.page.undefined .container div .header').last()
      .should('contain', 'Preferences');
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(1)').should('contain', 'Categories');
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(2)').should('contain', 'Payments');
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(3)').should('contain', 'Currencies');
    cy.get('.page.undefined .container div[class*=grid]').last()
      .find('div:nth-child(4)').should('contain', 'VAT');
  });

  it.skip('Check error messages', () => {
    // todo test need to be unkipped after fix RSA-388
    // should show error message when the fields are empty
    cy.get('.column').contains('Company Information')
      .parent().find('div')
      .contains('Edit')
      .as('edit')
      .click();
    cy.get('.scrolling.modal').should('contain', 'Company Information');
    cy.get('[name=name]').clear();
    cy.get('[name=vat_id]').clear();
    cy.get('[name="datev_consultant_number"]').clear();
    cy.get('[name="datev_client_number"]').clear();
    cy.get('[name="datev_account_digits"]').clear();
    cy.get('[name="datev_repository_path"]').clear();
    cy.get('[name="invoice_prefix"]').clear();
    cy.get('.item').contains('Bank').click();
    cy.get('[name="bank_name"]').clear();
    cy.get('[name="bank_iban"]').clear();
    cy.get('[name="bank_swift"]').clear();
    cy.get('.item').contains('Address').click();
    cy.get('[name="address_city"]').clear();
    cy.get('[name="address_zip"]').clear();
    cy.get('[name="address_street"]').clear();
    cy.get('.ui.small.positive.button').contains('Save').click();
    cy.get('.field').contains('Name').parent()
      .siblings('ul')
      .first()
      .should('contain', 'This field is required');
    cy.get('.field').contains('Name').parent()
      .siblings('ul')
      .last()
      .should('contain', 'This field is required');
    cy.get('.field').contains('Consultant number').parent()
      .siblings('ul')
      .should('contain', 'This field is required')
      .closest('ul')
      .should('contain', 'This field is required')
      .closest('ul')
      .should('contain', 'This field is required')
      .closest('ul')
      .should('contain', 'This field is required');
    cy.get('.remove.link.icon').click();
  });

  it('Edit Company Information', () => {
    // should save changes after "save"
    cy.get('.column').contains('Company Information')
      .parent().find('div')
      .contains('Edit')
      .as('edit')
      .click();
    cy.get('.scrolling.modal').should('contain', 'Company Information');
    cy.get('[name=name]').clear().type(info.name);
    cy.get('[name=vat_id]').clear().type(info.vat);
    // cy.get('[name="datev.framework"]').click();
    // cy.get(`.visible.menu.transition div:nth-child(${info.accountingFramework})`).click();
    cy.get('[name="datev_consultant_number"]').clear()
      .type(info.consultantNumber);
    cy.get('[name="datev_client_number"]').clear()
      .type(info.clientNumber);
    cy.get('[name="datev_account_digits"]').clear()
      .type(info.accountDigits);
    cy.get('[name="datev_repository_path"]').clear()
      .type(info.repositoryPath);
    cy.get('[name="invoice_prefix"]').clear()
      .type(info.invoicePrefix);
    cy.get('[name="address_country"]').click();
    cy.get(`.visible.menu.transition div:nth-child(${info.country})`).click();
    cy.get('[name="address_city"]').clear()
      .type(info.city);
    cy.get('[name="address_zip"]').clear()
      .type(info.zipCode);
    cy.get('[name="address_street"]').clear()
      .type(info.street);
    cy.get('.item').contains('Bank').click();
    cy.get('[name="bank_name"]').clear()
      .type(info.bankName);
    cy.get('[name="bank_country"]').click();
    cy.get(`.visible.menu.transition div:nth-child(${info.country})`).click();
    cy.get('[name="bank_iban"]').clear().type(info.iban);
    cy.get('[name="bank_swift"]').clear().type(info.swift);
    cy.get('.ui.small.positive.button').contains('Save').click();
    cy.get('table tbody tr').contains('Name')
      .siblings('td').should('contain', info.name);
    cy.get('table tbody tr').contains('VAT')
      .siblings('td').should('contain', info.vat);
    cy.get('table tbody tr').contains('Address')
      .siblings('td').should('contain', `${info.city},` + ` ${info.street}`);
    cy.get('table tbody tr').contains('Bank')
      .siblings('td').should('contain', info.bankName);
    cy.get('@edit').click();
    cy.reload();
    cy.get('@edit').click();
    cy.get('.scrolling.modal').should('contain', 'Company Information');
    cy.get('[name="datev_consultant_number"]')
      .should('have.value', `${info.consultantNumber}`);
    cy.get('[name="datev_client_number"]')
      .should('have.value', `${info.clientNumber}`);
    cy.get('[name="datev_account_digits"]')
      .should('have.value', `${info.accountDigits}`);
    cy.get('[name="datev_repository_path"]')
      .should('have.value', `${info.repositoryPath}`);
    cy.get('[name="invoice_prefix"]')
      .should('have.value', `${info.invoicePrefix}`);
    cy.get('[name="address_country"]')
      .should('contain', 'Austria');
    cy.get('[name="address_zip"]')
      .should('have.value', `${info.zipCode}`);
    cy.get('.item').contains('Bank').click();
    cy.get('[name="bank_country"]')
      .should('contain', 'Austria');
    cy.get('[name="bank_iban"]')
      .should('have.value', `${info.iban}`);
    cy.get('[name="bank_swift"]')
      .should('have.value', `${info.swift}`);
    cy.get('.remove.link.icon').click();

    // should not save changes after 'close'
    cy.get('@edit').click();
    cy.get('.scrolling.modal').should('contain', 'Company Information');
    cy.get('[name=name]').clear().type(info2.name);
    cy.get('[name=vat_id]').clear().type(info2.vat);
    // cy.get('[name="datev.framework"]').click();
    // cy.get(`.visible.menu.transition div:nth-child(${info.accountingFramework})`).click();
    cy.get('[name="datev_consultant_number"]').clear()
      .type(info2.consultantNumber);
    cy.get('[name="datev_client_number"]').clear()
      .type(info2.clientNumber);
    cy.get('[name="datev_account_digits"]').clear()
      .type(info2.accountDigits);
    cy.get('[name="datev_repository_path"]').clear()
      .type(info2.repositoryPath);
    cy.get('[name="invoice_prefix"]').clear()
      .type(info2.invoicePrefix);
    cy.get('[name="address_country"]').click();
    cy.get(`.visible.menu.transition div:nth-child(${info2.country})`).click();
    cy.get('[name="address_city"]').clear()
      .type(info2.city);
    cy.get('[name="address_zip"]').clear()
      .type(info2.zipCode);
    cy.get('[name="address_street"]').clear()
      .type(info2.street);
    cy.get('.item').contains('Bank').click();
    cy.get('[name="bank_name"]').clear()
      .type(info2.bankName);
    cy.get('[name="bank_country"]').click();
    cy.get(`.visible.menu.transition div:nth-child(${info2.country})`).click();
    cy.get('[name="bank_iban"]').clear().type(info2.iban);
    cy.get('[name="bank_swift"]').clear().type(info2.swift);
    cy.get('.ui.small.basic.button').contains('Close').click();
    cy.get('table tbody tr').contains('Name')
      .siblings('td').should('contain', info.name)
      .and('not.contain', info2.name);
    cy.get('table tbody tr').contains('VAT')
      .siblings('td').should('contain', info.vat)
      .and('not.contain', info2.vat);
    cy.get('table tbody tr').contains('Address')
      .siblings('td').should('contain', `${info.city},` + ` ${info.street}`)
      .and('not.contain', `${info2.city},` + ` ${info2.street}`);
    cy.get('table tbody tr').contains('Bank')
      .siblings('td').should('contain', info.bankName)
      .and('not.contain', info2.bankName);
    cy.get('@edit').click();
    cy.reload();
    cy.get('@edit').click();
    cy.get('.scrolling.modal').should('contain', 'Company Information');
    cy.get('[name="datev_consultant_number"]')
      .should('have.value', `${info.consultantNumber}`)
      .and('not.have.value', `${info2.consultantNumber}`);
    cy.get('[name="datev_client_number"]')
      .should('have.value', `${info.clientNumber}`)
      .and('not.have.value', `${info2.clientNumber}`);
    cy.get('[name="datev_account_digits"]')
      .should('have.value', `${info.accountDigits}`)
      .and('not.have.value', `${info2.accountDigits}`);
    cy.get('[name="datev_repository_path"]')
      .should('have.value', `${info.repositoryPath}`)
      .and('not.have.value', `${info2.repositoryPath}`);
    cy.get('[name="invoice_prefix"]')
      .should('have.value', `${info.invoicePrefix}`)
      .and('not.have.value', `${info2.invoicePrefix}`);
    cy.get('[name="address_country"]')
      .should('contain', 'Austria');
    cy.get('[name="address_zip"]')
      .should('have.value', `${info.zipCode}`)
      .and('not.have.value', `${info2.zipCode}`);
    cy.get('.item').contains('Bank').click();
    cy.get('[name="bank_country"]')
      .should('contain', 'Austria');
    cy.get('[name="bank_iban"]')
      .should('have.value', `${info.iban}`)
      .and('not.have.value', `${info2.iban}`);
    cy.get('[name="bank_swift"]')
      .should('have.value', `${info.swift}`)
      .and('not.have.value', `${info2.swift}`);
  });
});
