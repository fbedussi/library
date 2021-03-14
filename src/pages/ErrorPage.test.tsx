import React from 'react'

import { render } from '../test-utils'
import ErrorPage from './ErrorPage'

describe('ErrorPage', () => {
	it('renders correcly', () => {
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
});
