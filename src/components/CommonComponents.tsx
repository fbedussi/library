import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { pxToRem } from '../libs/styles'
import { AppBar, Toolbar } from '../styleguide'
import theme from '../styleguide/theme'

export const PageWrapper = styled.div`
	padding: ${pxToRem(theme.spacing(2))}rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const LinkNoStyle = styled(Link)`
	color: inherit;
	text-decoration: none;
`;

export const BottomAppBar = styled(AppBar)`
	top: auto;
	bottom: 0;
`;

export const TopAppBar = styled(AppBar)`
	top: 0;
	bottom: auto;
`;

export const ToolbarStyled = styled(Toolbar)`
	justify-content: space-between;
`;
