import React from 'react'

import { render, screen } from '../test-utils'
import ViewAllLink from './ViewAllLink'

jest.mock('../store/books/selectors', () => {
	const originalModule = jest.requireActual('../store/books/selectors');

	return {
		...originalModule,
		selectBooks: () => [1, 2, 3],
	};
});

test('has the right link', () => {
	render(<ViewAllLink />);

	const link = screen.getByRole<HTMLAnchorElement>('link');
	expect(!!link.href.match(/\/view-all$/)).toBe(true);
});

test('dispalys the right number of books', () => {
	render(<ViewAllLink />);
	expect(screen.getByText('3')).toBeInTheDocument();
});
