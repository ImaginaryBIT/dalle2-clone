import type {HttpResponseInit} from '@azure/functions';
import {app} from '@azure/functions';
import {suggestionsGetRepository} from './suggestions-repository';

export const suggestionsGet = async (): Promise<HttpResponseInit> => {
  const result = await suggestionsGetRepository();
  return {body: result};
};

app.http('suggestionsGet', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: suggestionsGet,
});
