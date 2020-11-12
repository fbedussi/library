import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookForm from '../components/BookForm'
import { LinkNoStyle, PageWrapper, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import HomeLink from '../components/HomeLink'
import ViewAllLink from '../components/ViewAllLink'
import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import photosActions from '../store/photos/actions'
import { selectCurrentPhotoPath, selectWords } from '../store/photos/selectors'
import { Button, Chip, IconButton, Typography } from '../styleguide'
import { ArrowDownward, Camera, Save } from '../styleguide/icons'
import theme from '../styleguide/theme'

const CameraButtonWrapper = styled.div`
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
	text-align: center;
`;

const Instructions = styled.p`
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
`;

const WordRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	margin-bottom: ${pxToRem(theme.spacing(1))}rem;
	gap: ${pxToRem(theme.spacing(0.5))}rem;
	grid-template-rows: repeat(auto-fit, 2em);
	width: 100%;
`;

const ColumnLabel = styled.div`
	text-align: center;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 0.8rem;
	color: ${theme.palette.grey[500]};
`;

const Image = styled.img`
	width: 50vmin;
	max-width: 300px;
	height: auto;
	margin: 0 auto;
`;

const AddBookPage: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const currentPhotoUrl = useSelector(selectCurrentPhotoPath);
	const blankInputs: SearchCriteria = {
		author: '',
		title: '',
		location: '',
	};
	const [initialValues, setInitialValues] = useState({ ...blankInputs });
	const words = useSelector(selectWords);

	return (
		<PageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<HomeLink />
					<Typography variant="h6">{t('app.insert')}</Typography>
					<ViewAllLink />
				</ToolbarStyled>
			</TopAppBar>
			{!currentPhotoUrl && (
				<CameraButtonWrapper>
					<Instructions>{t('app.cameraInstructions')}</Instructions>
					<LinkNoStyle to="/camera">
						<Button variant="contained" color="primary" startIcon={<Camera />}>
							{t('app.takePhoto')}
						</Button>
					</LinkNoStyle>
				</CameraButtonWrapper>
			)}
			{!!words.length && (
				<WordRow>
					<ColumnLabel>{t('app.author')}</ColumnLabel>
					<div></div>
					<ColumnLabel>{t('app.title')}</ColumnLabel>
				</WordRow>
			)}
			{words.map((word, index) => (
				<WordRow key={index}>
					<IconButton
						color="primary"
						onClick={() =>
							setInitialValues({
								...initialValues,
								author: initialValues.author.length
									? `${initialValues.author} ${word}`
									: word,
							})
						}
					>
						<ArrowDownward />
					</IconButton>
					<Chip key={word} label={word} />
					<IconButton
						color="primary"
						onClick={() =>
							setInitialValues({
								...initialValues,
								title: initialValues.title.length
									? `${initialValues.title} ${word}`
									: word,
							})
						}
					>
						<ArrowDownward />
					</IconButton>
				</WordRow>
			))}

			<BookForm
				initialValues={initialValues}
				enableReinitialize={true}
				validate={values => {
					return Object.entries(values).reduce((errors, [key, val]) => {
						if (!val) {
							errors[key] = t('errors.mandatoryField');
						}
						return errors;
					}, {} as { [k: string]: string });
				}}
				onSubmit={(values, { resetForm }) => {
					dispatch(booksActions.add({ ...values, coverPath: currentPhotoUrl }));
					dispatch(photosActions.resetPhotoData());
					resetForm();
				}}
				PrimaryIcon={<Save />}
				primaryLabel={t('app.save')}
			/>

			{currentPhotoUrl && <Image src={currentPhotoUrl} alt="" />}
		</PageWrapper>
	);
};

export default AddBookPage;
