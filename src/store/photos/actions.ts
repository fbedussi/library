import { uploadPhotoToBucket } from '../../data'
import { AppThunkPromise } from '../../model/types'
import { extractTextFromImage } from '../../ocr'
import { slice } from './slice'

const uploadPhoto = (dataUri: string): AppThunkPromise => dispatch => {
	const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);
	const [_, contentType, base64] = match || [];
	extractTextFromImage(base64).then(words =>
		dispatch(slice.actions._setWords(words)),
	);
	return uploadPhotoToBucket(base64, contentType).then(response =>
		response.ref.getDownloadURL().then(url => {
			dispatch(slice.actions._setCurrentPhotoPath(url));
		}),
	);
};

const photosActions = {
	...slice.actions,
	uploadPhoto,
};

export default photosActions;
