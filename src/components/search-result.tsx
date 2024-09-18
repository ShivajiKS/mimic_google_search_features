"use client";

import Link from "next/link";
import React from "react";

const SearchResult = (props: any) => {
  return (
    <div>
      <p className="text-gray-600 text-md mb-3">
        About {props.data.searchInformation?.formattedTotalResults} result (
        {props.data.searchInformation?.formattedSearchTime} seconds)
      </p>

      {props?.data?.items?.map(
        ({
          title,
          link,
          formattedUrl,
          snippet,
        }: {
          title: string;
          link: string;
          formattedUrl: string;
          snippet: string;
        }) => (
          <div key={title} className="max-w-3xl pb-5">
            <div className="group">
              <Link href={formattedUrl} className="text-sm break-words">
                {formattedUrl}
              </Link>
              <Link href={link}>
                <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">
                  {title}
                </h2>
              </Link>
            </div>
            <p className="line-clamp-2">{snippet}</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchResult;
