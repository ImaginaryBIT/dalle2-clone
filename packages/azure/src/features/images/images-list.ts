import type {HttpResponseInit} from '@azure/functions';
import {app} from '@azure/functions';
import {imagesListRepository} from './images-repository';

export const imagesList = async (): Promise<HttpResponseInit> => {
  const images = await imagesListRepository();

  return {
    jsonBody: {
      images,
    },
    status: 200,
  };
};

app.http('imagesList', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: imagesList,
});
