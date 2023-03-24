import {suggestionsGetRepository} from '@features/suggestions/suggestions-repository';

export const GET = async () => {
  const result = await suggestionsGetRepository();

  const response = new Response(JSON.stringify(result), {
    status: 200,
  });

  return response;
};
