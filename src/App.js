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
import EmailScreen from './components/screens/EmailScreen';
import MagicLinkSentScreen from './components/screens/MagicLinkSentScreen';
import MagicLinkVerifyScreen from './components/screens/MagicLinkVerifyScreen';
import StockFeedScreen from './components/screens/StockFeedScreen';
import LocationsScreen from './components/screens/LocationsScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import ReportViewerScreen from './components/screens/ReportViewerScreen';
import AboutUsScreen from './components/screens/AboutUsScreen';
import TermsScreen from './components/screens/TermsScreen';
import ErrorBoundary from './components/utility/ErrorBoundary';
import { useDeviceDetection } from './hooks';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { user, login, logout, selectPersona, selectedPersona } = useAuth();
  // Use custom hooks for device detection
  const isMobile = useDeviceDetection(768);
  
  // App state
  const [activeScreen, setActiveScreen] = useState('home');
  const [authScreen, setAuthScreen] = useState('email'); // 'email', 'magic-link-sent', 'magic-link-verify', 'register'
  const isAuthenticated = Boolean(user);
  
  // Magic link authentication data
  const [currentEmail, setCurrentEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false); // Track if it's a new user for magic link flow
  
  
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
    login(userData);
    setActiveScreen('home');
    setIsNewUser(false);
  };
  
  const handleLogout = () => {
    logout();
    setAuthScreen('email');
    setCurrentEmail('');
    setIsNewUser(false);
  };
  
  // Handler for selecting a persona
  const handleSelectPersona = (persona) => {
    selectPersona(persona);
    // Also update the current email to match the persona's email
    setCurrentEmail(persona.email);
  };
  
  // Magic link authentication handlers
  const handleEmailSubmit = (email) => {
    setCurrentEmail(email);
  };
  
  const handleEmailContinue = () => {
    setIsNewUser(false);
    setAuthScreen('magic-link-sent');
  };
  
  const handleNewUserContinue = () => {
    setIsNewUser(true);
    setAuthScreen('magic-link-sent');
  };
  
  const handleBackToEmail = () => {
    setAuthScreen('email');
    setIsNewUser(false);
  };
  
  const handleVerifyMagicLink = () => {
    setAuthScreen('magic-link-verify');
  };
  
  const handleRegisterClick = (email = '') => {
    if (email) {
      setCurrentEmail(email);
    }
    setAuthScreen('register');
  };
  
  // If not authenticated, show auth screens
  if (!isAuthenticated) {
    switch (authScreen) {
      case 'email':
        return (
          <ErrorBoundary>
            <EmailScreen
              onEmailSubmit={handleEmailSubmit}
              onKnownUser={handleEmailContinue}
              onNewUser={handleNewUserContinue}
            />
          </ErrorBoundary>
        );
      
      case 'magic-link-sent':
        return (
          <ErrorBoundary>
            <MagicLinkSentScreen 
              email={currentEmail}
              onBack={handleBackToEmail}
              onVerify={handleVerifyMagicLink}
            />
          </ErrorBoundary>
        );
      
      case 'magic-link-verify':
        return (
          <ErrorBoundary>
          <MagicLinkVerifyScreen
            email={currentEmail}
            onBack={handleBackToEmail}
            onRegister={handleRegisterClick}
            isNewUser={isNewUser}
          />
          </ErrorBoundary>
        );
      
      case 'register':
        return (
          <ErrorBoundary>
          <RegisterScreen
            onBack={handleBackToEmail}
            prefillEmail={currentEmail}
          />
          </ErrorBoundary>
        );
      
      // Legacy paths - kept for backward compatibility
      case 'login':
        return (
          <ErrorBoundary>
          <LoginScreen
            onRegister={() => setAuthScreen('register')}
          />
          </ErrorBoundary>
        );
      
      default:
        return (
          <ErrorBoundary>
            <EmailScreen
              onEmailSubmit={handleEmailSubmit}
              onKnownUser={handleEmailContinue}
              onNewUser={handleNewUserContinue}
            />
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
        
        <div id="main-content" className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
          <ErrorBoundary>
            {activeScreen === 'home' && <HomeScreen onNavigate={handleNavigate} isMobile={isMobile} />}
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
            {activeScreen === 'more' && <MoreScreen onNavigate={handleNavigate} isMobile={isMobile} />}
            {activeScreen === 'locations' && <LocationsScreen isMobile={isMobile} />}
            {activeScreen === 'settings' && <SettingsScreen isMobile={isMobile} onNavigate={handleNavigate} />}
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

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;