import {appMounted} from '@features/app/app-state';
import type {StoreMiddleware} from '@lib/store/store-types';
import type {AnyAction} from '@reduxjs/toolkit';
import {suggestionsGet} from './suggestions-api';

export const suggestionsMiddleware: StoreMiddleware = store => {
  return next => {
    return (action: AnyAction) => {
      const result = next(action);

      if (appMounted.match(action)) {
        store.dispatch(suggestionsGet.initiate());
      }

      return result;
    };
  };
};
