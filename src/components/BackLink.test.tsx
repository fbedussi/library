import React from 'react'

import history from '../history'
import { fireEvent, render, screen } from '../test-utils'
import BackLink from './BackLink'

jest.mock('../history');

describe('BackLink', () => {
	it('triggers history.push on click', () => {
		history.goBack = jest.fn();
		render(<BackLink />);
		fireEvent.click(screen.getByRole('button'));
		expect(history.goBack).toBeCalled();
	});
});
