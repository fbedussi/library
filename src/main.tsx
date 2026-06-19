import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CircularProgress } from './components/CommonComponents';
import './global.css';
import Routes from './Routes';
import store from './store';
import ErrorBoundary from './store/errors/ErrorBoundary';
import NotificationArea from './store/notifications/NotificationArea';

const container = document.getElementById('root');
if (!container) {
  throw new Error('missing root container');
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}>
          <div className="full-height-container">
            <Routes />
            <NotificationArea />
            {/* <DialogBox /> */}
          </div>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
