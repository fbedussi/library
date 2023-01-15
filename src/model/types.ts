import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { RootState } from './model';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppThunkPromise<R = void> = ThunkAction<
  Promise<R>,
  RootState,
  unknown,
  Action<string>
>;

export type TDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export interface WithDispatch {
  dispatch: TDispatch;
}

export interface SvgProps {
  fill?: string;
  fontSize?: string;
  flip?: boolean;
  className?: string;
}
