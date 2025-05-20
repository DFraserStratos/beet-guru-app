import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { logger } from '../../utils/logger';

const ReminderWidget = ({ onNavigate }) => {
  // Mock reminders data
  const reminders = [
    {
      id: 1,
      type: 'assessment',
      message: 'North Field assessment is due',
      action: 'Complete now',
      urgent: true,
      onActionClick: () => onNavigate('new-assessment')
    },
    {
      id: 2,
      type: 'suggestion',
      message: 'It\'s time to reassess West Paddock',
      action: 'Schedule',
      urgent: false,
      onActionClick: () => onNavigate('assessments')
    },
    {
      id: 3,
      type: 'info',
      message: 'Beet harvesting season is approaching',
      action: 'Learn more',
      urgent: false,
      onActionClick: () => logger.info('Open harvesting guide')
    }
  ];
  
  if (reminders.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      {reminders.map(reminder => (
        <div 
          key={reminder.id}
          className={`
            rounded-lg shadow-sm p-3 flex items-start
            ${reminder.urgent 
              ? 'bg-yellow-50 border-l-4 border-yellow-400' 
              : 'bg-white border-l-4 border-blue-400'}
          `}
        >
          <div className="flex-shrink-0 mr-3">
            {reminder.urgent ? (
              <AlertCircle size={20} className="text-yellow-500" />
            ) : (
              <CheckCircle2 size={20} className="text-blue-500" />
            )}
          </div>
          <div className="flex-grow">
            <p className={`text-sm ${reminder.urgent ? 'text-yellow-700' : 'text-gray-700'}`}>
              {reminder.message}
            </p>
          </div>
          {reminder.action && (
            <button 
              className={`
                text-sm font-medium ml-2 underline
                ${reminder.urgent ? 'text-yellow-700' : 'text-blue-600'}
              `}
              onClick={reminder.onActionClick}
            >
              {reminder.action}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReminderWidget;
