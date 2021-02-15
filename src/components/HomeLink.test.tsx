import React from 'react'

import history from '../history'
import { fireEvent, render, screen } from '../test-utils'
import HomeLink from './HomeLink'

jest.mock('../history');

describe('HomeLink', () => {
	it('triggers history.push on click', () => {
		history.push = jest.fn();
		render(<HomeLink />);
		fireEvent.click(screen.getByRole('button'));
		expect(history.push).toBeCalledWith('/');
	});
});
