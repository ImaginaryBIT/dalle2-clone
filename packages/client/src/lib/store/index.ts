import {api} from '@lib/api';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});
