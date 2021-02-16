import React from 'react'

import { render } from '../test-utils'
import AddBookPage from './AddBookPage'

jest.mock('../data', () => ({}));

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key }),
}));

describe('AddBookPage', () => {
	it('renders correcly', () => {
		const page = render(<AddBookPage />);
		expect(page).toMatchSnapshot();
	});
});
