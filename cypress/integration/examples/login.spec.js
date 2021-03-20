/// <reference types="cypress" />

context('Search Page', () => {
	it('search', () => {
		cy.visit('http://localhost:3000')
			.get('#username')
			.type('test@example.com')
			.get('#password')
			.type('testtest')
			.get('input[name="rememberMe"]')
			.click()
			.get('button')
			.click();
	});
});
