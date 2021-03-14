// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom'

// learn more: https://github.com/testing-library/jest-dom
import { ReactComponent } from '*.svg'

jest.mock('react-i18next', () => ({
	withTranslation: () => (Component: React.FC) => {
		Component.defaultProps = { ...Component.defaultProps, t: (k: string) => k };
		return Component;
	},
	useTranslation: () => ({ t: (str: string) => str }),
}));

jest.mock('./data', () => ({}));
