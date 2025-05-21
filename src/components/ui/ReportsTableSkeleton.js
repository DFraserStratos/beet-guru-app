import Skeleton from './Skeleton';

const ReportsTableSkeleton = ({ rows = 3 }) => {
  const headers = [
    'Date',
    'Report Title',
    'Location',
    'Cultivar/Crop Type',
    'Season',
    'Actions'
  ];

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} min-h-[53px]`}
            >
              {headers.map((_, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTableSkeleton;
