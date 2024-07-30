/* eslint-disable no-unused-vars */
import { useState } from "react";

function Pagination() {
  // eslint-disable-next-line no-sparse-arrays
  const [pages, setPages] = useState(["1", "2", "3", "4", "5"]);
  const [currentPage, setCurrentPage] = useState("1");
  return (
    <div>
      <div className="mx-auto mt-12 px-6 text-gray-600 md:px-14">
        <div
          className="hidden items-center justify-between sm:flex"
          aria-label="Pagination"
        >
          <a
            href="javascript:void(0)"
            className="hover:text-gray-700 hover:opacity-80 flex items-center gap-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </a>
          <ul className="flex items-center gap-1">
            {pages.map((item, idx) => (
              <li key={idx} className="text-sm">
                {item == "..." ? (
                  <div>{item}</div>
                ) : (
                  <a
                    href="javascript:void(0)"
                    aria-current={currentPage == item ? "page" : false}
                    className={`px-3 py-1 rounded-lg duration-150 hover:text-gray-100 hover:bg-gray-600 ${
                      currentPage == item
                        ? "bg-gray-600 text-gray-100 font-medium"
                        : ""
                    }`}
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <a
            href="javascript:void(0)"
            className="hover:text-gray-700 hover:opacity-80 flex items-center gap-x-2"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        {/* On mobile version */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
          <a
            href="javascript:void(0)"
            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          >
            Previous
          </a>
          <div className="font-medium">
            Page {currentPage} of {pages.length}
          </div>
          <a
            href="javascript:void(0)"
            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
