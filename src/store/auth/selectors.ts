import { RootState } from '../../model/model'

export const selectUserId = (state: RootState) => state.auth.userId
