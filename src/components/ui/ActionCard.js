import { ChevronRight } from 'lucide-react';

const ActionCard = ({ title, description, icon, onClick, bgColor = 'bg-green-600' }) => {
  return (
    <div 
      className={`${bgColor} rounded-xl shadow p-6 text-white cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={onClick}
    >
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
    </div>
  );
};

export default ActionCard;
