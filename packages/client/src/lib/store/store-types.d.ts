import type {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';
import {rootReducer} from '.';

export type RootState = ReturnType<typeof rootReducer>;

export type StoreDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, void, AnyAction>;
