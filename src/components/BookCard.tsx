import React from 'react'
import { useDispatch } from 'react-redux'

import { Delete, Edit } from '@material-ui/icons'

import { Book } from '../model/model'
import booksActions from '../store/books/actions'
import { Card, CardActions, CardContent, IconButton, Typography } from '../styleguide'
import { LinkNoStyle } from './CommonComponents'

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	const dispatch = useDispatch();
	const { author, title, location, id } = book;
	return (
		<Card variant="outlined">
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
		</Card>
	);
};

export default BookCard;
