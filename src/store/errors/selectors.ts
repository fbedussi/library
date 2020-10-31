import { RootState } from '../../model/model'

export const selectHttpErrors = (state: RootState) => state.errors.http
export const selectUiErrors = (state: RootState) => state.errors.ui
