import React from 'react'

import history from '../history'
import { IconButton } from '../styleguide'
import { Search } from '../styleguide/icons'

const HomeLink = () => {
	return (
		<IconButton
			edge="start"
			color="inherit"
			aria-label="open drawer"
			onClick={() => history.push('/')}
		>
			<Search />
		</IconButton>
	);
};

export default HomeLink;
