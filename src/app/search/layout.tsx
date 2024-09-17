import { Suspense } from "react";

import SearchOptions from "@/components/search-options";
import SearchBar from "@/components/search-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VS Search Engine",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full px-5 lg:px-40">
      <Suspense>
        <SearchBar />
      </Suspense>
      <Suspense>
        <SearchOptions />
      </Suspense>
      <div>{children}</div>
    </div>
  );
}
