import { TFunction } from 'i18next'

import { SearchCriteria } from '../model/model'

export const addBookFormValidation = (t: TFunction) => (
	values: SearchCriteria,
) => {
	return Object.entries(values).reduce((errors, [key, val]) => {
		if (!val) {
			errors[key] = t('errors.mandatoryField');
		}
		return errors;
	}, {} as { [k: string]: string });
};
