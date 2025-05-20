import { useState } from 'react';
import { useUser } from './context/UserContext';
import { useNavigation } from './context/NavigationContext';
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

function App() {
  // Use custom hooks for device detection and persisting user session
  const isMobile = useDeviceDetection(768);
  const { user, setUser } = useUser();
  const { activeScreen, navigate } = useNavigation();

  const [authScreen, setAuthScreen] = useState('email'); // 'email', 'magic-link-sent', 'magic-link-verify', 'register'
  const isAuthenticated = Boolean(user);
  
  // Magic link authentication data
  const [currentEmail, setCurrentEmail] = useState('');
  
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
    
    navigate(screen);
  };
  
  const handleStartAssessment = (location) => {
    setSelectedLocation(location);
    navigate('new-assessment');
  };
  
  const handleContinueDraft = (location, assessment) => {
    setSelectedLocation(location);
    setDraftAssessment(assessment);
    navigate('new-assessment');
  };
  
  const handleViewReport = (reportId) => {
    setSelectedReportId(reportId);
    navigate('report-viewer');
  };
  
  const handleLogin = (userData) => {
    setUser(userData);
    navigate('home');
  };
  
  const handleLogout = () => {
    setUser(null);
    setAuthScreen('email');
    setCurrentEmail('');
  };
  
  // Magic link authentication handlers
  const handleEmailSubmit = (email) => {
    setCurrentEmail(email);
  };
  
  const handleEmailContinue = () => {
    setAuthScreen('magic-link-sent');
  };
  
  const handleBackToEmail = () => {
    setAuthScreen('email');
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
              onNewUser={handleRegisterClick}
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
              onLogin={handleLogin}
              onRegister={handleRegisterClick}
            />
          </ErrorBoundary>
        );
      
      case 'register':
        return (
          <ErrorBoundary>
            <RegisterScreen 
              onBack={handleBackToEmail} 
              onComplete={handleLogin}
              prefillEmail={currentEmail}
            />
          </ErrorBoundary>
        );
      
      // Legacy paths - kept for backward compatibility
      case 'login':
        return (
          <ErrorBoundary>
            <LoginScreen onLogin={handleLogin} onRegister={() => setAuthScreen('register')} />
          </ErrorBoundary>
        );
      
      default:
        return (
          <ErrorBoundary>
            <EmailScreen 
              onEmailSubmit={handleEmailSubmit} 
              onKnownUser={handleEmailContinue}
              onNewUser={handleRegisterClick}
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
          <Sidebar onLogout={handleLogout} />
        </ErrorBoundary>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Only show header on mobile */}
        {isMobile && (
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
        )}
        
        <div id="main-content" className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
          <ErrorBoundary>
            {activeScreen === 'home' && <HomeScreen isMobile={isMobile} />}
            {activeScreen === 'assessments' && (
              <AssessmentsScreen
                isMobile={isMobile}
                onStartAssessment={handleStartAssessment}
                onContinueDraft={handleContinueDraft}
              />
            )}
            {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} onViewReport={handleViewReport} />}
            {activeScreen === 'new-assessment' && (
              <NewAssessmentScreen
                isMobile={isMobile}
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
            {activeScreen === 'more' && <MoreScreen isMobile={isMobile} onLogout={handleLogout} />}
            {activeScreen === 'locations' && <LocationsScreen isMobile={isMobile} />}
            {activeScreen === 'settings' && <SettingsScreen isMobile={isMobile} />}
            {activeScreen === 'about-us' && <AboutUsScreen isMobile={isMobile} />}
            {activeScreen === 'terms' && <TermsScreen isMobile={isMobile} />}
          </ErrorBoundary>
        </div>
        
        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <ErrorBoundary>
            <BottomNav />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default App;
