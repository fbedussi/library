import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { BottomAppBar, LinkNoStyle, ToolbarStyled } from '../components/CommonComponents'
import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { Badge, Button, IconButton, TextField } from '../styleguide'
import { Book, ChevronLeft, Close, Save } from '../styleguide/icons'
import theme from '../styleguide/theme'

const PageWrapper = styled.div`
	padding: ${pxToRem(theme.spacing(1))}rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const InputWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: ${pxToRem(theme.spacing(1))}rem;
	margin-bottom: ${pxToRem(theme.spacing(1))}rem;
`;

const ButtonsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${pxToRem(theme.spacing(1))}rem;
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
`;

const AddBookPage: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const books = useSelector(selectBooks);
	const blankInputs: SearchCriteria = {
		author: '',
		title: '',
		location: '',
	};

	return (
		<PageWrapper>
			<Formik
				initialValues={blankInputs}
				validate={values => {
					return Object.entries(values).reduce((errors, [key, val]) => {
						if (!val) {
							errors[key] = t('errors.mandatoryField');
						}
						return errors;
					}, {} as { [k: string]: string | undefined });
				}}
				onSubmit={(values, { resetForm }) => {
					dispatch(booksActions.add(values));
					resetForm();
				}}
			>
				{({ errors, dirty }) => {
					return (
						<Form>
							<InputWrapper>
								<Field
									name="author"
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
									startIcon={<Save />}
									type="submit"
									disabled={!dirty}
								>
									{t('app.save')}
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

			<BottomAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<LinkNoStyle to="/">
						<IconButton edge="start" color="inherit" aria-label="open drawer">
							<ChevronLeft />
						</IconButton>
					</LinkNoStyle>

					<IconButton color="inherit" disableRipple={true}>
						<Badge badgeContent={books.length} color="secondary">
							<Book />
						</Badge>
					</IconButton>
				</ToolbarStyled>
			</BottomAppBar>
		</PageWrapper>
	);
};

export default AddBookPage;
