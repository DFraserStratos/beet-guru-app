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
import LocationsScreen from './components/screens/LocationsScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import ReportViewerScreen from './components/screens/ReportViewerScreen';
import AboutUsScreen from './components/screens/AboutUsScreen';
import TermsScreen from './components/screens/TermsScreen';
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
  
  // Add state for selected location or draft assessment
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [draftAssessment, setDraftAssessment] = useState(null);
  
  // Add state for selected report
  const [selectedReportId, setSelectedReportId] = useState(null);
  
  const handleNavigate = (screen) => {
    // Reset selected data when navigating away from assessment screens
    if (screen !== 'new-assessment' && screen !== 'draft-assessment') {
      setSelectedLocation(null);
      setDraftAssessment(null);
    }
    
    // Reset selected report when navigating away from report viewer
    if (screen !== 'report-viewer') {
      setSelectedReportId(null);
    }
    
    setActiveScreen(screen);
  };
  
  const handleStartAssessment = (location) => {
    setSelectedLocation(location);
    setActiveScreen('new-assessment');
  };
  
  const handleContinueDraft = (location, assessment) => {
    setSelectedLocation(location);
    setDraftAssessment(assessment);
    setActiveScreen('new-assessment');
  };
  
  const handleViewReport = (reportId) => {
    setSelectedReportId(reportId);
    setActiveScreen('report-viewer');
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
            {activeScreen === 'assessments' && (
              <AssessmentsScreen 
                onNavigate={handleNavigate} 
                isMobile={isMobile}
                onStartAssessment={handleStartAssessment}
                onContinueDraft={handleContinueDraft}
              />
            )}
            {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} onViewReport={handleViewReport} />}
            {activeScreen === 'new-assessment' && (
              <NewAssessmentScreen 
                isMobile={isMobile} 
                onNavigate={handleNavigate}
                onViewReport={handleViewReport}
                prefillLocation={selectedLocation}
                draftAssessment={draftAssessment}
              />
            )}
            {activeScreen === 'report-viewer' && (
              <ReportViewerScreen
                reportId={selectedReportId}
                isMobile={isMobile}
                onBack={() => handleNavigate('reports')}
              />
            )}
            {activeScreen === 'stockfeed' && <StockFeedScreen isMobile={isMobile} />}
            {activeScreen === 'more' && <MoreScreen onNavigate={handleNavigate} isMobile={isMobile} onLogout={handleLogout} user={user} />}
            {activeScreen === 'locations' && <LocationsScreen isMobile={isMobile} user={user} />}
            {activeScreen === 'settings' && <SettingsScreen isMobile={isMobile} onNavigate={handleNavigate} user={user} />}
            {activeScreen === 'about-us' && <AboutUsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
            {activeScreen === 'terms' && <TermsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
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