import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, StoreDispatch} from './store-types';

export const useStoreDispatch: () => StoreDispatch = () =>
  useDispatch<StoreDispatch>();

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
