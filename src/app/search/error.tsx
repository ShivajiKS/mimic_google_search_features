"use client";

import React from "react";

const Error = ({ error, reset }: { error: any; reset: any }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-20 px-3 space-y-5 lg:space-y-8  ">
      <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold capitalize">
        something went wrong...
      </h2>
      <button className="text-blue-400 text-lg capitalize" onClick={reset}>
        try again
      </button>
    </div>
  );
};

export default Error;
