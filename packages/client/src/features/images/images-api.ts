import {api} from '@lib/api';
import type {ApiResult} from '@lib/api/api-types';
import type {ImagesGenerateRequest, ImagesGenerateResult} from './images-types';

const imagesApi = api.injectEndpoints({
  endpoints: builder => ({
    imagesGenerate: builder.mutation<
      ImagesGenerateResult,
      ImagesGenerateRequest
    >({
      queryFn: async (arg, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/imagesGenerate',
          method: 'POST',
          body: arg,
        });
        return result as ApiResult<ImagesGenerateResult>;
      },
    }),
  }),
});

export const {useImagesGenerateMutation} = imagesApi;
