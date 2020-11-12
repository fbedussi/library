import React from 'react'

import history from '../history'
import { IconButton } from '../styleguide'
import { ChevronLeft } from '../styleguide/icons'

const BackLink = () => {
	return (
		<IconButton
			edge="start"
			color="inherit"
			aria-label="open drawer"
			onClick={() => history.goBack()}
		>
			<ChevronLeft />
		</IconButton>
	);
};

export default BackLink;
