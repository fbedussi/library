import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import { initI18n } from './i18n';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes';
import store from './store';
import ErrorBoundary from './store/errors/ErrorBoundary';
import NotificationArea from './store/notifications/NotificationArea';
import {
  CacheProvider,
  CircularProgress,
  Container,
  createCache,
  ThemeProvider,
} from './styleguide';
import theme from './styleguide/theme';

initI18n();

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
				font-family: Avenir, Arial, sans-serif;
    }

    * {
        margin: 0;
        padding: 0;
				box-sizing: border-box;
    }

    button {
      background-color: transparent;
      border: none;
      appearance: none;
      font: inherit;
    }
`;

const FullHeightContainer = styled(Container)`
  height: 100%;
`;

const cache = createCache({
  key: 'my-prefix-key',
  nonce: 'nonce',
  prepend: true,
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <GlobalStyle />
          <ErrorBoundary>
            <Suspense fallback={<CircularProgress />}>
              <FullHeightContainer maxWidth={false} disableGutters={true}>
                <Routes />
                <NotificationArea />
                {/* <DialogBox /> */}
              </FullHeightContainer>
            </Suspense>
          </ErrorBoundary>
        </CacheProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
