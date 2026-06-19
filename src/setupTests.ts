// Node.js 25+ ships a stub localStorage that lacks methods unless --localstorage-file is set.
// Override it with a proper in-memory implementation for tests.
const _localStorageData: Record<string, string> = {};
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => _localStorageData[key] ?? null,
    setItem: (key: string, value: string) => {
      _localStorageData[key] = String(value);
    },
    removeItem: (key: string) => {
      delete _localStorageData[key];
    },
    clear: () => {
      Object.keys(_localStorageData).forEach(k => {
        delete _localStorageData[k];
      });
    },
    get length() {
      return Object.keys(_localStorageData).length;
    },
    key: (i: number) => Object.keys(_localStorageData)[i] ?? null,
  },
  writable: true,
  configurable: true,
});

import '@testing-library/jest-dom';

window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock('./data', () => ({}));
