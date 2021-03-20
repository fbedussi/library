/// <reference types="cypress" />

context('Search Page', () => {
	it('search', () => {
		cy.visit('http://localhost:3000');
		localStorage.setItem('library-userId', '5zcf1s4jukNVF9Z3QR86czf268K2');
		cy.visit('http://localhost:3000/search');
		cy.get('header').contains('Ricerca').should('be.visible');
		cy.get('.book-card').should('not.exist');
		cy.get('input[name="author"]').type('test author');
		cy.get('button').contains('ricerca', { matchCase: false }).click();
		cy.get('.book-card').should('be.visible');
	});
});
