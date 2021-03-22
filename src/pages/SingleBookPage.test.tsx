import React from 'react'
import { Route } from 'react-router-dom'

import { act, fireEvent, render, screen, waitFor } from '../test-utils'
import SingleBookPage from './SingleBookPage'

jest.mock('../data', () => ({}));

test('renders correcly - no book', () => {
	const page = render(<SingleBookPage />);
	expect(page).toMatchSnapshot();
});

test('renders correcly - with book', () => {
	const page = render(
		<Route path="/edit/:bookId">
			<SingleBookPage />
		</Route>,
		{
			initialState: {
				books: [
					{ id: 'B', author: 'a', title: 't', location: 'l', coverPath: '' },
				],
			},
			route: '/edit/B',
		},
	);
	expect(page).toMatchSnapshot();
});
