const creds = {
  login: 'admin@test.com',
  pass: 'test',
};

describe('Login spec', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.get('input')
      .first()
      .as('loginInput');
    cy.get('input[type="password"]').as('passInput');
    cy.get('button').as('submitBtn');
  });

  it('Should show login page', () => {
    cy.url().should('contain', 'login');
    cy.get('body').should('contain', 'Email Address');
    cy.get('body').should('contain', 'Password');
    cy.get('button').should('contain', 'Sign In');
  });

  it('Should show wrong credentials message', () => {
    cy.get('@loginInput').type('test@email.com');
    cy.get('@passInput').type('asd');
    cy.get('@submitBtn').click();
    cy.get('.noty_body').should('contain', 'Wrong email or password');
    cy.get('@loginInput').clear();
    cy.get('@passInput').clear();
  });

  it('Should be redirected if not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/invoices');
    cy.url().should('contain', 'login');
  });

  it('Should login', () => {
    cy.get('@loginInput').type(creds.login);
    cy.get('@passInput').type(creds.pass);
    cy.get('@submitBtn').click();
    cy.url().should('contain', 'invoices');
    cy.url().should('not.contain', 'login');
  });
});
