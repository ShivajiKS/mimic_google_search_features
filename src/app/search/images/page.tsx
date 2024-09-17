import { data } from "@/data/dummyData";
import SearchResult from "@/components/searchResult";
import PaginationControls from "@/components/paginationcontrols";
type SearchProps = {
  searchParams?: { query: string | undefined };
};

export default async function Page({ searchParams }: SearchProps) {
  const startIndex = "0";
  console.log(searchParams);

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.query}&searchType=image`
  );
  if (!response.ok) throw new Error("something went wrong...");

  const data = await response.json();
  const items = data.items;
  if (items!) {
    return (
      <div className="flex flex-col justify-center w-full mt-10 space-y-5 px-3 ">
        <div>
          <div>Your search -</div>
          <p className="font-bold max-w-2xl">{"ssssssssssss"}</p>
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
      {/* <div className="mt-5 max-w-5xl text-justify ">
        <SearchResult data={data} />
      </div>
      <PaginationControls />
      <footer className="mt-4 w-full h-14 flex flex-col space-y-1 items-center justify-center ">
        <h1 className="font-bold text-xl font-sans capitalize">
          @Shivaji 2023
        </h1>
      </footer> */}
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
