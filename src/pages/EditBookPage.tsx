import { BottomAppBar, BottomBarPageWrapper, ToolbarStyled } from '../components/CommonComponents'
import { Id, SearchCriteriaForForm } from '../model/model'
import { useDispatch, useSelector } from 'react-redux'

import BackLink from '../components/BackLink'
import BookForm from '../components/BookForm'
import React from 'react'
import { Save } from '../styleguide/icons'
import { bookFormValidation } from '../libs/validation'
import booksActions from '../store/books/actions'
import { convertRead } from '../libs/search'
import { selectBook } from '../store/books/selectors'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const EditBookPage: React.FC = () => {
	const { bookId } = useParams<{ bookId: Id }>();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const book = useSelector(selectBook(bookId));

	if (!book) {
		return null;
	}

	const { author, title, location, read } = book;
	const initialValues: SearchCriteriaForForm = {
		author,
		title,
		location,
		read: read?.toString() || '',
	};

	return (
		<BottomBarPageWrapper>
			<BookForm
				initialValues={initialValues}
				enableReinitialize={true}
				validate={bookFormValidation(t)}
				onSubmit={values => {
					dispatch(booksActions.update(convertRead({ ...book, ...values })));
				}}
				PrimaryIcon={<Save />}
				primaryLabel={t('app.save')}
			/>

			<BottomAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<BackLink />
				</ToolbarStyled>
			</BottomAppBar>
		</BottomBarPageWrapper>
	);
};

export default EditBookPage;
