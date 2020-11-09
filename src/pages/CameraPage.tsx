import 'react-html5-camera-photo/build/css/index.css'

import React from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import { useDispatch } from 'react-redux'

import { LinkNoStyle, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import history from '../history'
import { TDispatch } from '../model/types'
import photosActions from '../store/photos/actions'
import { IconButton } from '../styleguide'
import { ChevronLeft } from '../styleguide/icons'

const CameraPage: React.FC = () => {
	const dispatch: TDispatch = useDispatch();

	return (
		<div>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<LinkNoStyle to="/add">
						<IconButton edge="start" color="inherit" aria-label="open drawer">
							<ChevronLeft />
						</IconButton>
					</LinkNoStyle>
				</ToolbarStyled>
			</TopAppBar>
			<Camera
				onTakePhoto={dataUri => {
					dispatch(photosActions.uploadPhoto(dataUri)).then(() =>
						history.push('/add'),
					);
				}}
				idealFacingMode={FACING_MODES.ENVIRONMENT}
				idealResolution={{
					width: window.innerWidth,
					height: window.innerHeight,
				}}
				imageType={IMAGE_TYPES.JPG}
				imageCompression={0.97}
				isFullscreen={true}
				isImageMirror={false}
			/>
		</div>
	);
};

export default CameraPage;
