export const suggestionsGetRepository = async (): Promise<string> => {
  try {
    const response = await fetch(process.env.SUGGESTIONS_GET_API_URL, {
      method: 'GET',
    });
    const text = await response.text();
    return text.trim();
  } catch (error) {
    return JSON.stringify(error);
  }
};
