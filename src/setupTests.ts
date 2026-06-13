import '@testing-library/jest-dom';

window.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

jest.mock('react-i18next', () => ({
  withTranslation: () => (Component: React.FC) => {
    Component.defaultProps = { ...Component.defaultProps, t: (k: string) => k };
    return Component;
  },
  useTranslation: () => ({ t: (str: string) => str }),
}));

jest.mock('./data', () => ({}));
