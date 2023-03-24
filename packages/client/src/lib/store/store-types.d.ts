import type {
  AnyAction,
  Dispatch,
  Middleware,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {rootReducer} from '.';

export type RootState = ReturnType<typeof rootReducer>;

export type StoreDispatch = Dispatch<AnyAction> &
  ThunkDispatch<RootState, void, AnyAction>;

export type StoreMiddleware = Middleware<{}, RootState, StoreDispatch>;
