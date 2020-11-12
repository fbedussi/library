import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import { Button, TextField } from '../styleguide'
import { Close } from '../styleguide/icons'
import theme from '../styleguide/theme'

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
	initialValues: SearchCriteria;
	enableReinitialize?: boolean;
	validate?: (values: SearchCriteria) => { [k: string]: string };
	onSubmit: (
		values: SearchCriteria,
		formikHelpers: FormikHelpers<SearchCriteria>,
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
			{({ values, errors, setFieldValue, dirty }) => {
				return (
					<Form>
						<InputWrapper>
							<Field
								name="author"
								onDrop={(ev: React.DragEvent) => {
									const word = ev.dataTransfer.getData('text/plain');
									setFieldValue(
										'author',
										values.author.length ? `${values.author} ${word}` : word,
									);
								}}
								onDragOver={(ev: React.DragEvent) => {
									ev.preventDefault();
									ev.dataTransfer.dropEffect = 'move';
								}}
								variant="outlined"
								as={TextField}
								label={t('app.author')}
								error={!!errors.author}
								helperText={errors.author}
							/>
							<Field
								name="title"
								variant="outlined"
								as={TextField}
								label={t('app.title')}
								error={!!errors.title}
								helperText={errors.title}
							/>
							<Field
								name="location"
								as={TextField}
								variant="outlined"
								label={t('app.location')}
								error={!!errors.location}
								helperText={errors.location}
							/>
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
