import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { PersonType, StarWarPeoplesHookType } from "../types";

function useStarWarPeoples(): StarWarPeoplesHookType {
  const [peoples, setPeoples] = useState<PersonType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("");
  const [sortField, setSortField] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const peopleResponse = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPage}&search=${searchQuery}`
      );
      setPeoples(peopleResponse.data.results);
      setTotalPages(Math.ceil(peopleResponse.data.count / 10));
    } catch (error) {
      console.log("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  const handleSort = (field: string) => {
    const sortedPeoples = [...peoples];
    if (sortField === field && sortType === "asc") {
      sortedPeoples.sort((a, b) => b[field].localeCompare(a[field]));
      setSortType("desc");
    } else {
      sortedPeoples.sort((a, b) => a[field].localeCompare(b[field]));
      setSortType("asc");
    }
    setSortField(field);
    setPeoples(sortedPeoples);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
    setCurrentPage(1);
    setSortType("");
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, fetchData]);

  return {
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
  };
}

export default useStarWarPeoples;