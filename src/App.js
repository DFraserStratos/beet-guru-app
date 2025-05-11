import { useState } from 'react';
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
import ErrorBoundary from './components/utility/ErrorBoundary';
import { useDeviceDetection, useLocalStorage } from './hooks';

function App() {
  // Use custom hooks for device detection and persisting user session
  const isMobile = useDeviceDetection(768);
  const [user, setUser] = useLocalStorage('beet-guru-user', null);
  
  // App state
  const [activeScreen, setActiveScreen] = useState('home');
  const [authScreen, setAuthScreen] = useState('login'); // 'login' or 'register'
  const isAuthenticated = Boolean(user);
  
  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };
  
  const handleLogin = (userData) => {
    setUser(userData);
    setActiveScreen('home');
  };
  
  const handleLogout = () => {
    setUser(null);
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
      return (
        <ErrorBoundary>
          <LoginScreen onLogin={handleLogin} onRegister={handleRegisterClick} />
        </ErrorBoundary>
      );
    } else {
      return (
        <ErrorBoundary>
          <RegisterScreen onBack={handleBackToLogin} onComplete={handleLogin} />
        </ErrorBoundary>
      );
    }
  }

  // Main app when authenticated
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - always visible on desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'} h-screen`}>
        <ErrorBoundary>
          <Sidebar 
            activeScreen={activeScreen} 
            handleNavigate={handleNavigate}
            onLogout={handleLogout}
            user={user}
          />
        </ErrorBoundary>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Only show header on mobile */}
        {isMobile && (
          <ErrorBoundary>
            <Header 
              activeScreen={activeScreen}
            />
          </ErrorBoundary>
        )}
        
        <div className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
          <ErrorBoundary>
            {activeScreen === 'home' && <HomeScreen onNavigate={handleNavigate} isMobile={isMobile} user={user} />}
            {activeScreen === 'assessments' && <AssessmentsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
            {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} />}
            {activeScreen === 'new-assessment' && <NewAssessmentScreen isMobile={isMobile} />}
            {activeScreen === 'stockfeed' && <StockFeedScreen isMobile={isMobile} />}
            {activeScreen === 'more' && <MoreScreen onNavigate={handleNavigate} isMobile={isMobile} onLogout={handleLogout} user={user} />}
            {activeScreen === 'locations' && <div className="p-4">Locations Screen (Coming Soon)</div>}
            {activeScreen === 'settings' && <div className="p-4">Settings Screen (Coming Soon)</div>}
          </ErrorBoundary>
        </div>
        
        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <ErrorBoundary>
            <BottomNav 
              activeScreen={activeScreen} 
              handleNavigate={handleNavigate} 
            />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default App;