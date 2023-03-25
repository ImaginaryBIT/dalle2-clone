'use client';

import {useImagesGenerateMutation} from '@features/images/images-api';
import {useLazySuggestionsGenerateQuery} from '@features/suggestions/suggestions-api';
import {useCallback, useMemo, useState} from 'react';

const GalleryPrompt = () => {
  const [
    suggestionsGenerateQuery,
    {
      data: suggestion,
      isLoading: isSuggestionLoading,
      isFetching: isSuggestionFetching,
    },
  ] = useLazySuggestionsGenerateQuery();

  const [imagesGenerateMutation] = useImagesGenerateMutation();

  const [input, setInput] = useState('');

  const placeholder: string = useMemo(() => {
    if (isSuggestionLoading || isSuggestionFetching) {
      return 'Loading a suggestion...';
    }

    if (suggestion?.suggestion) {
      return suggestion.suggestion;
    }

    return 'Enter a prompt';
  }, [suggestion?.suggestion, isSuggestionLoading, isSuggestionFetching]);

  const isGenerateDisabled: boolean = useMemo(() => {
    return input.length === 0;
  }, [input.length]);

  const isUseSuggestionDisabled: boolean = useMemo(() => {
    return !suggestion?.suggestion || suggestion?.suggestion === input;
  }, [suggestion?.suggestion, input]);

  const isNewSuggestionDisabled: boolean = useMemo(() => {
    return isSuggestionLoading || isSuggestionFetching;
  }, [isSuggestionLoading, isSuggestionFetching]);

  const isSuggestionVisible: boolean = useMemo(() => {
    return (
      input.length > 0 &&
      (suggestion?.suggestion || '').length > 0 &&
      (suggestion?.suggestion !== input ||
        isSuggestionLoading ||
        isSuggestionFetching)
    );
  }, [
    suggestion?.suggestion,
    input,
    isSuggestionLoading,
    isSuggestionFetching,
  ]);

  const onGenerateHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setInput('');
      await imagesGenerateMutation({
        prompt: input,
      });
    },
    [input, imagesGenerateMutation],
  );

  const onUseSuggestionHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (suggestion?.suggestion) {
        setInput(suggestion.suggestion);
      }
    },
    [suggestion?.suggestion, onGenerateHandler],
  );

  const onNewSuggestionHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      await suggestionsGenerateQuery();
    },
    [suggestionsGenerateQuery],
  );

  const onChangeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  return (
    <div>
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <input
          className="flex-1 p-8 sm:p-4 outline-none rounded-md"
          value={input}
          onChange={onChangeInputHandler}
          placeholder={placeholder}
        />
        <button
          className={`p-4 font-bold ${
            isGenerateDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'bg-violet-500 text-white transition-colors duration-200'
          }`}
          onClick={onGenerateHandler}
          disabled={isGenerateDisabled}>
          Generate
        </button>
        <button
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={onUseSuggestionHandler}
          disabled={isUseSuggestionDisabled}>
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={onNewSuggestionHandler}
          disabled={isNewSuggestionDisabled}>
          New Suggestion
        </button>
      </form>
      {isSuggestionVisible && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion: <span className="text-violet-500">{placeholder}</span>
        </p>
      )}
    </div>
  );
};

export default GalleryPrompt;
