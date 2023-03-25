import {api} from '@lib/api';
import {ApiResult} from '@lib/api/api-types';
import {SuggestionsGetResult} from './suggestions-types';

const suggestionsApi = api.injectEndpoints({
  endpoints: builder => ({
    suggestionsGet: builder.query<SuggestionsGetResult, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: process.env.NEXT_PUBLIC_SUGGESTIONS_GET_API_URL,
          method: 'GET',
        });
        return result as ApiResult<SuggestionsGetResult>;
      },
    }),
  }),
});

export const {suggestionsGet} = suggestionsApi.endpoints;

export const {useSuggestionsGetQuery} = suggestionsApi;
