"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SearchOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPath = usePathname(); // usePathname hook gives the entire url path..
  const currentRoute = urlPath.split("/").pop(); // split method seperates the url path into array and pop method gives the last element.

  const queryParam = searchParams.get("query");

  const OnSelectSearchOption = (tab: string) => {
    router.push(
      `/search/${tab == "all" ? "web" : "images"}?query=${queryParam}`
    );
  };

  return (
    <nav className="flex space-x-6 px-6 mt-4 border-b border-gray-300 max-w-3xl py-3">
      <button
        className={`border-transparent rounded-xl lg:rounded-full px-5 py-2 font-medium bg-slate-100 hover:bg-slate-200 active:text-blue-500 shadow-sm hover:ring-1 hover:ring-slate-800${
          currentRoute === "web" && "font-semibold bg-blue-100 text-blue-500"
        }`}
        onClick={() => OnSelectSearchOption("all")}
      >
        <h2>All</h2>
      </button>
      <button
        onClick={() => OnSelectSearchOption("images")}
        className={`border-transparent rounded-xl lg:rounded-full px-5 py-2 font-medium bg-slate-100 hover:bg-slate-200 active:text-blue-500 shadow-sm hover:ring-1 hover:ring-slate-800${
          currentRoute === "images" && "font-semibold bg-blue-100 text-blue-500"
        }`}
      >
        <h2>Images</h2>
      </button>
    </nav>
  );
};

export default SearchOptions;
