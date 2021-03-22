import React from 'react'

import { render } from '../test-utils'
import ErrorPage from './ErrorPage'

test('renders correcly', () => {
	const page = render(<ErrorPage />, {
		initialState: {
			errors: {
				http: [],
				ui: [{ id: 'a', message: 'errror message' }],
			},
		},
	});
	expect(page).toMatchSnapshot();
});
