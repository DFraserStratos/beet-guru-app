import { useState, useMemo, useEffect } from 'react';

/**
 * Custom hook for managing pagination state and logic
 * @param {Array} data - The data array to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 10)
 * @returns {Object} Pagination state and utilities
 */
const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page data
  const currentData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  // Navigation functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  return {
    // Data
    currentData,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    startIndex: startIndex + 1, // 1-based for display
    endIndex: Math.min(endIndex, totalItems), // Actual end for display
    
    // Navigation
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    
    // State
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export default usePagination; 