"use client";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log("error", error);
  return (
    <div className="flex flex-col justify-center items-center w-full mt-10 px-4 lg:px-8 space-y-5 lg:space-y-8 max-w-2xl  text-center">
      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-600 tracking-tight">
        Oops! Something went wrong...
      </h2>
      <p className="text-sm md:text-lg lg:text-xl text-gray-600 text-justify tracking-tight">
        It looks like there was an issue with the information you provided.
        Please check your input and try again.
      </p>
      <button
        className="px-8 py-2 bg-slate-700 text-white font-semibold rounded-full shadow-lg hover:bg-slate-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
