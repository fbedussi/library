import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import Routes from './Routes';
import { getTestStore } from './store';

jest.mock('./config', () => {
  return {
    firebase: {
      apiKey: 'apiKey',
      authDomain: 'authDomain',
      databaseURL: 'databaseURL',
      projectId: 'projectId',
      storageBucket: 'storageBucket',
      messagingSenderId: 'messagingSenderId',
      appId: 'appId',
    },
  };
});

jest.mock('./firebase', () => ({}));

test('renders login page if no user id is set', () => {
  render(
    <Provider store={getTestStore({})}>
      <Routes />
    </Provider>,
  );
  expect(screen.getByLabelText('app.username')).toBeInTheDocument();
});

test('renders search page if user id is set', () => {
  render(
    <Provider store={getTestStore({ auth: { userId: 'userId' } })}>
      <Routes />
    </Provider>,
  );
  expect(screen.getByTestId('search-page')).toBeInTheDocument();
});
