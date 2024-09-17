"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
const PaginationControls = () => {
  const router = useRouter();

  //   const startIndex = Number(router?.query.start) || 0;

  return (
    <div className="max-w-72 mx-24 md:mx-32 lg:mx-48 mb-20">
      {/* {startIndex >= 10 && (
        <Link href={"#"}>
          <div>
            <p>prev</p>
          </div>
        </Link>
      )}
      <Link href={`/search?q=${router.query.q}&start=${startIndex}`}>
        <div>
          <p>next</p>
        </div>
      </Link> */}
      <div className="flex space-x-6 text-md font-semibold uppercase cursor-pointer">
        <Link href={`#`} className="flex space-x-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
          <h2>Prev</h2>
        </Link>
        <Link href={`#`} className="flex space-x-1 items-center">
          <h2>Next</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PaginationControls;
