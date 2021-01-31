import { uploadPhotoToBucket } from '../../data'
import { AppThunkPromise } from '../../model/types'
import { extractTextFromImage } from '../../ocr'
import { slice } from './slice'

const uploadPhoto = (dataUri: string): AppThunkPromise => async dispatch => {
	const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);
	// eslint-disable-next-line
	const [_, contentType, base64] = match || [];
	const words = await extractTextFromImage(base64);

	const response = await uploadPhotoToBucket(base64, contentType);
	const url = await response.ref.getDownloadURL();
	dispatch(slice.actions._setWords(words));
	dispatch(slice.actions._setCurrentPhotoPath(url));
};

const photosActions = {
	...slice.actions,
	uploadPhoto,
};

export default photosActions;
