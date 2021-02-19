import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import {
  ByRoleMatcher, ByRoleOptions, render as rtlRender, screen as rtlScreen
} from '@testing-library/react'

import { RootState } from './model/model'
import { getTestStore } from './store'

function render(
	ui: JSX.Element,
	{
		initialState = {},
		store = getTestStore(initialState),
		dispatch,
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
		...renderOptions
	} = {} as {
		initialState?: Partial<RootState>;
		store?: any;
		dispatch?: any;
		route?: string;
		history?: MemoryHistory;
	},
) {
	const Wrapper: React.FC = ({ children }) => {
		return (
			<Provider store={dispatch ? { ...store, dispatch } : store}>
				<Router history={history}>{children}</Router>
			</Provider>
		);
	};
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const screen = {
	...rtlScreen,
	getByRole: <T extends HTMLElement>(
		text: ByRoleMatcher,
		options?: ByRoleOptions | undefined,
		waitForElementOptions?: unknown,
	) => rtlScreen.getByRole(text, options, waitForElementOptions) as T,
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, screen };
