import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';

import BookForm from '../components/BookForm';
import {
	LinkNoStyle,
	PageWrapper,
	ToolbarStyled,
	TopAppBar,
} from '../components/CommonComponents';
import HomeLink from '../components/HomeLink';
import ViewAllLink from '../components/ViewAllLink';
import Word from '../components/Word';
import { convertRead } from '../libs/search';
import { bookFormValidation } from '../libs/validation';
import { Book, FormData, SelectedField } from '../model/model';
import { TDispatch } from '../model/types';
import booksActions from '../store/books/actions';
import photosActions from '../store/photos/actions';
import { selectCurrentPhotoPath, selectWords } from '../store/photos/selectors';
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	Typography,
} from '../styleguide';
import { Camera, Close, Save } from '../styleguide/icons';
import styles from './addBookPage.module.css';

const AddBookPage: React.FC = () => {
	const { t } = useTranslation();

	const dispatch: TDispatch = useDispatch();

	const currentPhotoUrl = useSelector(selectCurrentPhotoPath);

	const blankInputs: FormData = {
		author: '',
		title: '',
		location: '',
		category: '',
		read: '',
	};
	const [initialValues, setInitialValues] = useState({ ...blankInputs });

	const [selectedField, setSelectedField] = useState('author' as SelectedField);

	const [lastAddedBook, setLastAddedBook] = useState<Book | undefined>();

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
				<div className={styles['camera-button-wrapper']}>
					<p className={styles.instructions}>{t('app.cameraInstructions')}</p>
					<LinkNoStyle to="/camera">
						<Button variant="contained" color="primary" startIcon={<Camera />}>
							{t('app.takePhoto')}
						</Button>
					</LinkNoStyle>
				</div>
			)}

			<BookForm
				initialValues={initialValues}
				enableReinitialize={true}
				validate={bookFormValidation(t)}
				onSubmit={(values, reset) => {
					const book = convertRead({
						...values,
						coverPath: currentPhotoUrl,
					});
					dispatch(booksActions.add(book)).then(
						newBook => newBook && setLastAddedBook(newBook),
					);
					dispatch(photosActions.resetPhotoData());
					reset();
				}}
				PrimaryIcon={<Save />}
				primaryLabel={t('app.save')}
				variant="edit"
			/>

			{!!words.length && (
				<div>
					<div className={styles['reset-image-button-wrapper']}>
						<IconButton
							data-testid="reset-photo-data-btn"
							onClick={() => {
								dispatch(photosActions.resetPhotoData());
							}}
						>
							<Close />
						</IconButton>
					</div>
					<FormControl component="fieldset">
						<FormLabel component="legend">
							{t('app.autocompleteInstructions')}
						</FormLabel>
						<RadioGroup
							className={styles['field-selection']}
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
						</RadioGroup>
					</FormControl>
					<div className={styles['word-container']}>
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
					</div>
				</div>
			)}

			{currentPhotoUrl && <img className={styles.image} src={currentPhotoUrl} alt="bookCover" />}

			{lastAddedBook && (
				<BookCard
					book={lastAddedBook}
					onDelete={() => setLastAddedBook(undefined)}
				/>
			)}
		</PageWrapper>
	);
};

export default AddBookPage;
