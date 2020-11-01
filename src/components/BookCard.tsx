import React from 'react'

import { Book } from '../model/model'
import { Card, CardContent, Typography } from '../styleguide'

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	const { author, title, location } = book;
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
		</Card>
	);
};

export default BookCard;
