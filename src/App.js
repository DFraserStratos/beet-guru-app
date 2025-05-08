import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import DashboardScreen from './components/screens/DashboardScreen';
import AssessmentsScreen from './components/screens/AssessmentsScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import NewAssessmentScreen from './components/screens/NewAssessmentScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);
  
  const handleNavigate = (screen) => {
    setActiveScreen(screen);
    // On mobile, auto-close sidebar when navigating
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header 
        activeScreen={activeScreen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden by default on mobile unless opened */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block h-full absolute md:relative z-20 ${isMobile ? 'w-64' : ''}`}>
          <Sidebar 
            activeScreen={activeScreen} 
            handleNavigate={handleNavigate} 
            isSidebarOpen={true} 
          />
        </div>
        
        {/* Backdrop for mobile sidebar */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
        
        <div className="flex-1 overflow-hidden flex flex-col pb-16 md:pb-0">
          <div className="flex-1 overflow-auto p-4">
            {activeScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} isMobile={isMobile} />}
            {activeScreen === 'assessments' && <AssessmentsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
            {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} />}
            {activeScreen === 'new-assessment' && <NewAssessmentScreen isMobile={isMobile} />}
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <BottomNav 
          activeScreen={activeScreen} 
          handleNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}

export default App;
