import type {HttpResponseInit} from '@azure/functions';
import {app} from '@azure/functions';
import {suggestionsGetRepository} from './suggestions-repository';

export const suggestionsGenerate = async (): Promise<HttpResponseInit> => {
  const result = await suggestionsGetRepository();

  return {
    jsonBody: {
      suggestion: result,
    },
    status: 200,
  };
};

app.http('suggestionsGenerate', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: suggestionsGenerate,
});
