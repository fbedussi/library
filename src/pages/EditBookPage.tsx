import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BookForm from '../components/BookForm'
import { BottomAppBar, BottomBarPageWrapper, ToolbarStyled } from '../components/CommonComponents'
import history from '../history'
import { Id, SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBook } from '../store/books/selectors'
import { IconButton } from '../styleguide'
import { ChevronLeft, Save } from '../styleguide/icons'

const EditBookPage: React.FC = () => {
	const { bookId } = useParams<{ bookId: Id }>();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const book = useSelector(selectBook(bookId));

	if (!book) {
		return null;
	}

	const { author, title, location } = book;
	const initialValues: SearchCriteria = {
		author,
		title,
		location,
	};

	return (
		<BottomBarPageWrapper>
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
					dispatch(booksActions.update({ ...book, ...values }));
				}}
				PrimaryIcon={<Save />}
				primaryLabel={t('app.save')}
			/>

			<BottomAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={() => history.goBack()}
					>
						<ChevronLeft />
					</IconButton>
				</ToolbarStyled>
			</BottomAppBar>
		</BottomBarPageWrapper>
	);
};

export default EditBookPage;
