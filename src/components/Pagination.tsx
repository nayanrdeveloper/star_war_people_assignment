type PaginationType = {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

function Pagination({
  handlePreviousPage,
  currentPage,
  handleNextPage,
  totalPages,
}: PaginationType) {
  return (
    <div>
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        <li>
          <button className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {currentPage}
          </button>
        </li>
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
