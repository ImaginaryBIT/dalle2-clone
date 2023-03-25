import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export type ApiResult<T> = QueryReturnValue<
  T,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>;
