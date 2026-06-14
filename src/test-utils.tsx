import {
  type ByRoleMatcher,
  type ByRoleOptions,
  render as rtlRender,
  screen as rtlScreen,
} from '@testing-library/react';
import type React from 'react';
import type { JSX } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import type { RootState } from './model/model';
import { getTestStore } from './store';

function render(
  ui: JSX.Element,
  {
    initialState = {},
    store = getTestStore(initialState),
    dispatch,
    route = '/',
    ...renderOptions
  } = {} as {
    initialState?: Partial<RootState>;
    store?: ReturnType<typeof getTestStore>;
    dispatch?: ReturnType<typeof getTestStore>['dispatch'];
    route?: string;
  },
) {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
      <Provider store={dispatch ? { ...store, dispatch } : store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
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
  ) => rtlScreen.getByRole(text, options) as T,
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, screen };
