import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '../styleguide'
import { Field, Form, Formik, FormikHelpers } from 'formik'

import { Close } from '../styleguide/icons'
import React from 'react'
import { SearchCriteriaForForm } from '../model/model'
import { pxToRem } from '../libs/styles'
import styled from 'styled-components'
import theme from '../styleguide/theme'
import { useTranslation } from 'react-i18next'

const InputWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: ${pxToRem(theme.spacing(1))}rem;
	margin-bottom: ${pxToRem(theme.spacing(1))}rem;
`;

const ButtonsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${pxToRem(theme.spacing(1))}rem;
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
`;

interface Props {
	initialValues: SearchCriteriaForForm;
	enableReinitialize?: boolean;
	validate?: (values: SearchCriteriaForForm) => { [k: string]: string };
	onSubmit: (
		values: SearchCriteriaForForm,
		formikHelpers: FormikHelpers<SearchCriteriaForForm>,
	) => void;
	PrimaryIcon: JSX.Element;
	primaryLabel: string;
}

const BookForm: React.FC<Props> = ({
	initialValues,
	enableReinitialize,
	validate,
	onSubmit,
	PrimaryIcon,
	primaryLabel,
}) => {
	const { t } = useTranslation();

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={enableReinitialize}
			validate={validate}
			onSubmit={onSubmit}
		>
			{({ handleChange, values, errors, dirty }) => {
				return (
					<Form name="book-form">
						<InputWrapper>
							<Field
								id="author"
								name="author"
								variant="outlined"
								as={TextField}
								label={t('app.author')}
								error={!!errors.author}
								helperText={errors.author}
							/>
							<Field
								id="title"
								name="title"
								variant="outlined"
								as={TextField}
								label={t('app.title')}
								error={!!errors.title}
								helperText={errors.title}
							/>
							<Field
								id="location"
								name="location"
								as={TextField}
								variant="outlined"
								label={t('app.location')}
								error={!!errors.location}
								helperText={errors.location}
							/>
							<FormControl>
								<FormLabel>{t('app.read')}</FormLabel>
								<RadioGroup
									name="read"
									onChange={handleChange}
									value={values.read}
									row
								>
									<FormControlLabel value="true" control={<Radio />} label={t('app.yes')} />
									<FormControlLabel value="false" control={<Radio />} label={t('app.no')} />
									<FormControlLabel value="" control={<Radio />} label={t('app.dontKnow')} />
								</RadioGroup>
							</FormControl>
						</InputWrapper>
						<ButtonsWrapper>
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={PrimaryIcon}
								type="submit"
								disabled={!dirty}
							>
								{primaryLabel}
							</Button>
							<Button
								variant="outlined"
								color="primary"
								size="large"
								startIcon={<Close />}
								type="reset"
								disabled={!dirty}
							>
								{t('app.reset')}
							</Button>
						</ButtonsWrapper>
					</Form>
				);
			}}
		</Formik>
	);
};

export default BookForm;
