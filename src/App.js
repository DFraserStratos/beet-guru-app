import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardScreen from './components/screens/DashboardScreen';
import AssessmentsScreen from './components/screens/AssessmentsScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import NewAssessmentScreen from './components/screens/NewAssessmentScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeScreen={activeScreen} 
        handleNavigate={handleNavigate} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <Header 
          activeScreen={activeScreen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <div className="flex-1 overflow-auto p-6">
          {activeScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
          {activeScreen === 'assessments' && <AssessmentsScreen onNavigate={handleNavigate} />}
          {activeScreen === 'reports' && <ReportsScreen />}
          {activeScreen === 'new-assessment' && <NewAssessmentScreen />}
        </div>
      </div>
    </div>
  );
}

export default App;
