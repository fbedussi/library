import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AppBar } from '../styleguide'

export const LinkNoStyle = styled(Link)`
	color: inherit;
	text-decoration: none;
`;

export const BottomAppBar = styled(AppBar)`
	top: auto;
	bottom: 0;
`;
