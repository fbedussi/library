import '@testing-library/jest-dom'

jest.mock('react-i18next', () => ({
	withTranslation: () => (Component: React.FC) => {
		Component.defaultProps = { ...Component.defaultProps, t: (k: string) => k };
		return Component;
	},
	useTranslation: () => ({ t: (str: string) => str }),
}));

jest.mock('./data', () => ({}));
