import React from 'react'

import userEvent from '@testing-library/user-event'

import history from '../history'
import { render, screen } from '../test-utils'
import BackLink from './BackLink'

jest.mock('../history');

test('triggers history.push on click', () => {
	history.goBack = jest.fn();
	render(<BackLink />);
	userEvent.click(screen.getByRole('button'));
	expect(history.goBack).toBeCalled();
});
