import React from 'react'
import * as router from 'react-router-dom'

import userEvent from '@testing-library/user-event'

import { render, screen } from '../test-utils'
import BackLink from './BackLink'

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	(router.useNavigate as any).mockImplementation(
		jest.requireActual('react-router-dom').useNavigate,
	);
});

test('triggers history.push on click', () => {
	const navigate = jest.spyOn(router, 'useNavigate');
	render(<BackLink />);
	userEvent.click(screen.getByRole('button'));
	expect(navigate).toBeCalledWith(-1);
});
