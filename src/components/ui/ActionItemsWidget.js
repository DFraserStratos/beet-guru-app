import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Info, X, Settings, Edit } from 'lucide-react';
import { logger } from '../../utils/logger';
import Card from './Card';

const ActionItemsWidget = ({ onNavigate }) => {
  // Mock action items data with new types
  const initialActionItems = [
    {
      id: 1,
      type: 'assessment-due',
      message: 'North Field assessment is due',
      action: 'Complete now',
      urgent: true,
      icon: AlertCircle,
      dismissable: false,
      onActionClick: () => onNavigate('new-assessment')
    },
    {
      id: 2,
      type: 'reassessment',
      message: 'It\'s time to reassess West Paddock',
      action: 'Schedule',
      urgent: false,
      icon: Clock,
      dismissable: true,
      onActionClick: () => onNavigate('assessments')
    },
    {
      id: 3,
      type: 'seasonal-info',
      message: 'Beet harvesting season is approaching',
      action: 'Learn more',
      urgent: false,
      icon: Info,
      dismissable: true,
      onActionClick: () => logger.info('Open harvesting guide')
    },
    {
      id: 4,
      type: 'setup-paddocks',
      message: 'Setup your paddocks to get more accurate assessments',
      action: 'Setup now',
      urgent: false,
      icon: Settings,
      dismissable: true,
      onActionClick: () => onNavigate('paddock-setup')
    },
    {
      id: 5,
      type: 'update-measurements',
      message: 'South Paddock assessment uses estimated measurements - update with actuals for better accuracy',
      action: 'Update measurements',
      urgent: false,
      icon: Edit,
      dismissable: true,
      onActionClick: () => onNavigate('update-measurements')
    }
  ];
  
  const [actionItems, setActionItems] = useState(initialActionItems);
  
  const handleDismiss = (itemId) => {
    setActionItems(prev => prev.filter(item => item.id !== itemId));
    logger.info(`Action item ${itemId} dismissed`);
  };
  
  const getItemStyles = (item) => {
    const baseStyles = "flex items-center p-4 border-l-4 rounded-r-lg";
    
    switch (item.type) {
      case 'assessment-due':
        return `${baseStyles} border-yellow-400 bg-yellow-50`;
      case 'setup-paddocks':
        return `${baseStyles} border-green-400 bg-green-50`;
      case 'update-measurements':
        return `${baseStyles} border-orange-400 bg-orange-50`;
      default:
        return `${baseStyles} border-blue-400 bg-blue-50`;
    }
  };
  
  const getIconColor = (item) => {
    switch (item.type) {
      case 'assessment-due':
        return 'text-yellow-500';
      case 'setup-paddocks':
        return 'text-green-500';
      case 'update-measurements':
        return 'text-orange-500';
      default:
        return 'text-blue-500';
    }
  };
  
  const getActionButtonColor = (item) => {
    switch (item.type) {
      case 'assessment-due':
        return 'text-yellow-600 hover:text-yellow-800';
      case 'setup-paddocks':
        return 'text-green-600 hover:text-green-800';
      case 'update-measurements':
        return 'text-orange-600 hover:text-orange-800';
      default:
        return 'text-blue-600 hover:text-blue-800';
    }
  };
  
  if (actionItems.length === 0) {
    return (
      <Card>
        <h3 className="font-medium text-gray-800 mb-4">Action Items</h3>
        <div className="text-center py-8 text-gray-500">
          <CheckCircle2 size={48} className="mx-auto mb-2 text-green-400" />
          <p>All caught up! No action items at the moment.</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <h3 className="font-medium text-gray-800 mb-4">Action Items</h3>
      <div className="space-y-3">
        {actionItems.map(item => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className={getItemStyles(item)}>
              <IconComponent size={20} className={`${getIconColor(item)} mr-3 flex-shrink-0`} />
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-700 flex-grow pr-4">{item.message}</span>
                <div className="flex items-center gap-2">
                  {item.action && (
                    <button 
                      className={`text-sm font-medium ${getActionButtonColor(item)}`}
                      onClick={item.onActionClick}
                    >
                      {item.action}
                    </button>
                  )}
                  {item.dismissable && (
                    <button
                      onClick={() => handleDismiss(item.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-white/50"
                      title="Dismiss"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActionItemsWidget;
