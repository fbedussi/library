import { SearchCriteriaForForm } from '../model/model';
import { TFunction } from 'i18next';

export const bookFormValidation =
  (t: TFunction) => (values: SearchCriteriaForForm) => {
    return Object.entries(values).reduce((errors, [key, val]) => {
      if (key !== 'read' && !val) {
        errors[key] = t('errors.mandatoryField');
      }
      return errors;
    }, {} as { [k: string]: string });
  };
