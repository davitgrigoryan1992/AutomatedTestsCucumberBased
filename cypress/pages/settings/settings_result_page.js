export const SettingsHeaders = class SettingsHeaders {
    static expect() {
        return {
            toHaveAllHeaders: () => {
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
            }
        }
    }
};

export const  companyInfo = class companyInfo {
    static expect() {
        return {
            toContainCompanyInfo: () => {
                cy.get('.scrolling.modal').should('contain', 'Company Information');

            }
        }
    }
};

export const errorMessages = class errorMessages {
    static expect() {
        return {
            toGetErrorMessages: () => {
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
            }
        }
    }
};

export const  companyInfoTable = class companyInfoTable {
    static expect() {
        return {
            toContainCompanyInfoAsEdited: () => {
                cy.get('table tbody tr').contains('Name')
                    .siblings('td').should('contain', info.name);
                cy.get('table tbody tr').contains('VAT')
                    .siblings('td').should('contain', info.vat);
                cy.get('table tbody tr').contains('Address')
                    .siblings('td').should('contain', `${info.city},` + ` ${info.street}`);
                cy.get('table tbody tr').contains('Bank')
                    .siblings('td').should('contain', info.bankName);
            }
        }
    }
};

export const  companyInfoEdited = class companyInfoEdited {
    static expect() {
        return {
            toContainCompanyInfoChanges: () => {
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
            }
        }
    }
};

export const  companyInfo2Table = class companyInfo2Table {
    static expect() {
        return {
            notToContainCompanyInfo2: () => {
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
            }
        }
    }
};

export const  companyInfo2Edited = class companyInfo2Edited {
    static expect() {
        return {
            notToContainCompanyInfo2Changes: () => {
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
            }
        }
    }
};

export const  MailSendingWindow = class MailSendingWindow {
    static expect() {
        return {
            toOpenMailSendingWindow: () => {
                cy.get('.active .header').should('contain','Mail sending');

            }
        }
    }
};

export const  MailSendingNotEdited = class MailSendingNotEdited {
    static expect() {
        return {
            notToEditMailSending: () => {
                cy.get('[name="smtp.from"]').should('not.have.value',`${stat.email}`);
                cy.get('[name="smtp.host"]').should('not.have.value',`${stat.smtpHost}`);
                cy.get('[name="smtp.port"]').should('not.have.value',`${stat.smtpPort}`);
                cy.get('[name="smtp.user"]').should('not.have.value',`${stat.userEmail}`);
                cy.get('[name="smtp.password"]').should('not.have.value',`${stat.password}`);

            }
        }
    }
};

export const  MailSendingEdited = class MailSendingEdited {
    static expect() {
        return {
            toEditMailSending: () => {
                cy.get('[name="smtp.from"]').should('have.value',`${stat.email}`);
                cy.get('[name="smtp.host"]').should('have.value',`${stat.smtpHost}`);
                cy.get('[name="smtp.port"]').should('have.value',`${stat.smtpPort}`);
                cy.get('[name="smtp.user"]').should('have.value',`${stat.userEmail}`);
                cy.get('[name="smtp.password"]').should('have.value',`${stat.password}`);

            }
        }
    }
};

export const  EmailTemplateNotEdited = class EmailTemplateNotEdited {
    static expect() {
        return {
            notToEditEmailTemplate: () => {
                cy.get('[role=textbox] div').should('contain','${qr}')
                    .should('not.contain','${reset_password_link}')
                    .should('not.contain','${login_link}')
                    .should('not.contain','${first_name}')
                    .should('not.contain','${last_name}');
            }
        }
    }
};

export const  EmailTemplateEdited = class EmailTemplateEdited {
    static expect() {
        return {
            toEditEmailTemplate: () => {
                cy.get('[role=textbox] div').should('contain','${qr}')
                    .should('contain','${reset_password_link}')
                    .should('contain','${login_link}')
                    .should('contain','${first_name}')
                    .should('contain','${last_name}');
            }
        }
    }
};

