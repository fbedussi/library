import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './global.css';
import { initI18n } from './i18n';
import Routes from './Routes';
import store from './store';
import ErrorBoundary from './store/errors/ErrorBoundary';
import NotificationArea from './store/notifications/NotificationArea';
import {
  CacheProvider,
  CircularProgress,
  Container,
  createCache,
} from './styleguide';

initI18n();

const cache = createCache({
  key: 'library',
  prepend: true,
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <Container className="full-height-container" maxWidth={false} disableGutters={true}>
              <Routes />
              <NotificationArea />
              {/* <DialogBox /> */}
            </Container>
          </Suspense>
        </ErrorBoundary>
      </CacheProvider>
    </Provider>
  </React.StrictMode>,
);