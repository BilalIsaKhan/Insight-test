/// <reference types="cypress" />

describe('Authentication', () => {
    it('should allow a user to login and logout', () => {
      cy.visit('/login');
      cy.get('button').contains('Login').click();
      cy.url().should('include', 'auth0.com');
      //
      cy.visit('/tasks');
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });
  });
  