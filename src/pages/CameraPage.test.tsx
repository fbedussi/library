import React from 'react'

import { render } from '../test-utils'
import CameraPage from './CameraPage'

test('CameraPage renders correcly', () => {
	const page = render(<CameraPage />);
	expect(page).toMatchSnapshot();
});
