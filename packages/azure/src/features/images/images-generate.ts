import type {HttpRequest, HttpResponseInit} from '@azure/functions';
import {app} from '@azure/functions';
import * as Joi from 'joi';
import {imagesGenerateRepository} from './images-repository';

export interface ImagesGenerateRequest {
  prompt: string;
}

export const imagesGenerate = async (
  request: HttpRequest,
): Promise<HttpResponseInit> => {
  if (!request.body) {
    return {
      jsonBody: {
        error: 'Request body is required',
      },
      headers: {
        'Access-Control-Allow-Origin': process.env.CLIENT_URL,
      },
      status: 400,
    };
  }

  const json = await request.json();

  const schema = Joi.object({
    prompt: Joi.string().required(),
  });

  const {error, value} = schema.validate(json);

  if (error) {
    return {
      jsonBody: {
        error: error.message,
      },
      headers: {
        'Access-Control-Allow-Origin': process.env.CLIENT_URL,
      },
      status: 400,
    };
  }

  const body: ImagesGenerateRequest = value;

  const url = await imagesGenerateRepository(body);

  return {
    jsonBody: {
      url,
    },
    headers: {
      'Access-Control-Allow-Origin': process.env.CLIENT_URL,
    },
    status: 200,
  };
};

app.http('imagesGenerate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: imagesGenerate,
});
