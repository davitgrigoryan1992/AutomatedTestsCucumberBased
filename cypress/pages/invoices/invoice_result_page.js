export const NewReceiptWindow = class NewReceiptWindow {
    static expect() {
        return {
            toOpenNewReceiptWindow: () => {
                cy.get('.AddReceiptModal')
                    .should('contain', 'New receipt');
            }
        }
    }
};

export const ErrorMessages = class ErrorMessages {
    static expect() {
        return {
            toShowErrorMessages: () => {
                cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(1)")
                    .should('contain', 'This field is required');
                cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(3)")
                    .should('contain', 'Value must be a number');
                cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(4)")
                    .should('contain', 'Value must be a string');
                cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(5)")
                    .should('contain', 'Value must be a string');
            }
        }
    }
};

export const UploadErrorMessage = class UploadErrorMessage {
    static expect() {
        return {
            toShowUploadErrorMessage: () => {
                cy.get("[data-test-id='add-new-receipt-modal'] ul:nth-of-type(1)")
                    .should('contain', 'This field is required');
            }
        }
    }
};

export const searchInvoice = class searchInvoice {
    static expect() {
        return {
            toShowInvoice: (creds) => {
                cy.get('.datagrid-body tr:nth-child(1)')
                    .should('contain', creds.description);
            }
        }
    }
};

export const AmountFields = class AmountFields {
    static expect() {
        return {
            toBeEmpty: () => {
                cy.get('[name=amount_from]').should('be.empty');
                cy.get('[name=amount_to]').should('be.empty');
            }
        }
    }
};

export const InvoicesTable = class InvoicesTable {
    static expect() {
        return {
            toFilter: () => {
                cy.get('tbody tr[class]').should('contain', amount);
            }
        }
    }
};

export const filterField = class filterField {
    static expect() {
        return {
            toBeEmpty: (filter_field) => {
                cy.get(filter_field).invoke('attr', 'class')
                    .should('contain', 'default');
            }
        }
    }
};

export const FilterByCategories = class FilterByCategories {
    static expect() {
        return {
            toFilter: () => {
                cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
                    .then(($div) => {
                        const text = $div.text();
                        cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
                            .click({force: true});
                        cy.get('[data-test-id="apply-button"]').click();
                        cy.get('tbody tr[class]').should('contain', text);
                        if (creds.purchase_category < creds2.purchase_category) {
                            cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`).prev()
                                .then(($div) => {
                                    const text2 = $div.text();
                                    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`).prev()
                                        .click({force: true});
                                    cy.get('[data-test-id="apply-button"]').click();
                                    cy.get('tbody tr[class]').should('contain', text).and('contain', text2);
                                });
                        } else if (`${creds.purchase_category} == ${creds2.purchase_category}`) {
                            cy.get('[data-test-id="apply-button"]').click();
                            cy.get('tbody tr[class]').should('contain', text);
                        } else {
                            cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`)
                                .then(($div) => {
                                    const text2 = $div.text();
                                    cy.get(`[name='purchase_category'] .menu div:nth-child(${creds2.purchase_category})`)
                                        .click({force: true});
                                    cy.get('[data-test-id="apply-button"]').click();
                                    cy.get('tbody tr[class]').should('contain', text).and('contain', text2);
                                });
                        }
                    });
                cy.get(`[name='purchase_category'] .menu div:nth-child(${creds3.purchase_category})`)
                    .then(($div) => {
                        const text3 = $div.text();
                        cy.get('tbody tr[class]').should('not.contain', text3);
                    });
            }
        }
    }
};

export const FilterByPaymentMethod = class FilterByPaymentMethod {
    static expect() {
        return {
            toFilterByMethod: () => {
                cy.get(`[name=payment_method] .menu div:nth-child(${creds.payment_method})`)
                    .then(($div) => {
                        const text4 = $div.text();
                        cy.get(`[name=payment_method] .menu div:nth-child(${creds.payment_method})`)
                            .click({force: true});
                        cy.get('[data-test-id="apply-button"]').click({force: true}).wait(2000);
                        cy.get('tbody tr[class]:nth-child(1)').click().window();
                        cy.get('.active .header').should('contain', 'Invoice');
                        cy.get('[class*=detailTable] tr:nth-child(3) td:nth-child(2)')
                            .should('have.text', text4);
                        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
                    });
                cy.get(`[name=payment_method] .menu div:nth-child(${creds3.payment_method})`)
                    .then(($div) => {
                        const text5 = $div.text();
                        cy.get('tbody tr[class]:nth-child(2)').click().window();
                        cy.get('.active .header').should('contain', 'Invoice');
                        cy.get('[class*=detailTable] tr:nth-child(3) td:nth-child(2)')
                            .should('not.have.text', text5);
                        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
                    });
            }
        }
    }
};

export const filterByVat = class filterByVat {
    static expect() {
        return {
            toFilterByVat: () => {
                cy.get(`[name=vat] .menu div:nth-child(${creds.vat})`)
                    .then(($div) => {
                        const text6 = $div.text();
                        cy.get(`[name=vat] .menu div:nth-child(${creds.vat})`)
                            .click({force: true});
                        cy.get('[data-test-id="apply-button"]').click({force: true}).wait(2000);
                        cy.get('tbody tr[class]:nth-child(1)').click().window();
                        cy.get('.active .header').should('contain', 'Invoice');
                        cy.get('[class*=detailTable] tr:nth-child(5) td:nth-child(2)')
                            .should('have.text', text6);
                        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
                    });
                cy.get('[name=vat] > i').click({force: true});
                cy.get(`[name=vat] .menu div:nth-child(${creds3.vat})`)
                    .then(($div) => {
                        const text7 = $div.text();
                        cy.get('tbody tr[class]:nth-child(1)').click().window();
                        cy.get('.active .header').should('contain', 'Invoice');
                        cy.get('[class*=detailTable] tr:nth-child(5) td:nth-child(2)')
                            .should('not.have.text', text7);
                        cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
                    });
            }
        }
    }
};

export const filterByTwoFilters = class filterByTwoFilters {
    static expect() {
        return {
            toFilterByAmountAndCategory: () => {
                cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
                    .then(($div) => {
                        const text2 = $div.text();
                        cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`)
                            .click({force: true});
                        cy.get('[data-test-id="apply-button"]').click();
                        cy.get('tbody tr[class]').should('contain', amount);
                        cy.get('tbody tr[class]').should('contain', text2);
                    });
            }
        }
    }
};

