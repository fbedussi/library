import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import BackLink from '../components/BackLink'
import BookCard from '../components/BookCard'
import { PageWrapper, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import { pxToRem } from '../libs/styles'
import { selectBooks } from '../store/books/selectors'
import { Badge, IconButton, Typography } from '../styleguide'
import { Book } from '../styleguide/icons'
import theme from '../styleguide/theme'

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
					<IconButton color="inherit" disableRipple={true}>
						<Badge badgeContent={books.length} color="secondary">
							<Book />
						</Badge>
					</IconButton>
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
