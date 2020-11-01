import './i18n'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'

import reportWebVitals from './reportWebVitals'
import Routes from './Routes'
import store from './store'
import ErrorBoundary from './store/errors/ErrorBoundary'
import NotificationArea from './store/notifications/NotificationArea'
import { CircularProgress, Container, StylesProvider, ThemeProvider } from './styleguide'
import theme from './styleguide/theme'

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

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<StylesProvider injectFirst>
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
				</StylesProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
