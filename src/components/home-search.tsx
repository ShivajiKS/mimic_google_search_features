"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [inputQuery, setInputQuery] = useState<string>("");
  const [randomSearchLoading, setRandomSearchLoading] =
    useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isVisibleList, setIsVisibleList] = useState(false);

  // Use a ref to persist the cache and abort controller
  const cache = useRef<Map<string, string[]>>(new Map());
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!inputQuery) return;

    // Check if the inputQuery exists in the cache
    if (cache.current.has(inputQuery)) {
      setRecommendations(cache.current.get(inputQuery)!);
      console.log("Loaded from cache:", cache.current.get(inputQuery));
      return;
    }

    // Abort the previous request if still in progress
    if (abortController.current) {
      abortController.current.abort();
    }

    // Create a new AbortController for the current request
    const controller = new AbortController();
    abortController.current = controller;

    const timer = setTimeout(async () => {
      try {
        // Fetch recommendations with the signal for cancellation
        const res = await fetch(
          `https://www.google.com/complete/search?client=firefox&q=${inputQuery}`,
          {
            signal: controller.signal,
          }
        );

        const json = await res.json();

        const fetchedRecommendations = json[1];

        setRecommendations(fetchedRecommendations);

        // Cache the fetched recommendations
        cache.current.set(inputQuery, fetchedRecommendations);
        console.log("Fetched from API and cached:", fetchedRecommendations);
      } catch (error) {
        if (error) {
          console.log("Request aborted for:", inputQuery);
        } else {
          console.error("Error fetching recommendations:", error);
        }
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      abortController.current = null; // Clear the abort controller after use
    };
  }, [inputQuery]);

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputQuery) return;

    router.push(`/search/web?query=${inputQuery.trim()}`);
  };

  const onGenerateRandomWord = async () => {
    setRandomSearchLoading(true);
    try {
      const res = await fetch("https://random-word-api.herokuapp.com/word");
      const randomWord = await res.json();

      if (!randomWord) return;

      setInputQuery(""); // Clear the input
      router.push(`/search/web?query=${randomWord.at(0)}`);
    } catch (error) {
      console.log(error);
    } finally {
      setRandomSearchLoading(false);
    }
  };

  const onInputBlur = () => {
    setTimeout(() => setIsVisibleList(false), 200);
  };

  // Handle manual navigation when clicking on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search/web?query=${encodeURIComponent(suggestion.trim())}`);
    setIsVisibleList(false); // Hide the suggestion list
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={onSearch} className="w-full group absolute">
          <div className="w-full max-w-[90%] sm:max-w-[600px] mx-auto mt-10 rounded-2xl flex items-center space-x-3 px-4 py-3 border-[1px] border-slate-300 hover:shadow-md focus-within:shadow-md transition-shadow focus-within:rounded-br-none focus-within:rounded-bl-none">
            <input
              type="text"
              placeholder="Search the web..."
              name="search"
              className="flex-grow text-base font-medium px-2 focus-within:outline-none bg-none"
              autoFocus
              autoComplete="off"
              value={inputQuery}
              onChange={(event) => setInputQuery(event.target.value)}
              onFocus={() => setIsVisibleList(true)}
              onBlur={onInputBlur}
            />
            {inputQuery && (
              <div
                onClick={() => setInputQuery("")}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 opacity-30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {recommendations.length > 0 && isVisibleList && (
            <div className="w-full max-w-[90%] sm:max-w-[600px] mx-auto h-96 bg-gray-50 rounded-br-2xl rounded-bl-2xl border-[1px] border-slate-300 border-t-0 drop-shadow-md px-4 py-3">
              {recommendations.map((item: string) => (
                <div
                  key={item}
                  className="p-1 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(item)} // Use mouse down to trigger before blur
                >
                  <h1>{item}</h1>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 justify-center items-center md:items-start w-full">
            <button
              type="submit"
              disabled={!inputQuery}
              className="bg-[#f8f9fa] rounded-md text-sm text-gary-800 hover:ring-gray-200 focus:outline-none active:ring-gary-300 hover:shadow-md px-5 h-10 w-32 capitalize"
            >
              search
            </button>
            <button
              className="bg-[#f8f9fa] rounded-md text-sm text-gary-800 hover:ring-gray-200 focus:outline-none active:ring-gary-300 hover:shadow-md px-3 h-10 w-40"
              onClick={onGenerateRandomWord}
            >
              {randomSearchLoading ? "Loading" : "I'm Feeling Lucky"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
