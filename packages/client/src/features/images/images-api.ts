import {api} from '@lib/api';
import type {ApiResult} from '@lib/api/api-types';
import type {
  ImagesGenerateRequest,
  ImagesGenerateResult,
  ImagesListResult,
} from './images-types';

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
      invalidatesTags: result =>
        result ? [{type: 'Image', id: result.id}] : [],
    }),
    imagesList: builder.query<ImagesListResult, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: '/imagesList',
          method: 'GET',
        });
        return result as ApiResult<ImagesListResult>;
      },
      providesTags: result =>
        result?.images.map(image => ({type: 'Image', id: image.id})) || [],
    }),
  }),
});

export const {imagesList} = imagesApi.endpoints;

export const {useImagesGenerateMutation, useImagesListQuery} = imagesApi;
