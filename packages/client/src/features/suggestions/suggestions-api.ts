import {api} from '@lib/api';
import {ApiResult} from '@lib/api/api-types';
import {SuggestionsGenerateResult} from './suggestions-types';

const suggestionsApi = api.injectEndpoints({
  endpoints: builder => ({
    suggestionsGenerate: builder.query<SuggestionsGenerateResult, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/suggestionsGenerate',
          method: 'GET',
        });
        return result as ApiResult<SuggestionsGenerateResult>;
      },
    }),
  }),
});

export const {useLazySuggestionsGenerateQuery} = suggestionsApi;
