export const AddUserResultPage = class AddUserResultPage {
    static expect() {
        return {
            toHaveMatchingResult: () => {
                cy.get(".current_user")
                    .should('contain', creds.firstName + " " + creds.lastName);
                cy.get(".current_user+div")
                    .should('contain', creds.email)
                    .parents("tr")
                    .find("td:nth-child(3)")
                    .should('not.contain', 'Active');
                cy.get(".current_user+div")
                    .parents("tr")
                    .find("td:nth-child(4)")
                    .should('be.empty');
            }
        }
    }
};

export const AddUserProfilePage = class AddUserProfilePage {
    static expect() {
        return {
            toHaveUsersCredentials: () => {
                cy.get(".UserPage .header")
                    .should('contain', 'User ' + creds.firstName + " " + creds.lastName);
                cy.get("[data-test-id='personal-data-firstName'] label+div")
                    .should('contain', creds.firstName);
                cy.get("[data-test-id='personal-data-lastName'] label+div")
                    .should('contain', creds.lastName);
                cy.get(".PersonalData form > .seal")
                    .should('contain', creds.email);
            }
        }
    }
};

export const AddUsersPage = class AddUsersPage {
    static expect() {
        return {
            toNavigateToUsersPage: () => {
                cy.get("[data-test-id='user-page'] .name")
                    .should('contain', 'Users');
            }
        }
    };
};

export const RemoveUserPage = class RemoveUserPage {
    static expect() {
        return {
            notToFindEmail: () => {
                cy.get('.container.nothing-found').should('contain', 'No results found');
                cy.get("[data-test-id='input-field-search'] input").clear();
            }
        }
    }
};

export const LoginBlockedUserPage = class LoginBlockedUserPage {
    static expect() {
        return {
            toShowAccountIsBlocked: () => {
                cy.get('.noty_body')
                    .should('contain', 'Your account is blocked. Please contact your company.');
            }
        }
    }
};

export const AddUserErrorPage = class AddUserErrorPage {
    static expect() {
        return {
            ErrorMessagesToBeShown: () => {
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(1)").should('contain', 'This field is required');
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(2)").should('contain', 'This field is required');
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(3)").should('contain', 'This field is required');
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(4)").should('contain', 'This field is required');
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(5)").should('contain', 'This field is required');
            }
        }
    }
};

export const AddUserShortEmail = class AddUserShortEmail {
    static expect() {
        return {
            toShowErrorMessages: () => {
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(3)").should('contain', 'Length must be greater than 3');
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(4)").should('contain', 'Does not match requirements');
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(5)").should('contain', 'Passwords don\'t match');
            }
        }
    }
};

export const AddUserInvalidEmail = class AddUserInvalidEmail {
    static expect() {
        return {
            toShowErrorMessage: () => {
                cy.get("[data-test-id='add-user-modal'] ul:nth-of-type(3)").should('contain', 'Invalid email');

            }
        }
    }
};

export const LoginPage = class LoginPage {
    static expect() {
        return {
            toLoginSuccessfully: () => {
                cy.url().should('contain', 'invoices');
                cy.url().should('not.contain', 'login');
            }
        }
    }
};

export const PasswordErrorMessage = class PasswordErrorMessage {
    static expect() {
        return {
            toReceiveErrorMessages: () => {
                cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(1)")
                    .should('contain', 'This field is required');
                cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(2)")
                    .should('contain', 'This field is required');
            }
        }
    }
};

export const InvalidPasswordError = class InvalidPasswordError {
    static expect() {
        return {
            toReceiveErrorMessage: () => {
                cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(1)")
                    .should('contain', 'Does not match requirements');
                cy.get("[data-test-id='change-pass-modal-form'] ul:nth-of-type(2)")
                    .should('contain', 'Passwords don\'t match');
            }
        }
    }
};

export const EditedCredentialsPage = class EditedCredentialsPage {
    static expect() {
        return {
            toHaveCredentialsAsEdited: () => {
                cy.url().should('contain', 'invoices');
                // cy.get("[href='/users']").should('contain', 'Users').click();
                cy.visit('/users');
                cy.url().should('contain', 'users');
                cy.get(".input.search input").clear().type('new' + creds.email);
                cy.get(".current_user").click();
                cy.get("[data-test-id='personal-data-firstName'] label+div").invoke('text').should('eq', 'new' + creds.firstName);
                cy.get("[data-test-id='personal-data-lastName'] label+div").invoke('text').should('eq', 'new' + creds.lastName);
                cy.get(".PersonalData form > .seal")
                    .should('contain', creds.email);
                cy.get("[data-test-id='button-close']")
                    .should('contain', 'Close')
                    .click()
                    .get("[data-test-id='user-page'] .name")
                    .should('contain', 'Users');
                cy.get(`[data-test-id='three-dot-new${creds.email}'] .menu .item`)
                    .should('have.length', 1);
            }
        }
    }
};

export const SortByNumberAsc = class SortByNumberAsc {
    static expect() {
        return {
            toSortNumbersByAsc: () => {
                cy.get('[data-test-id=user-page] tbody tr:nth-child(3)')
                    .should('contain', creds.email)
                    .contains(creds.email).closest('tr')
                    .find('+tr').should('contain', creds2.email)
                    .find('+tr').should('contain', creds3.email)
                    .find('+tr').should('contain', creds4.email)
                    .find('+tr').should('contain', creds5.email);
            }
        }
    }
};

