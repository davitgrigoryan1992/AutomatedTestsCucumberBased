import faker from 'faker';

let id_token = null;
const map = new Map();

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem('id_token')}`,
  };
};


Cypress.Commands.add('webLogin', (email, pass) => {
  cy.visit('/login');
  cy.url().should('contain', 'login');
  cy.get('input').first().clear().type(email);
  cy.get('input').last().clear().type(pass);
  cy.get('button').contains('Sign In').click();
});


Cypress.Commands.add('logout', () => {
  cy.get('.right.menu .MenuDropdown')
    .should('contain', 'Your account').click();
  cy.get('.MenuDropdown .power+span')
    .should('contain', 'Logout').click();
  cy.url().should('contain', 'login');
});


Cypress.Commands.add('xhrLogin', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('api_url')}/get_token`,
    body: {
      login: 'admin@test.com',
      password: 'test',
    },
  }).then((res) => {
    localStorage.setItem('id_token', res.body.token);
  });
});


Cypress.Commands.add('userLoginAPI', (creds) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('api_url')}/get_token`,
    body: {
      email: creds.email,
      password: creds.password,
    },
  }).then((res) => {
    localStorage.setItem('id_token', res.body.token);
  });
});

Cypress.Commands.add('declareXHR', () => {
  cy.server();
  cy.route(`${Cypress.env('api_url')}/*`).as('forXHR');
});


Cypress.Commands.add('getTextFrom', { prevSubject: true }, (prev) => {
  return prev.invoke('text');
});


Cypress.Commands.add('createNewUser', (creds) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('api_url')}/user`,
    form: true,
    headers: {
      Authorization: `${localStorage.getItem('id_token')}`,
    },
    body: {
      fname: creds.firstName,
      lname: creds.lastName,
      email: creds.email,
      passwd: creds.password,
      passwdCheck: creds.password,
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
    id_token = `${localStorage.getItem('id_token')}`;
    map.set(creds.firstName, resp.body.id);
  });
});

Cypress.Commands.add('updateUserEmail', (email, newemail) => {
  cy.get('[data-test-id=user-page] .current_user+div')
    .contains(email).click();
  cy.get("[data-test-id='button-edit']")
    .should('contain', 'Edit').click();
  cy.get('[name=email]').clear().type(newemail);
  cy.get('[data-test-id=button-save]').click();
  cy.visit('/users').wait('@userPage');
  cy.get('[data-test-id=user-page]').should('contain', 'Users');
});


Cypress.Commands.add('deleteUser', (user) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('api_url')}/user/${map.get(user.firstName)}`,
    form: true,
    headers: {
      Authorization: id_token,
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  });
});

Cypress.Commands.add('unblockUserApi', (user) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('api_url')}/user/${map.get(user.firstName)}/block/web`,
    form: true,
    headers: {
      Authorization: id_token,
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  });
});

export const getCredentials = () => {
  return {
    login: 'admin@test.com',
    pass: 'test',
    firstName: cy.faker.name.firstName(),
    lastName: cy.faker.name.lastName(),
    email: cy.faker.internet.exampleEmail(),
    password: `${cy.faker.internet.password(5, 8)}@aA1`,
    amount: cy.faker.random.number({ min: 15, max: 5000 }),
    purchase_date: '2020-01-23',
    //currency: '1',
    //vat: cy.faker.random.number({ min: 1, max: 3 }),
    vat: '1',
    payment_method: cy.faker.random.number({ min: 1, max: 3 }),
    purchase_category: cy.faker.random.number({ min: 1, max: 5 }),
    description: Cypress._.random(0, 1e6),
    imagePath: 'images/invoice.pdf',
    currency_number: '4',
  };
};


export const getCompanyInfo = () => {
  return {
    name: faker.random.words(),
    vat: cy.faker.random.number({ min: 20, max: 40 }),
    accountingFramework: '2',
    consultantNumber: cy.faker.random.number({ min: 100000, max: 500000 }),
    clientNumber: cy.faker.random.number({ min: 10000, max: 50000 }),
    accountDigits: cy.faker.random.number({ min: 1, max: 90 }),
    repositoryPath: faker.random.words(),
    invoicePrefix: faker.random.words(1),
    country: '1',
    city: cy.faker.address.city(),
    zipCode: cy.faker.address.zipCode(),
    street: cy.faker.address.streetAddress(),
    bankName: faker.random.words(3),
    iban: cy.faker.random.number({ min: 1000000, max: 5000000 }),
    swift: cy.faker.random.number({ min: 10000000, max: 50000000 }),

  };
};
export const getPreferencesinfo = () => {
  return {
    categoryName: faker.random.words(2),
    categoryAccount: cy.faker.random.number({min:1000, max:9999}),
    paymentName: faker.random.words(1),
    paymentAccount: cy.faker.random.number({min:1000, max:9999}),
    vatName: faker.random.words(1),
    vatPercentage: cy.faker.random.number({min:1, max:9}),
    vatID: cy.faker.random.number({min:10000, max:99999}),


  };
};
export const getMailInfo = () => {
  return {
    email: cy.faker.internet.exampleEmail(),
    smtpHost: cy.faker.random.number({ min: 1000, max: 5000 }),
    smtpPort: cy.faker.random.number({ min: 1000, max: 5000 }),
    password: `${cy.faker.internet.password(5, 8)}@aA1`,
    userEmail: cy.faker.internet.exampleEmail(),
  };
};
Cypress.Commands.add('uploadAnyFile', (fileName, encoding, selector, type, inputType) => {
  cy.fixture(fileName, encoding).then((fileContent) => {
    cy.get(selector).upload(
      {
        fileContent, fileName, mimeType: type, encoding,
      },
      { subjectType: inputType },
    );
  });
});


Cypress.Commands.add('createNewReceipt', (creds, fileName, encoding) => {
  cy.fixture(fileName, encoding).then((fileContent) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/receipt`,
      form: false,
      headers: {
        Authorization: `${localStorage.getItem('id_token')}`,
      },
      body: {
        // files: [`data:application/pdf;${encoding},${fileContent.toString()}`],
        // files: 'invoice.jpg',
        purchase_date: creds.purchase_date,
        amount: creds.amount,
        currency: creds.currency,
        vat: creds.vat,
        payment_method: creds.payment_method,
        purchase_category: creds.purchase_category,
        description: creds.description,
      },
    }).then((resp) => {
      console.log(resp);
      expect(resp.status).to.eq(200);
    });
  });
});

Cypress.Commands.add('createNewInvoice', (creds, filename, numbers, amountNumber) => {
  cy.url().should('contain', 'invoices');
  cy.wait(2000);
  cy.get('[data-test-id=button-new-invoice]')
      .should('be.visible')
      .contains('New receipt').should('be.visible').click();
  cy.get('.AddReceiptModal')
      .should('contain', 'New receipt');
  cy.uploadAnyFile(filename, 'base64',
    '[class*="dropzone"] input', 'image/jpg', 'input');
  cy.get("[name='amount']").clear().type(amountNumber);
  cy.get('[name=currency]').click();
  cy.get(`[name='currency'] .menu div:nth-child(${creds.currency_number})`).click();
  cy.get("[name='purchase_category'] input").click();
  cy.get(`[name='purchase_category'] .menu div:nth-child(${creds.purchase_category})`).click();
  cy.get(`[name='vat'] .button:nth-child(${creds.vat})`).click();
  cy.get(`[name='payment_method'] .button:nth-child(${creds.payment_method})`).click();
  cy.get("[name='description']").type(numbers + creds.description);
  cy.get("[data-test-id='button-add']").click();

  cy.get('.datagrid-body [class*=description]')
      .should('contain', numbers + creds.description);
});

Cypress.Commands.add('unblockUser', (creds) => {
  cy.visit('/users');
  // Unblock created user
  cy.get('.input.search input').clear().type(creds.email);
  cy.get('.current_user').click();
  cy.get('[data-test-id="add-user-modal-header"]')
      .should('contain', `User ${creds.firstName} ${creds.lastName}`);
  cy.get("[data-test-id='button-edit']")
    .should('contain', 'Edit')
    .should('be.visible').click();
  cy.get("[data-test-id='button-blockWeb']")
    .should('contain', 'Unblock browser').click()
    .should('contain', 'Block browser');
  cy.get("[data-test-id='button-save']")
    .should('contain', 'Save').click();
});


