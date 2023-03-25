import {appReducer} from '@features/app/app-state';
import {suggestionsMiddleware} from '@features/suggestions/suggestions-middleware';
import {api} from '@lib/api';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware, suggestionsMiddleware),
});