export const SortByNumberDesc = class SortByNumberDesc {
    static expect() {
        return {
            toSortNumbersByDesc: () => {
                cy.get('[data-test-id=user-page] tbody tr:nth-child(1)')
                    .should('contain', creds5.email)
                    .contains(creds5.email).closest('tr')
                    .find('+tr').should('contain', creds4.email)
                    .find('+tr').should('contain', creds3.email)
                    .find('+tr').should('contain', creds2.email)
                    .find('+tr').should('contain', creds.email);
            }
        }
    }
};

export const SortByEmailsAsc = class SortByEmailsAsc {
    static expect() {
        return {
            toSortEmailsByAsc: () => {
                cy.get('[data-test-id=user-page] tbody tr:nth-child(1)')
                    .should('contain', 'AA' + creds.email)
                    .contains("AA" + creds.email).closest('tr')
                    .find('+tr').should('contain', "Aa" + creds4.email)
                    .find('+tr').should('contain', "Af" + creds3.email)
                    .find('+tr').should('contain', "Ba" + creds5.email)
                    .find('+tr').should('contain', "Bz" + creds2.email);
            }
        }
    }
};

export const SortByEmailsDesc = class SortByEmailsDesc {
    static expect() {
        return {
            toSortEmailsByDesc: () => {
                cy.get('[data-test-id=user-page] tbody tr:nth-child(3)')
                    .should('contain', 'Bz' + creds2.email)
                    .contains("Bz" + creds2.email).closest('tr')
                    .find('+tr').should('contain', 'Ba' + creds5.email)
                    .find('+tr').should('contain', 'Af' + creds3.email)
                    .find('+tr').should('contain', 'Aa' + creds4.email)
                    .find('+tr').should('contain', 'AA' + creds.email);
            }
        }
    }
};

export const AddPositionError = class AddPositionError {
    static expect() {
        return {
            toGetError: () => {
                cy.get('.input-errors').should('contain', 'This field is required');
            }
        }
    };
};

export const PositionDoesNotExist = class PositionDoesNotExist {
    static expect() {
        return {
            notToShowNewPosition: () => {
                cy.get('.six.wide.column').should('not.contain', positionName)
            }
        }
    };
};

export const NewPositionDoesNotExist = class NewPositionDoesNotExist {
    static expect() {
        return {
            notToShowNewPosition: () => {
                cy.get('.six.wide.column').should('not.contain', positionName1)
            }
        }
    };
};

export const PositionExists = class PositionExists {
    static expect() {
        return {
            ToShowPosition: () => {
                cy.get('.six.wide.column').should('contain', positionName);
            }
        }
    };
};

export const NewPositionExists = class NewPositionExists {
    static expect() {
        return {
            ToShowNewPosition: () => {
                cy.get('.six.wide.column').should('contain', positionName1);
            }
        }
    };
};

export const UserHasNewPosition = class UserHasNewPosition {
    static expect() {
        return {
            toHaveNewPosition: () => {
                cy.get(".current_user").click();
                cy.get('.seal').contains('Position').parent().find('div').should('contain', positionName);
                cy.get("[data-test-id='button-close']").click();

            }
        }
    };
};

export const PositionIsNotEdited = class PositionIsNotEdited {
    static expect() {
        return {
            notToSaveEdition: () => {
                cy.get('.six.wide.column').should('not.contain', newPositionName);
            }
        }
    };
};

export const PositionIsEdited = class PositionIsEdited {
    static expect() {
        return {
            toSaveEdition: () => {
                cy.get('.six.wide.column').should('contain', newPositionName);
                cy.get('tbody tr td:nth-child(1)').should('contain', newPositionName);
                cy.get('tbody tr td:nth-child(1)').contains(newPositionName).click();
                cy.get('.checkbox').contains('Food')
                    .parent().invoke('attr', 'class').should('not.contain', 'checked');
                cy.get('.checkbox').contains('Hotel')
                    .parent().invoke('attr', 'class').should('not.contain', 'checked');
                cy.get('.checkbox').contains('Rent a car')
                    .parent().invoke('attr', 'class').should('not.contain', 'checked');
                cy.get('.checkbox').contains('Dinner with clients')
                    .parent().invoke('attr', 'class').should('not.contain', 'checked');
                cy.get('.checkbox').contains('Miscellaneous')
                    .parent().invoke('attr', 'class').should('not.contain', 'checked');

                cy.get('[data-test-id="position-content"] .name')
                    .contains('CC').parent().find('[type="text"]').should('contains', number);
                cy.get('[data-test-id="position-content"] .name').last()
                    .parent().find('[type="text"]').should('contains', number1);
                cy.get('[data-test-id="position-content"] .name')
                    .eq('Cash card').parent().find('[type="text"]').should('contains', number2);
            }
        }
    };
};
export const RemovePositionWindow = class RemovePositionWindow {
    static expect() {
        return {
            toContainPositionName: () => {
                cy.get('.name').should('contain', positionName1);
            }
        }
    };
};


