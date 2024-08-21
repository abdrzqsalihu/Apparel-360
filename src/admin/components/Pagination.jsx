import { MoveLeft, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Pagination({ totalPages, currentPage, onPageChange }) {
  const [pages, setPages] = useState([]);

  // Generate page numbers based on total pages
  useEffect(() => {
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    setPages(pagesArray);
  }, [totalPages]);

  return (
    <div>
      <div className="mx-auto mt-12 px-6 text-gray-600 md:px-14">
        <div
          className="hidden items-center justify-between sm:flex"
          aria-label="Pagination"
        >
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-x-3 ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-400"
                : "hover:text-gray-700 hover:opacity-80"
            }`}
          >
            <MoveLeft size={17} />
            Previous
          </button>
          <ul className="flex items-center gap-1">
            {pages.map((item) => (
              <li key={item} className="text-sm">
                <button
                  aria-current={currentPage === item ? "page" : false}
                  onClick={() => onPageChange(item)}
                  className={`px-3 py-1 rounded-lg duration-150 hover:text-gray-100 hover:bg-gray-600 ${
                    currentPage === item
                      ? "bg-gray-600 text-gray-100 font-medium"
                      : ""
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-x-3 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : "hover:text-gray-700 hover:opacity-80"
            }`}
          >
            Next
            <MoveRight size={17} />
          </button>
        </div>
        {/* On mobile version */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 ${
              currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
            }`}
          >
            Previous
          </button>
          <div className="flex gap-1">
            {pages.map((item) => (
              <button
                key={item}
                aria-current={currentPage === item ? "page" : false}
                onClick={() => onPageChange(item)}
                className={`px-3 py-1 rounded-lg duration-150 ${
                  currentPage === item
                    ? "bg-gray-600 text-gray-100 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
