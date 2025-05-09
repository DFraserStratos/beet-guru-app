import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

const WeatherWidget = ({ isMobile = false }) => {
  // Static weather data for Oxford, Canterbury
  const weatherData = {
    location: 'Oxford, Canterbury',
    temperature: 14,
    condition: 'Light Rain',
    rainfall: '70%',
    humidity: '98%',
    wind: 'S 13 km/h'
  };
  
  // Return appropriate weather icon based on condition
  const getWeatherIcon = (condition) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('rain')) {
      return <CloudRain size={isMobile ? 24 : 32} className="text-blue-500" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud size={isMobile ? 24 : 32} className="text-gray-500" />;
    } else {
      return <Sun size={isMobile ? 24 : 32} className="text-yellow-500" />;
    }
  };
  
  if (isMobile) {
    // Compact mobile version
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{weatherData.location}</h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold mr-2">{weatherData.temperature}°C</span>
              <span className="text-sm text-gray-500">{weatherData.condition}</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-full p-2">
            {getWeatherIcon(weatherData.condition)}
          </div>
        </div>
      </div>
    );
  }
  
  // Full desktop version
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3">{weatherData.location}</h3>
      
      <div className="flex items-center justify-center mb-3">
        <div className="text-center">
          <div className="bg-blue-50 rounded-full p-3 inline-block mb-2">
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
          <div className="text-gray-500">{weatherData.condition}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <div className="font-medium">Rainfall</div>
          <div>{weatherData.rainfall}</div>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <div className="font-medium">Humidity</div>
          <div>{weatherData.humidity}</div>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <div className="font-medium">Wind</div>
          <div>{weatherData.wind}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
