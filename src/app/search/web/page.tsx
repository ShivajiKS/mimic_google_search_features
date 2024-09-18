// "use client";

import { data } from "@/data/dummyData";
import SearchResult from "@/components/search-result";
import PaginationControls from "@/components/paginationcontrols";
type SearchParamProps = {
  searchParams?: { query: string; start?: number };
};

export default async function Page({ searchParams }: SearchParamProps) {
  const start = searchParams?.start || 0;

  if (start >= 92) {
    return (
      <div className="flex flex-col max-w-xl items-center justify-center mt-6 p-6 text-justify">
        <h2 className="text-2xl font-bold text-red-600 mb-4 tracking-tighter">
          No records found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find any more results for your search. You can try
          adjusting your query, or go back to the previous page to explore more
          results.
        </p>
      </div>
    );
  }

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env
      .API_KEY!}&cx=${process.env.CONTEXT_KEY!}&q=${
      searchParams?.query
    }&start=${start}`
  );

  if (!response.ok) throw new Error("Something went wrong...");

  const data = await response.json();

  console.log("data isssssss", data);

  const items = data?.items;

  if (!items) {
    return (
      <div className="flex flex-col justify-center w-full mt-10 space-y-5 px-4">
        <div>
          <div>Your search -</div>
          <p className="font-bold max-w-2xl">{searchParams?.query}</p>
          <p>did not match any documents.</p>
        </div>
        <div>
          <h3>Suggestions:</h3>
          <ul className="mt-4 list-disc px-10">
            <li>Make sure that all words are spelled correctly.</li>
            <li>Try different keywords.</li>
            <li>Try more general keywords.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-5 w-full lg:max-w-2xl text-justify">
        <SearchResult data={data} />
      </div>
      <PaginationControls />
    </div>
  );
}
