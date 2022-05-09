/* eslint-disable no-undef */
describe('Login Register Events', () => {
  it('Login events', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.contains('Giriş Yap');
    cy.contains('Şifremi Unuttum');
    cy.contains('E-mail');
    cy.contains('Üye Ol').click().wait(1000);
    cy.url().should('include', '/register');
  });

  it('Register events', () => {
    cy.get('#email').type('hur@hur.com').should('have.value', 'hur@hur.com');
    cy.get('#password').type('12345678').should('have.value', '12345678');
    cy.contains('Giriş Yap').click().wait(1000);
    cy.url().should('include', '/login');
    cy.get('.login-register-btn').click().wait(1000);
  });
});