export const ToFilterByTwoFilters = class ToFilterByTwoFilters {
    static expect() {
        return {
            toFilterByPaymentMethodAndVat: () => {
                cy.get(`[name=payment_method] .menu div:nth-child(${creds2.payment_method})`)
                    .then(($div) => {
                        const text = $div.text();
                        cy.get(`[name=payment_method] .menu div:nth-child(${creds2.payment_method})`);
                        cy.get(`[name=payment_method] .menu div:nth-child(${creds2.payment_method})`)
                            .click({force: true});
                        cy.get('[name=vat] div').invoke('attr', 'class')
                            .should('contain', 'default');
                        cy.get('[name=vat] > i').click({force: true});
                        cy.get(`[name=vat] .menu div:nth-child(${creds2.vat})`)
                            .then(($div) => {
                                const text2 = $div.text();
                                cy.get('[name=vat] > i').click({force: true});
                                cy.get(`[name=vat] .menu div:nth-child(${creds2.vat})`)
                                    .click({force: true});
                                cy.get('[data-test-id="apply-button"]').should('contain', 'Apply filters')
                                    .click({force: true}).wait(2000);
                                cy.get('tbody tr[class]:nth-child(1)').click({force: true}).window();
                                cy.get('.active .header').should('contain', 'Invoice');

                                cy.get('body').then(($body) => {
                                    if ($body.find('[class*=detailTable] tr:nth-child(5) td:nth-child(2)').text() === text2) {
                                        cy.get('[data-test-id=button-close]').should('contain', 'Close').click({force: true});
                                    } else if ($body.find('[class*=detailTable] tr:nth-child(3) td:nth-child(2)').text() === text) {
                                        cy.get('[data-test-id=button-close]').should('contain', 'Close').click({force: true});
                                    } else throw new Error('Filter Not Working Properly!!!');
                                });
                            });
                    });
            }
        }
    }
};

export const DownloadInvoice = class DownloadInvoice {
    static expect() {
        return {
            toDownloadInvoice: () => {
                cy.get('[class*=detailTable] tr:nth-child(3) td:nth-child(2)')
                    .then(($div) => {
                        const method = $div.text();
                        cy.get('[class*=detailTable] tr:nth-child(5) td:nth-child(2)')
                            .then(($div) => {
                                const vat = $div.text();
                                cy.get('[data-test-id=button-close]').should('contain', 'Close').click();
                                cy.get('.ellipsis.horizontal.icon').first().click();
                                cy.get('[class*=transition] a:nth-child(1)').invoke('attr', 'href').then((href) => {
                                    cy.request(href).then((response) => {
                                        expect(response.status).to.eq(200);
                                        expect(response.body).to.include('User: Client User');
                                        expect(response.body).to.include('User Email: admin@test.com');
                                        expect(response.body).to.include(`${'Payment method:' + ' '}${method}`);
                                        expect(response.body).to.include(`${'VAT:' + ' '}${vat}`);
                                    });
                                });
                            });
                    });
            }
        }
    }
};

