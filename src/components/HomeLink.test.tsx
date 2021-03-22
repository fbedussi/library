import React from 'react'

import userEvent from '@testing-library/user-event'

import history from '../history'
import { render, screen } from '../test-utils'
import HomeLink from './HomeLink'

jest.mock('../history');

test('triggers history.push on click', () => {
	history.push = jest.fn();
	render(<HomeLink />);
	userEvent.click(screen.getByRole('button'));
	expect(history.push).toBeCalledWith('/');
});
