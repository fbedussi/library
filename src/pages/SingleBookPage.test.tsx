import React from 'react'
import { Route } from 'react-router-dom'

import { render } from '../test-utils'
import SingleBookPage from './SingleBookPage'

jest.mock('../data', () => ({}));

test('renders correctly - no book', () => {
	const page = render(<SingleBookPage />);
	expect(page).toMatchSnapshot();
});

test('renders correctly - with book', () => {
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
