import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Delete, Edit } from '@material-ui/icons'

import { Book } from '../model/model'
import booksActions from '../store/books/actions'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '../styleguide'
import { LinkNoStyle } from './CommonComponents'

const StyledCard = styled(Card)`
	display: grid;
	grid-template-columns: 3fr 1fr;
`;

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	const dispatch = useDispatch();
	const { author, title, location, id, coverPath } = book;
	return (
		<StyledCard variant="outlined">
			<div>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						{author}
					</Typography>
					<Typography variant="h5" component="h2">
						{title}
					</Typography>
					<Typography color="textSecondary">{location}</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						onClick={() => {
							dispatch(booksActions.remove(id));
						}}
					>
						<Delete />
					</IconButton>
					<LinkNoStyle to={`/edit/${id}`}>
						<IconButton>
							<Edit />
						</IconButton>
					</LinkNoStyle>
				</CardActions>
			</div>
			{!!coverPath && <CardMedia image={coverPath} />}
		</StyledCard>
	);
};

export default BookCard;
