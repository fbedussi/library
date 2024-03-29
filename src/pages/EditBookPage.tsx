import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BackLink from '../components/BackLink';
import BookForm from '../components/BookForm';
import {
	BottomAppBar,
	BottomBarPageWrapper,
	ToolbarStyled,
} from '../components/CommonComponents';
import { convertRead } from '../libs/search';
import { bookFormValidation } from '../libs/validation';
import { Id, FormData } from '../model/model';
import { TDispatch } from '../model/types';
import booksActions from '../store/books/actions';
import { selectBook } from '../store/books/selectors';
import { Save } from '../styleguide/icons';

const EditBookPage: React.FC = () => {
	const { bookId } = useParams<{ bookId: Id }>();
	const { t } = useTranslation();
	const dispatch: TDispatch = useDispatch();
	const book = useSelector(selectBook(bookId || ''));

	if (!book) {
		return null;
	}

	const { author, title, location, read } = book;
	const initialValues: FormData = {
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
				variant="edit"
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
