import type {HttpResponseInit} from '@azure/functions';
import {app} from '@azure/functions';
import {suggestionsGetRepository} from './suggestions-repository';

export const suggestionsGet = async (): Promise<HttpResponseInit> => {
  const result = await suggestionsGetRepository();

  return {
    jsonBody: {
      suggestion: result,
    },
    headers: {
      'Access-Control-Allow-Origin': process.env.CLIENT_URL,
    },
    status: 200,
  };
};

app.http('suggestionsGet', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: suggestionsGet,
});
