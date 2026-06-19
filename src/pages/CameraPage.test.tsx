import { render } from '../test-utils';
import CameraPage from './CameraPage';

vi.mock('../config', () => {
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

test('CameraPage renders correcly', () => {
  const page = render(<CameraPage />);
  expect(page).toMatchSnapshot();
});
