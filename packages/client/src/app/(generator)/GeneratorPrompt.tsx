'use client';

import {useSuggestionsGetQuery} from '@features/suggestions/suggestions-api';
import {useCallback, useMemo, useState} from 'react';

const GeneratorPrompt = () => {
  const {data, isLoading, isFetching, refetch} = useSuggestionsGetQuery();

  const [input, setInput] = useState('');

  const placeholder: string = useMemo(() => {
    if (isLoading || isFetching) {
      return 'Loading a suggestion...';
    }

    if (data?.suggestion) {
      return data.suggestion;
    }

    return 'Enter a prompt';
  }, [data?.suggestion, isLoading, isFetching]);

  const isGenerateDisabled: boolean = useMemo(() => {
    return input.length === 0;
  }, [input.length]);

  const onNewSuggestionHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      await refetch();
    },
    [refetch],
  );

  const onChangeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  return (
    <div className="sm:m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <input
          className="flex-1 p-4 outline-none rounded-md"
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
          disabled={isGenerateDisabled}
          type="submit">
          Generate
        </button>
        <button
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button">
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          onClick={onNewSuggestionHandler}>
          New Suggestion
        </button>
      </form>
      {!isGenerateDisabled && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion: <span className="text-violet-500">{placeholder}</span>
        </p>
      )}
    </div>
  );
};

export default GeneratorPrompt;
