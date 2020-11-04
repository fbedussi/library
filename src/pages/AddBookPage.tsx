import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import BookForm from '../components/BookForm'
import {
  BottomAppBar, LinkNoStyle, PageWrapper, ToolbarStyled
} from '../components/CommonComponents'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { Badge, IconButton } from '../styleguide'
import { Book, ChevronLeft, Save } from '../styleguide/icons'

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
			<BookForm
				initialValues={blankInputs}
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