export const sortingDefault = class sortingDefault {
    static expect() {
        return {
            toBeAsDefault: (number, string) => {
                cy.get(`table thead th:nth-child(${number})`)
                    .should('have.class', string)
            }
        }
    }
};

export const NumberSortingDesc = class NumberSortingDesc {
    static expect() {
        return {
            toSortByDescendingOrder: () => {
                cy.get('table thead th:nth-child(1)')
                    .should('have.class', 'descending');
                for (var i = 1; i < 3; i++) {
                    cy.get(`table tbody tr:nth-child(${i}) td:nth-child(1) p`).then(($p) => {
                        global.text1 = $p.text();
                        global.text2 = $p.parent().parent().next('tr').find('td:nth-child(1) p').text();
                        if (`${text1}` >= `${text2}`) {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                        } else {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                            throw new Error("Invoices are not sorted correctly by number !!!");
                        }
                    });
                }
                cy.log("Invoices are sorted correctly by description!!!");
            }
        }
    }
};

export const NumberSortingAsc = class NumberSortingAsc {
    static expect() {
        return {
            toSortByAscendingOrder: () => {
                cy.get('table thead th:nth-child(1)').should('have.class', 'ascending');
                for (var i = 1; i < 3; i++) {
                    cy.get(`table tbody tr:nth-child(${i}) td:nth-child(1) p`).then(($p) => {
                        global.text1 = $p.text();
                        global.text2 = $p.parent().parent().next('tr').find('td:nth-child(1) p').text();
                        if (`${text1}` <= `${text2}`) {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                        } else {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                            throw new Error("Invoices are not sorted correctly by number !!!");
                        }
                    });
                }
                cy.log("Invoices are sorted correctly by description!!!");
            }
        }
    }
};

export const AmountSortingAsc = class AmountSortingAsc {
    static expect() {
        return {
            toSortByAscendingOrder: () => {
                cy.get('table thead th:nth-child(7)')
                    .should('have.class', 'ascending');
                for (var i = 1; i < 3; i++) {
                    cy.get(`table tbody tr:nth-child(${i}) td:nth-child(7) span`).then(($span) => {
                        global.text1 = $span.text().substring(0, 3);
                        global.text2 = $span.parent().parent().next('tr').find('td:nth-child(7) span').text().substring(0, 3);;
                        if (`${text1}` <= `${text2}`) {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                        } else {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                            throw new Error("Invoices are not sorted correctly by amount !!!");
                        }
                    });
                }
                cy.log("Invoices are sorted correctly by description!!!");
            }
        }
    }
};

export const AmountSortingDesc = class AmountSortingDesc {
    static expect() {
        return {
            toSortByDescendingOrder: () => {
                for (var i = 1; i < 3; i++) {
                    cy.get(`table tbody tr:nth-child(${i}) td:nth-child(7) span`).then(($span) => {
                        global.text1 = $span.text().substring(0, 3);
                        global.text2 = $span.parent().parent().next('tr').find('td:nth-child(7) span').text().substring(0, 3);
                        if (`${text1}` >= `${text2}`) {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                        } else {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                            throw new Error("Invoices are not sorted correctly by amount !!!");
                        }
                    });
                }
                cy.log("Invoices are sorted correctly by description!!!");
            }
        }
    }
};

export const DescSortingDescending = class DescSortingDescending {
    static expect() {
        return {
            toSortByDescendingOrder: () => {
                cy.get('table thead th:nth-child(2)')
                    .should('have.class', 'descending');
                for (var i = 1; i < 3; i++) {
                    cy.get(`table tbody tr:nth-child(${i}) td:nth-child(2) p`).then(($p) => {
                        global.text1 = $p.text();
                        global.text2 = $p.parent().parent().next('tr').find('td:nth-child(2) p').text();
                        if (`${text1}` >= `${text2}`) {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                        } else {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                            throw new Error("Invoices are not sorted correctly by description!!!");
                        }
                    });
                }
                cy.log("Invoices are sorted correctly by description!!!");
            }

        }
    }
};

export const DescSortingAscending = class DescSortingAscending {
    static expect() {
        return {
            toSortByAscendingOrder: () => {
                cy.get('table thead th:nth-child(2)')
                    .should('have.class', 'ascending');
                for (var i = 1; i < 3; i++) {
                    cy.get(`table tbody tr:nth-child(${i}) td:nth-child(2) p`).then(($p) => {
                        global.text1 = $p.text();
                        global.text2 = $p.parent().parent().next('tr').find('td:nth-child(2) p').text();
                        if (`${text1}` <= `${text2}`) {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                        } else {
                            cy.log(`${text1}`);
                            cy.log(`${text2}`);
                            throw new Error("Invoices are not sorted correctly by description !!!");
                        }
                    });
                }
                cy.log("Invoices are sorted correctly by description!!!");
            }
        }
    }
};
