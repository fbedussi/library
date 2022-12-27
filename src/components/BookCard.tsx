import { Cancel, CheckCircle, Delete, Edit } from '../styleguide/icons'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '../styleguide'

import { Book } from '../model/model'
import { LinkNoStyle } from './CommonComponents'
import React from 'react'
import booksActions from '../store/books/actions'
import styled from 'styled-components'
import theme from '../styleguide/theme'
import { useDispatch } from 'react-redux'

const StyledCard = styled(Card)`
	display: flex;
	width: 100%;
`;

const BookInfo = styled.div`
	flex: 1;
	max-width: 100%;
`;

const AuthorAndReadIcon = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${theme.palette.text.secondary};
`

const BookCardActions = styled(CardActions)`
	padding: 0;
`;

const BookCover = styled(CardMedia)`
	width: 25%;
`;

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	const dispatch = useDispatch();
	const { author, title, location, id, coverPath, read } = book;
	return (
		<StyledCard variant="outlined" className="book-card">
			<BookInfo>
				<CardContent>
					<AuthorAndReadIcon>
						{author}

						{read === false && <Cancel color="error" />}
						{read === true && <CheckCircle color="primary" />}
					</AuthorAndReadIcon>
					<LinkNoStyle to={`/book/${id}`}>
						<Typography variant="h5" component="h2" className="book-title">
							{title}
						</Typography>
					</LinkNoStyle>
					<Typography color="textSecondary">{location}</Typography>
				</CardContent>
				<BookCardActions disableSpacing>
					<IconButton
						data-testid="delete-btn"
						onClick={() => {
							dispatch(booksActions.remove(id));
						}}
					>
						<Delete />
					</IconButton>
					<LinkNoStyle to={`/edit/${id}`} data-testid="edit-link">
						<IconButton>
							<Edit />
						</IconButton>
					</LinkNoStyle>
				</BookCardActions>
			</BookInfo>
			{!!coverPath && <BookCover data-testid="book-cover" image={coverPath} />}
		</StyledCard>
	);
};

export default BookCard;
