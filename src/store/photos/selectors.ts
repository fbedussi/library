import { RootState } from '../../model/model';

export const selectCurrentPhotoPath = (state: RootState) =>
  state.photos.currentPhotoPath;

export const selectWords = (state: RootState) => state.photos.words;
