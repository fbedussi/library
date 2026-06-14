import { bookFormValidation } from './validation';

test('bookFormValidation', () => {
  expect(
    bookFormValidation()({
      author: '',
      location: '',
      title: '',
    }),
  ).toEqual({
    author: 'campo obbligatorio',
    location: 'campo obbligatorio',
    title: 'campo obbligatorio',
  });
});
