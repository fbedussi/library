import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import BackLink from '../components/BackLink';
import BookCard from '../components/BookCard';
import {
	PageWrapper,
	ToolbarStyled,
	TopAppBar,
} from '../components/CommonComponents';
import ViewAllLink from '../components/ViewAllLink';
import { pxToRem } from '../libs/styles';
import { selectBooks } from '../store/books/selectors';
import { Typography } from '../styleguide';
import theme from '../styleguide/theme';

const BooksList = styled.div`
	flex: 1;
	overflow: auto;
	> * {
		margin-bottom: ${pxToRem(theme.spacing(1))}rem;
	}
`;

const ViewAllPage: React.FC = () => {
	const books = useSelector(selectBooks);
	const { t } = useTranslation();

	return (
		<PageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<BackLink />
					<Typography variant="h6">{t('app.viewAll')}</Typography>
					<ViewAllLink />
				</ToolbarStyled>
			</TopAppBar>
			<BooksList>
				{books.map(book => (
					<BookCard key={book.id} book={book} />
				))}
			</BooksList>
		</PageWrapper>
	);
};

export default ViewAllPage;
