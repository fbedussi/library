import React from 'react'
import { useSelector } from 'react-redux'

import { selectBooks } from '../store/books/selectors'
import { Badge, IconButton } from '../styleguide'
import { Book } from '../styleguide/icons'
import { LinkNoStyle } from './CommonComponents'

const ViewAllLink = () => {
	const books = useSelector(selectBooks);

	return (
		<LinkNoStyle to="/view-all">
			<IconButton color="inherit" disableRipple={true}>
				<Badge badgeContent={books.length} color="secondary">
					<Book />
				</Badge>
			</IconButton>
		</LinkNoStyle>
	);
};

export default ViewAllLink;
