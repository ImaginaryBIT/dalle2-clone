export const suggestionsGetRepository = async (): Promise<string> => {
  const response = await fetch('...', {
    cache: 'no-store',
  });

  const text = await response.text();

  return text.trim();
};
