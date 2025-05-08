import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNavigation from './components/layout/MobileNavigation';
import DashboardScreen from './components/screens/DashboardScreen';
import AssessmentsScreen from './components/screens/AssessmentsScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import NewAssessmentScreen from './components/screens/NewAssessmentScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' or 'register'
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Check for smaller screens on mount
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen('login');
  };
  
  const handleRegister = () => {
    setIsAuthenticated(true);
  };
  
  const goToRegister = () => {
    setAuthScreen('register');
  };
  
  const goToLogin = () => {
    setAuthScreen('login');
  };
  
  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {authScreen === 'login' && (
          <LoginScreen 
            onLogin={handleLogin} 
            onRegisterClick={goToRegister} 
          />
        )}
        {authScreen === 'register' && (
          <RegisterScreen 
            onRegister={handleRegister} 
            onBackToLogin={goToLogin} 
          />
        )}
      </>
    );
  }

  // If authenticated, show main app
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          activeScreen={activeScreen} 
          handleNavigate={handleNavigate} 
          isSidebarOpen={isSidebarOpen}
          onLogout={handleLogout}
        />
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <Header 
          activeScreen={activeScreen} 
          toggleSidebar={toggleSidebar} 
        />
        
        <div className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          {activeScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
          {activeScreen === 'assessments' && <AssessmentsScreen onNavigate={handleNavigate} />}
          {activeScreen === 'reports' && <ReportsScreen />}
          {activeScreen === 'new-assessment' && <NewAssessmentScreen />}
          {activeScreen === 'locations' && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Locations</h2>
              <p className="text-gray-500">Manage your field locations here.</p>
            </div>
          )}
          {activeScreen === 'settings' && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-gray-500">Configure your account settings here.</p>
            </div>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <MobileNavigation 
          activeScreen={activeScreen} 
          handleNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}

export default App;
