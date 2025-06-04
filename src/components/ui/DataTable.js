import React from 'react';
import Pagination from './Pagination';

/**
 * Generic table component with optional mobile card layout and pagination
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of row objects
 * @param {Array} props.columns - Column definitions { key, label, render?, hideOnMobile? }
 * @param {Function} props.onRowClick - Row click handler
 * @param {JSX.Element|string} props.emptyMessage - Message or element when no data
 * @param {boolean} props.mobileCardLayout - Render mobile card layout instead of table
 * @param {Function} props.renderMobileCard - Custom renderer for mobile card layout
 * @param {Object} props.pagination - Optional pagination object from usePagination hook
 * @param {boolean} props.isMobile - Mobile view flag for pagination
 * @returns {JSX.Element}
 */
const DataTable = ({
  data = [],
  columns = [],
  onRowClick = () => {},
  emptyMessage = 'No data available',
  mobileCardLayout = false,
  renderMobileCard = null,
  pagination = null,
  isMobile = false
}) => {
  // Use paginated data if pagination is provided, otherwise use all data
  const displayData = pagination ? pagination.currentData : data;

  if (!data || data.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {typeof emptyMessage === 'string' ? (
            <div className="p-6 text-center text-gray-500">{emptyMessage}</div>
          ) : (
            emptyMessage
          )}
        </div>
      </div>
    );
  }

  if (mobileCardLayout) {
    // Filter columns to show only non-mobile-hidden ones
    const visibleColumns = columns.filter(column => !column.hideOnMobile);
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {displayData.map((item, index) => (
              <li
                key={item.id || index}
                className="hover:bg-gray-50"
                onClick={() => onRowClick(item)}
              >
                <div className="p-4">
                  {renderMobileCard ? (
                    renderMobileCard(item)
                  ) : (
                    <>
                      <h3 className="font-medium text-base text-gray-900 line-clamp-1 mb-1">
                        {item.title || `Item ${index + 1}`}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1 mb-3">
                        {visibleColumns.map((column) => (
                          <p key={column.key}>
                            {column.label}: {column.render ? column.render(item) : item[column.key]}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Render pagination if provided */}
        {pagination && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            onPageChange={pagination.goToPage}
            onPrevPage={pagination.goToPrevPage}
            onNextPage={pagination.goToNextPage}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            isMobile={isMobile}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${isMobile ? 'px-3 py-2' : 'px-6 py-3'} text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData.map((item, index) => (
              <tr
                key={item.id || index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${onRowClick ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
                onClick={() => onRowClick(item)}
              >
                {columns.map((column) => (
                  <td 
                    key={`${item.id}-${column.key}`} 
                    className={`${isMobile ? 'px-3 py-3' : 'px-6 py-4'} ${isMobile ? 'text-sm' : 'whitespace-nowrap text-sm'} text-gray-900`}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Render pagination if provided */}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          onPageChange={pagination.goToPage}
          onPrevPage={pagination.goToPrevPage}
          onNextPage={pagination.goToNextPage}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default DataTable;
