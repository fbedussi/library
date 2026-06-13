import '@testing-library/jest-dom';

window.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (str: string) => str }),
}));

jest.mock('./data', () => ({}));
