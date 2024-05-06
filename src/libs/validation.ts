import { FormData } from '../model/model';
import { TFunction } from 'i18next';

export const bookFormValidation = (t: TFunction) => (values: FormData) => {
	return Object.entries(values).reduce((errors, [key, val]) => {
		if (!['read', 'category'].includes(key) && !val) {
			errors[key] = t('errors.mandatoryField');
		}
		return errors;
	}, {} as { [k: string]: string });
};
