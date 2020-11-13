import React, { useState } from 'react'
import styled from 'styled-components'

import { pxToRem } from '../libs/styles'
import { Chip } from '../styleguide'
import theme from '../styleguide/theme'

const StyledChip = styled(Chip)`
	display: inline-flex;
	margin: 0 ${pxToRem(theme.spacing(2))}rem ${pxToRem(theme.spacing(2))}rem 0;

	&.clicked {
		background-color: ${theme.palette.success.main};
	}
`;

const Word: React.FC<{ word: string; onClick: () => void }> = ({
	word,
	onClick,
}) => {
	const [clicked, setClicked] = useState(false);
	return (
		<StyledChip
			className={clicked ? 'clicked' : ''}
			label={word}
			onClick={() => {
				setClicked(true);
				onClick();
			}}
		/>
	);
};

export default Word;
