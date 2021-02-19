import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookForm from '../components/BookForm'
import { LinkNoStyle, PageWrapper, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import HomeLink from '../components/HomeLink'
import ViewAllLink from '../components/ViewAllLink'
import Word from '../components/Word'
import { pxToRem } from '../libs/styles'
import { addBookFormValidation } from '../libs/validation'
import { SearchCriteria, SelectedField } from '../model/model'
import booksActions from '../store/books/actions'
import photosActions from '../store/photos/actions'
import { selectCurrentPhotoPath, selectWords } from '../store/photos/selectors'
import {
  Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography
} from '../styleguide'
import { Camera, Close, Save } from '../styleguide/icons'
import theme from '../styleguide/theme'

const CameraButtonWrapper = styled.div`
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
	text-align: center;
`;

const Instructions = styled.p`
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
`;

const ResetImageButtonWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
`;

const FieldSelection = styled(RadioGroup)`
	flex-direction: row;
`;

const WordContainer = styled.div`
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
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
	const [selectedField, setSelectedField] = useState('author' as SelectedField);
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

			<BookForm
				initialValues={initialValues}
				enableReinitialize={true}
				validate={addBookFormValidation(t)}
				onSubmit={(values, { resetForm }) => {
					dispatch(booksActions.add({ ...values, coverPath: currentPhotoUrl }));
					dispatch(photosActions.resetPhotoData());
					resetForm();
				}}
				PrimaryIcon={<Save />}
				primaryLabel={t('app.save')}
			/>

			{!!words.length && (
				<div>
					<ResetImageButtonWrapper>
						<IconButton
							data-testid="reset-photo-data-btn"
							onClick={() => {
								dispatch(photosActions.resetPhotoData());
							}}
						>
							<Close />
						</IconButton>
					</ResetImageButtonWrapper>
					<FormControl component="fieldset">
						<FormLabel component="legend">
							{t('app.autocompleteInstructions')}
						</FormLabel>
						<FieldSelection
							name="selectedField"
							value={selectedField}
							onChange={e => setSelectedField(e.target.value as SelectedField)}
						>
							<FormControlLabel
								value="author"
								control={<Radio />}
								label={t('app.author')}
							/>
							<FormControlLabel
								value="title"
								control={<Radio />}
								label={t('app.title')}
							/>
						</FieldSelection>
					</FormControl>
					<WordContainer>
						{words.map((word, index) => (
							<Word
								key={`${word}_${index}`}
								word={word}
								onClick={() => {
									setInitialValues({
										...initialValues,
										[selectedField]: initialValues[selectedField].length
											? `${initialValues[selectedField]} ${word}`
											: word,
									});
								}}
							/>
						))}
					</WordContainer>
				</div>
			)}

			{currentPhotoUrl && <Image src={currentPhotoUrl} alt="bookCover" />}
		</PageWrapper>
	);
};

export default AddBookPage;
