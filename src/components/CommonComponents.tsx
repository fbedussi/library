import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AppBar, Toolbar } from '../styleguide'

export const LinkNoStyle = styled(Link)`
	color: inherit;
	text-decoration: none;
`;

export const BottomAppBar = styled(AppBar)`
	top: auto;
	bottom: 0;
`;

export const ToolbarStyled = styled(Toolbar)`
	justify-content: space-between;
`;
