import 'react-html5-camera-photo/build/css/index.css'

import React from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import BackLink from '../components/BackLink'
import { PageWrapper, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import { TDispatch } from '../model/types'
import photosActions from '../store/photos/actions'

const CameraPage: React.FC = () => {
	const dispatch: TDispatch = useDispatch();

	const navigate = useNavigate();

	return (
		<PageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<BackLink />
				</ToolbarStyled>
			</TopAppBar>
			<Camera
				onTakePhoto={dataUri => {
					dispatch(photosActions.uploadPhoto(dataUri)).then(() =>
						navigate('/add'),
					);
				}}
				idealFacingMode={FACING_MODES.ENVIRONMENT}
				imageType={IMAGE_TYPES.JPG}
				imageCompression={0.97}
				isFullscreen={false}
				isImageMirror={false}
			/>
		</PageWrapper>
	);
};

export default CameraPage;
