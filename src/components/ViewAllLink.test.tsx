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

describe('ViewAllLink', () => {
	it('has the right link', () => {
		render(<ViewAllLink />);

		const link = screen.getByRole('link') as HTMLAnchorElement;
		expect(!!link.href.match(/\/view-all$/)).toBe(true);
	});

	it('dispalys the right number of books', () => {
		render(<ViewAllLink />);
		expect(screen.getByText('3')).toBeInTheDocument();
	});
});
