import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import AssessmentsScreen from './components/screens/AssessmentsScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import NewAssessmentScreen from './components/screens/NewAssessmentScreen';
import MoreScreen from './components/screens/MoreScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import StockFeedScreen from './components/screens/StockFeedScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' or 'register'
  const [user, setUser] = useState(null);
  
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
  
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setActiveScreen('home');
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthScreen('login');
  };
  
  const handleRegisterClick = () => {
    setAuthScreen('register');
  };
  
  const handleBackToLogin = () => {
    setAuthScreen('login');
  };

  // If not authenticated, show auth screens
  if (!isAuthenticated) {
    if (authScreen === 'login') {
      return <LoginScreen onLogin={handleLogin} onRegister={handleRegisterClick} />;
    } else {
      return <RegisterScreen onBack={handleBackToLogin} onComplete={handleLogin} />;
    }
  }

  // Main app when authenticated
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - always visible on desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'} h-screen`}>
        <Sidebar 
          activeScreen={activeScreen} 
          handleNavigate={handleNavigate}
          onLogout={handleLogout}
          user={user}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Only show header on mobile */}
        {isMobile && (
          <Header 
            activeScreen={activeScreen}
          />
        )}
        
        <div className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
          {activeScreen === 'home' && <HomeScreen onNavigate={handleNavigate} isMobile={isMobile} user={user} />}
          {activeScreen === 'assessments' && <AssessmentsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
          {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} />}
          {activeScreen === 'new-assessment' && <NewAssessmentScreen isMobile={isMobile} />}
          {activeScreen === 'stockfeed' && <StockFeedScreen isMobile={isMobile} />}
          {activeScreen === 'more' && <MoreScreen onNavigate={handleNavigate} isMobile={isMobile} onLogout={handleLogout} user={user} />}
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