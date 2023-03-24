'use client';

import {useCallback, useMemo, useState} from 'react';

const GeneratorPrompt = () => {
  const [input, setInput] = useState('');

  const isGenerateDisabled = useMemo(() => {
    return input.length === 0;
  }, [input.length]);

  const onChangeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <input
          className="flex-1 p-4 outline-none rounded-md"
          value={input}
          onChange={onChangeInputHandler}
          placeholder="Enter a prompt..."
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
        <button className="p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold">
          New Suggestion
        </button>
      </form>
    </div>
  );
};

export default GeneratorPrompt;
