import React from 'react'

import { render } from '../test-utils'
import CameraPage from './CameraPage'

describe('CameraPage', () => {
	it('renders correcly', () => {
		const page = render(<CameraPage />);
		expect(page).toMatchSnapshot();
	});
});
