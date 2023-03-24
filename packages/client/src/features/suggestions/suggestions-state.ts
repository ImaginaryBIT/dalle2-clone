import type {RootState} from '@lib/store/store-types';
import {suggestionsGet} from './suggestions-api';

export const suggestionsCurrentSelector = (state: RootState) =>
  suggestionsGet.select(state);
