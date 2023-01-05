import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { pxToRem } from '../libs/styles'
import { AppBar, Toolbar } from '../styleguide'
import theme from '../styleguide/theme'

export const PageWrapper = styled.div`
	padding: 80px ${pxToRem(theme.spacing(2))}rem 0;
`;

export const TopBarPageWrapper = styled(PageWrapper)`
	padding-bottom: ${pxToRem(theme.spacing(2))}rem;
`;

export const BottomBarPageWrapper = styled(PageWrapper)`
	padding-top: ${pxToRem(theme.spacing(2))}rem;
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
	left: 0;
	width: min(100vw, 100%);
`;

export const ToolbarStyled = styled(Toolbar)`
	justify-content: space-between;
`;
