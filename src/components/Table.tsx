import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faQuestionCircle,
  faExclamationCircle,
  faSpinner,
  faWarning,
  faMobileAndroid,
} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import { tableCellList } from "../constants";
import useStarWarPeoples from "../hooks/useStarWarPeoples";
import THeadingCell from "./THeadingCell";

function Table() {
  const {
    peoples,
    currentPage,
    totalPages,
    loading,
    error,
    sortType,
    sortField,
    searchQuery,
    handleSort,
    handlePreviousPage,
    handleNextPage,
    handleSearch,
  } = useStarWarPeoples();
  return (
    <div className="px-4 py-4">
      <SearchInput
        htmlFor="people-search"
        label="Search"
        name="search-people"
        onChange={handleSearch}
        placeholder="Search Starwar People"
        type="search"
        value={searchQuery}
      />
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {tableCellList.map((tableCell, index: number) => {
                return (
                  <THeadingCell
                    key={index}
                    name={tableCell.name}
                    sortField={tableCell.sortField}
                    sortType={sortType}
                    handleSort={handleSort}
                  />
                );
              })}
            </tr>
          </thead>
          {!loading && !error && peoples.length > 0 && (
            <tbody className="text-gray-600 text-sm font-light">
              {peoples.map((people: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {tableCellList.map((tableCell, index: number) => {
                      return (
                        <td className="py-3 px-6 text-left">
                          {people[tableCell.sortField]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {!loading && !error && peoples.length === 0 && (
          <div className="flex flex-col items-center justify-center py-3 text-red-600">
            <FontAwesomeIcon icon={faWarning} className="text-red-600" />
            <p className="font-medium text-xl">No results found.</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-3 text-orange-700">
            {" "}
            <FontAwesomeIcon icon={faSpinner} spin className="text-4xl" />{" "}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-3 text-red-600">
            {" "}
            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Table;
