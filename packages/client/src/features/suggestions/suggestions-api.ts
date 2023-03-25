import {api} from '@lib/api';

const suggestionsApi = api.injectEndpoints({
  endpoints: builder => ({
    suggestionsGet: builder.query<string, void>({
      query: () => ({
        url: '/suggestions',
      }),
    }),
  }),
});

export const {suggestionsGet} = suggestionsApi.endpoints;
