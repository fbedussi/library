import type { FormData } from '../model/model';

export const bookFormValidation = () => (values: FormData) => {
  return Object.entries(values).reduce(
    (errors, [key, val]) => {
      if (!['read', 'category'].includes(key) && !val) {
        errors[key] = 'campo obbligatorio';
      }
      return errors;
    },
    {} as { [k: string]: string },
  );
};
