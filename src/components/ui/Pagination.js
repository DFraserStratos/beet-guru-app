import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

/**
 * Pagination component with mobile-friendly design
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.totalItems - Total number of items
 * @param {number} props.startIndex - Starting index of current page items
 * @param {number} props.endIndex - Ending index of current page items
 * @param {Function} props.onPageChange - Page change handler
 * @param {Function} props.onPrevPage - Previous page handler
 * @param {Function} props.onNextPage - Next page handler
 * @param {boolean} props.hasNextPage - Whether there's a next page
 * @param {boolean} props.hasPrevPage - Whether there's a previous page
 * @param {boolean} props.isMobile - Mobile view flag
 * @returns {JSX.Element} Rendered component
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onPrevPage,
  onNextPage,
  hasNextPage,
  hasPrevPage,
  isMobile = false
}) => {
  // Don't render if there's only one page or no data
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = isMobile ? 1 : 2; // Show fewer pages on mobile
    const range = [];
    const rangeWithDots = [];

    // Calculate range around current page
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page and dots if needed
    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push('...');
      }
    }

    // Add main range
    rangeWithDots.push(...range);

    // Add last page and dots if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  if (isMobile) {
    // Mobile layout: compact with essential controls
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">
            {startIndex}-{endIndex} of {totalItems}
          </span>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevPage}
            disabled={!hasPrevPage}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
              hasPrevPage
                ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                : 'text-gray-400 bg-gray-50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-1">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      page === currentPage
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={onNextPage}
            disabled={!hasNextPage}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
              hasNextPage
                ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                : 'text-gray-400 bg-gray-50 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    );
  }

  // Desktop layout: full pagination controls
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex} to {endIndex} of {totalItems} results
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevPage}
            disabled={!hasPrevPage}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
              hasPrevPage
                ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                : 'text-gray-400 bg-gray-50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 py-2">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium min-w-[40px] ${
                      page === currentPage
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={onNextPage}
            disabled={!hasNextPage}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
              hasNextPage
                ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                : 'text-gray-400 bg-gray-50 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination; 