export const  EmailTemplateTabs = class EmailTemplateTabs {
    static expect() {
        return {
            toShowAllTabs: () => {
                cy.get('.active .header').should('contain', 'Email templates');
                cy.get('.tabular.menu').should('contain', 'New user')
                    .should('contain', 'Reset password')
                    .should('contain', 'Send QR Code');
                cy.get('.field').should('contain', 'Subject');
                cy.get('[class*=placeholdersWrapper]').should('contain', 'QR code')
                    .should('contain', 'Password Reset Link')
                    .should('contain', 'Login Link')
                    .should('contain', 'First Name')
                    .should('contain','Last Name');
            }
        }
    }
};


export const  AddWindow = class AddWindow {
    static expect() {
        return {
            toOpenAddWindow: (name) => {
                cy.get('.active .header').should('contain', name);

            }
        }
    }
};

export const  CategoryTable = class CategoryTable {
    static expect() {
        return {
            toContainNewCategory: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(1)').should('contain', pref.categoryName).as('categoryname');

            }
        }
    }
};

export const  PreferencesTable = class PreferencesTable {
    static expect() {
        return {
            toContainNewPreferences: (number, string) => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find(`div:nth-child(${number})`).should('contain', string).as('categoryname');

            }
        }
    }
};


export const  PaymentsTable = class PaymentsTable {
    static expect() {
        return {
            toContainNewMethod: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(2)').should('contain', pref.paymentName);


            }
        }
    }
};



export const  CurrencyTable = class CurrencyTable {
    static expect() {
        return {
            toContainNewCurrency: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(3)').should('contain', 'CZK');

            }
        }
    }
};


export const  VatTable = class VatTable {
    static expect() {
        return {
            toContainNewVat: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(4)').should('contain', pref.vatName);

            }
        }
    }
};

export const  NewReceiptWindow = class NewReceiptWindow {
    static expect() {
        return {
            toOpenNewReceiptWindow: () => {
                cy.get('.AddReceiptModal')
                    .should('contain', 'New receipt');
            }
        }
    }
};

export const  NewInvoicePreferences = class NewInvoicePreferences {
    static expect() {
        return {
            notToShowRemovedPreferences: () => {
                cy.get('.AddReceiptModal')
                    .should('contain', 'New receipt');
                cy.get('[name="purchase_category"] .menu div').should('not.contain',`${pref.categoryName}`);
                cy.get('[name=vat] .button').should('not.contain',`${pref.vatName}`);
                cy.get('[name=payment_method] .button').should('not.contain',`${pref.paymentName}`);
                cy.get("[data-test-id='button-remove']").should('contain','Abort').click();
            }
        }
    }
};


export const  PaymentMethodTableNotEdited = class PaymentMethodTableNotEdited {
    static expect() {
        return {
            notToContainNewPayment: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(2)').should('not.contain', pref.paymentName);

            }
        }
    }
};

export const  CurrencyTableNotEdited = class CurrencyTableNotEdited {
    static expect() {
        return {
            notToContainNewCurrency: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(3)').should('not.contain', 'CZK');
            }
        }
    }
};

export const  VatTableNotEdited = class VatTableNotEdited {
    static expect() {
        return {
            notToContainNewVat: () => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find('div:nth-child(4)').should('not.contain', pref.vatName);
            }
        }
    }
};

export const  RemovePreferenceWindow = class RemovePreferenceWindow {
    static expect() {
        return {
            toOpenRemovePreferenceWindow: (preference,string) => {
                cy.get('.active .header').should('contain',preference);
                cy.get('.content .name').should('contain', string);
            }
        }
    }
};

export const  PreferencesTableRemove = class PreferencesTableRemove {
    static expect() {
        return {
            toShowPreference: (number,string) => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find(`div:nth-child(${number})`).should('contain', string);
            }
        }
    }
};

export const  PreferencesTableNotEdited = class PreferencesTableNotEdited {
    static expect() {
        return {
            notToContainNewPreferences: (number, newPrefName) => {
                cy.get('.page.undefined .container div[class*=grid]').last()
                    .find(`div:nth-child(${number})`).should('not.contain', newPrefName);

            }
        }
    }
};


