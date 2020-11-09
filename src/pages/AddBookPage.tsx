import React, { DragEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookForm from '../components/BookForm'
import {
  BottomAppBar, LinkNoStyle, PageWrapper, ToolbarStyled
} from '../components/CommonComponents'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { selectCurrentPhotoPath, selectWords } from '../store/photos/selectors'
import { Badge, Button, Chip, IconButton } from '../styleguide'
import { Book, Camera, ChevronLeft, Save } from '../styleguide/icons'

const Image = styled.img`
	width: 300px;
	height: auto;
`;

const AddBookPage: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const books = useSelector(selectBooks);
	const currentPhotoUrl = useSelector(selectCurrentPhotoPath);
	// const words = useSelector(selectWords);
	const words = ['pippo', 'pluto', 'lasciateli', 'giocare'];
	const draggingWord = useRef('');
	const dragOverItem = useRef();

	const blankInputs: SearchCriteria = {
		author: '',
		title: '',
		location: '',
	};

	const onDragStart = (ev: DragEvent<HTMLDivElement>, word: string) => {
		// draggingWord.current = word;
		ev.dataTransfer.setData('text/plain', word);
	};

	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		// dragOverItem.current = position;
		console.log(e.target);
		// const listCopy = [...list];
		// console.log(draggingItem.current, dragOverItem.current);
		// const draggingItemContent = listCopy[draggingItem.current];
		// listCopy.splice(draggingItem.current, 1);
		// listCopy.splice(dragOverItem.current, 0, draggingItemContent);

		// draggingItem.current = dragOverItem.current;
		// dragOverItem.current = null;
		// setList(listCopy);
	};

	return (
		<PageWrapper>
			{/* {currentPhotoUrl ? (
				<Image src={currentPhotoUrl} alt="" />
			) : (
				<LinkNoStyle to="/camera">
					<Button variant="contained" color="primary" startIcon={<Camera />}>
						{t('app.takePhoto')}
					</Button>
				</LinkNoStyle>
			)} */}
			{words.map(word => (
				<Chip
					key={word}
					label={word}
					draggable
					onDragStart={e => onDragStart(e, word)}
					onDragOver={e => e.preventDefault()}
				/>
			))}

			<BookForm
				initialValues={blankInputs}
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
					dispatch(booksActions.add(values));
					resetForm();
				}}
				PrimaryIcon={<Save />}
				primaryLabel={t('app.save')}
			/>

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
