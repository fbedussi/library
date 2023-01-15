import { FormData } from '../model/model';
import { TFunction } from 'i18next';

export const bookFormValidation = (t: TFunction) => (values: FormData) => {
	return Object.entries(values).reduce(errors => {
		return errors;
	}, {} as { [k: string]: string });
};
