import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import DashboardScreen from './components/screens/DashboardScreen';
import AssessmentsScreen from './components/screens/AssessmentsScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import NewAssessmentScreen from './components/screens/NewAssessmentScreen';
import MoreScreen from './components/screens/MoreScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - always visible on desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'} h-screen`}>
        <Sidebar 
          activeScreen={activeScreen} 
          handleNavigate={handleNavigate} 
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeScreen={activeScreen} 
          isMobile={isMobile}
        />
        
        <div className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
          {activeScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} isMobile={isMobile} />}
          {activeScreen === 'assessments' && <AssessmentsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
          {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} />}
          {activeScreen === 'new-assessment' && <NewAssessmentScreen isMobile={isMobile} />}
          {activeScreen === 'more' && <MoreScreen onNavigate={handleNavigate} isMobile={isMobile} />}
          {activeScreen === 'locations' && <div className="p-4">Locations Screen (Coming Soon)</div>}
          {activeScreen === 'settings' && <div className="p-4">Settings Screen (Coming Soon)</div>}
        </div>
        
        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <BottomNav 
            activeScreen={activeScreen} 
            handleNavigate={handleNavigate} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
