import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../components/Colleges/Filter";
import Card from "../components/Colleges/Card";
import Pagination from "../components/Colleges/Pagination";

const CollegesPage = () => {
  // Consolidated filter state (matches APIFeatures query parameters)
  const [filters, setFilters] = useState({
    keyword: "",
    state: "",
    course: "",
    dept: "",
    naac: "",
    nba: "",
    sort: "",
    page: 1,
    limit: 10, // default limit per page
  });

  const [colleges, setColleges] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  // Fetch colleges whenever filters change
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError(null);
      try {
        // Filter out keys with empty string values
        const filteredParams = Object.fromEntries(
          Object.entries(filters).filter(
            ([key, value]) =>
              value !== "" && value !== null && value !== undefined
          )
        );

        const response = await axios.get(
          "http://localhost:8080/dashboard/college",
          {
            params: filteredParams,
          }
        );
        // Assuming API returns { success, count, warning, colleges }
        setColleges(response.data.colleges);
        setTotalCount(response.data.count);
        setWarning(response.data.warning || null);
      } catch (err) {
        setError("Failed to fetch colleges. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [filters]);

  // Update filters (and reset page to 1 on change)
  const updateFilter = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter, page: 1 }));
  };

  // Handle page changes from Pagination component
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      <Filter filters={filters} updateFilter={updateFilter} />
      {loading && <div className="text-center my-4">Loading...</div>}
      {error && <div className="text-center my-4 text-red-600">{error}</div>}
      {warning && (
        <div className="text-center my-4 text-orange-600">{warning}</div>
      )}
      <Card colleges={colleges} />
      <Pagination
        currentPage={filters.page}
        totalPages={Math.ceil(totalCount / filters.limit)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CollegesPage;
