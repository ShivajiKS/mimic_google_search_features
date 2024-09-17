"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");

  const [input, setInput] = useState(queryParam);

  const onSearch = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!input) return;

    let searchTerm: string = input.trim();

    router.push(`?query=${searchTerm}`);
  };

  return (
    <div className="mt-5">
      <form
        onSubmit={onSearch}
        className="w-full max-w-[90%] sm:max-w-2xl mt-10 rounded-2xl flex items-center space-x-3 px-4 py-3 border-[1px] border-slate-300 hover:shadow-md focus-within:shadow-md transition-shadow"
      >
        <input
          type="text"
          name="search"
          placeholder="Search the web..."
          className="flex-grow text-lg focus-within:outline-none bg-transparent"
          value={input || ""}
          onChange={(event) => setInput(event.target.value)}
        />
        {/* clear the input functionality... */}
        {input && (
          <div
            onClick={() => setInput("")}
            className="hover:cursor-pointer border-r-2 pr-2.5 opacity-60"
            title="clear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}

        {/* submit button... */}
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
