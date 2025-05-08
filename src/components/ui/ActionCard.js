import { ChevronRight } from 'lucide-react';

const ActionCard = ({ title, description, icon, onClick, bgColor = 'bg-green-600', isMobile = false }) => {
  return (
    <div 
      className={`${bgColor} rounded-xl shadow text-white cursor-pointer hover:opacity-90 transition-opacity ${isMobile ? 'p-4' : 'p-6'}`}
      onClick={onClick}
    >
      {isMobile ? (
        // Mobile version - horizontal layout
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3 flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-base">{title}</h3>
            <p className="text-white text-opacity-80 text-sm">{description}</p>
          </div>
          <ChevronRight size={20} className="flex-shrink-0 ml-2" />
        </div>
      ) : (
        // Desktop version - vertical layout
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg">{title}</h3>
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              {icon}
            </div>
          </div>
          <p className="text-white text-opacity-80">{description}</p>
          <div className="mt-4 flex justify-end">
            <ChevronRight size={20} />
          </div>
        </>
      )}
    </div>
  );
};

export default ActionCard;
