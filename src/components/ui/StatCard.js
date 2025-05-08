const StatCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-end">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <span className={`ml-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
