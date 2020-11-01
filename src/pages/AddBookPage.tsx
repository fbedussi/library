import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BottomAppBar, LinkNoStyle } from '../components/CommonComponents'
import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import { Button, IconButton, TextField, Toolbar } from '../styleguide'
import { ChevronLeft, Close, Save } from '../styleguide/icons'
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
	const blankInputs: SearchCriteria = {
		author: '',
		title: '',
		location: '',
	};
	const { t } = useTranslation();

	return (
		<PageWrapper>
			<Formik initialValues={blankInputs} onSubmit={values => {}}>
				{() => {
					return (
						<Form>
							<InputWrapper>
								<Field
									name="author"
									variant="outlined"
									as={TextField}
									label={t('app.author')}
								/>
								<Field
									name="title"
									variant="outlined"
									as={TextField}
									label={t('app.title')}
								/>
								<Field
									name="location"
									as={TextField}
									variant="outlined"
									label={t('app.location')}
								/>
							</InputWrapper>
							<ButtonsWrapper>
								<Button
									variant="contained"
									color="primary"
									size="large"
									startIcon={<Save />}
									type="submit"
								>
									{t('app.save')}
								</Button>
								<Button
									variant="outlined"
									color="primary"
									size="large"
									startIcon={<Close />}
									type="reset"
								>
									{t('app.reset')}
								</Button>
							</ButtonsWrapper>
						</Form>
					);
				}}
			</Formik>

			<BottomAppBar position="fixed" color="primary">
				<Toolbar>
					<LinkNoStyle to="/">
						<IconButton edge="start" color="inherit" aria-label="open drawer">
							<ChevronLeft />
						</IconButton>
					</LinkNoStyle>
				</Toolbar>
			</BottomAppBar>
		</PageWrapper>
	);
};

export default AddBookPage;
