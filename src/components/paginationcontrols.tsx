"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PaginationControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams?.get("query") || "";
  const start = Number(searchParams?.get("start")) || 0;

  // Reusable button styles
  const buttonStyles =
    "flex space-x-0.5 items-center justify px-4 py-2 md:px-8  bg-slate-800 text-white font-semibold text-sm md:text-base rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500";

  // Pagination navigation function
  const handleNavigation = (newStart: number) => {
    router.push(`/search/web?query=${query}&start=${newStart}`);
  };

  return (
    <div className="w-full lg:max-w-2xl mt-4 px-4 mb-8 md:mb-12 ">
      <div
        className={`flex items-center space-x-4 md:space-x-0 ${
          start === 0
            ? "justify-end" // First page: align 'Next' button to the right
            : start >= 90
            ? "justify-start" // Last page: align 'Previous' button to the left
            : "justify-around" // Middle pages: evenly space both buttons
        }`}
      >
        {start >= 10 && (
          <button
            className={`${buttonStyles}`}
            onClick={() => handleNavigation(start - 10)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Previous</span>
          </button>
        )}
        {start < 90 && (
          <button
            className={`${buttonStyles}`}
            onClick={() => handleNavigation(start + 10)}
          >
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginationControls;
