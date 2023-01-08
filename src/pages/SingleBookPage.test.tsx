import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { render } from '../test-utils'
import SingleBookPage from './SingleBookPage'

jest.mock('../data', () => ({}));

test('renders correctly - no book', () => {
	const page = render(<SingleBookPage />);
	expect(page).toMatchSnapshot();
});

test('renders correctly - with book', () => {
	const page = render(
		<Routes>
			<Route path="/edit/:bookId" element={<SingleBookPage />} />
		</Routes>,
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
