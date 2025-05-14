import { useState } from 'react';

const SeasonalTimeline = ({ isSimplified = false }) => {
  // Current month (1-12)
  const currentMonth = new Date().getMonth() + 1;
  
  // Define seasons for fodder beet in Canterbury, NZ
  const seasons = [
    { id: 'planting', name: 'Planting', months: [10, 11], color: 'bg-amber-500' },
    { id: 'growing', name: 'Growing', months: [12, 1, 2, 3, 4], color: 'bg-green-500' },
    { id: 'harvesting', name: 'Harvesting', months: [5, 6, 7, 8, 9], color: 'bg-purple-500' },
  ];
  
  // Month names
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Determine if a month is in a particular season
  const isMonthInSeason = (month, seasonMonths) => {
    return seasonMonths.includes(month);
  };
  
  // Determine if a month is the current month
  const isCurrentMonth = (month) => {
    // Month is 1-indexed in our data, but Date().getMonth() is 0-indexed
    return month === currentMonth;
  };
  
  return (
    <div className="w-full">
      {!isSimplified && (
        <div className="mb-2 flex justify-between">
          {seasons.map(season => (
            <div key={season.id} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${season.color} mr-1`}></div>
              <span className="text-xs font-medium">{season.name}</span>
            </div>
          ))}
        </div>
      )}
      
      {isSimplified && (
        <div className="mb-2 flex items-center space-x-4">
          {seasons.map(season => (
            <div key={season.id} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${season.color} mr-1`}></div>
              <span className="text-xs font-medium">{season.name}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-12 gap-1">
        {monthNames.map((month, index) => {
          // Convert to 1-indexed month for our data
          const monthNum = index + 1;
          
          // Find which season this month belongs to (if any)
          const season = seasons.find(s => isMonthInSeason(monthNum, s.months));
          
          return (
            <div 
              key={month} 
              className={`
                rounded text-center py-1
                ${season ? season.color : 'bg-gray-200'} 
                ${isCurrentMonth(monthNum) ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              <span className={`text-xs font-medium ${season ? 'text-white' : 'text-gray-600'}`}>
                {month}
              </span>
            </div>
          );
        })}
      </div>
      
      {!isSimplified && (
        <div className="mt-2 text-xs text-gray-500">
          <p>Typical season for fodder beet in Canterbury, NZ</p>
        </div>
      )}
    </div>
  );
};

export default SeasonalTimeline;