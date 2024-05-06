import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { pxToRem } from '../libs/styles';
import { FormData } from '../model/model';
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from '../styleguide';
import { Close } from '../styleguide/icons';
import theme from '../styleguide/theme';

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
	initialValues: FormData;
	enableReinitialize?: boolean;
	validate?: (values: FormData) => { [k: string]: string };
	onSubmit: (values: FormData, formikHelpers: FormikHelpers<FormData>) => void;
	onReset?: () => void;
	PrimaryIcon: JSX.Element;
	primaryLabel: string;
	className?: string;
	variant: 'search' | 'edit';
}

const BookForm: React.FC<Props> = ({
	initialValues,
	enableReinitialize,
	validate,
	onSubmit,
	onReset,
	PrimaryIcon,
	primaryLabel,
	className,
	variant,
}) => {
	const { t } = useTranslation();

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize={enableReinitialize}
			validate={validate}
			onSubmit={onSubmit}
			onReset={onReset}
			className={className}
		>
			{({
				handleChange,
				values,
				errors,
				handleReset,
				resetForm,
				setFieldValue,
			}) => {
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

							<Field
								id="category"
								name="category"
								as={TextField}
								variant="outlined"
								label={t('app.category')}
							/>

							{variant === 'search' && (
								<FormControlLabel
									control={
										<Checkbox
											name="showOnlyNotRead"
											onChange={(_, checked) => {
												setFieldValue('showOnlyNotRead', checked);
											}}
											checked={!!values.showOnlyNotRead}
										/>
									}
									label={t('app.notRead')}
								/>
							)}

							{variant === 'edit' && (
								<FormControl>
									<FormLabel>{t('app.read')}</FormLabel>
									<RadioGroup
										name="read"
										onChange={handleChange}
										value={values.read}
										row
									>
										<FormControlLabel
											value="true"
											control={<Radio />}
											label={t('app.yes')}
										/>
										<FormControlLabel
											value="false"
											control={<Radio />}
											label={t('app.no')}
										/>
										<FormControlLabel
											value=""
											control={<Radio />}
											label={t('app.dontKnow')}
										/>
									</RadioGroup>
								</FormControl>
							)}
						</InputWrapper>
						<ButtonsWrapper>
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={PrimaryIcon}
								type="submit"
							>
								{primaryLabel}
							</Button>
							<Button
								variant="outlined"
								color="primary"
								size="large"
								startIcon={<Close />}
								type="reset"
								onClick={() => {
									resetForm({
										values: { author: '', title: '', location: '', category: '' },
									});
									handleReset();
								}}
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
