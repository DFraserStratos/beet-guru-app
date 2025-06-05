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
import EmailScreen from './components/screens/EmailScreen';
import VerificationCodeScreen from './components/screens/VerificationCodeScreen';
import StockFeedScreen from './components/screens/StockFeedScreen';
import PaddocksScreen from './components/screens/PaddocksScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import ReportViewerScreen from './components/screens/ReportViewerScreen';
import AboutUsScreen from './components/screens/AboutUsScreen';
import TermsScreen from './components/screens/TermsScreen';
import CustomersScreen from './components/screens/CustomersScreen';
import CustomerDetailScreen from './components/screens/CustomerDetailScreen';
import CultivarManagementScreen from './components/screens/CultivarManagementScreen';
import UserManagementScreen from './components/screens/UserManagementScreen';
import ErrorBoundary from './components/utility/ErrorBoundary';
import { CustomerProvider } from './contexts/CustomerContext';
import { useDeviceDetection, useLocalStorage } from './hooks';
import { logger } from './utils/logger';

function App() {
  // Use custom hooks for device detection and persisting user session
  const isMobile = useDeviceDetection(768);
  const [user, setUser] = useLocalStorage('beet-guru-user', null);
  
  // App state
  const [activeScreen, setActiveScreen] = useState('home');
  const [authScreen, setAuthScreen] = useState('email'); // 'email', 'verification-code', 'register'
  const isAuthenticated = Boolean(user);
  
  // Authentication data
  const [currentEmail, setCurrentEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false); // Track if it's a new user
  
  // Add state for selected location or draft assessment
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [draftAssessment, setDraftAssessment] = useState(null);
  
  // Add state for selected report
  const [selectedReportId, setSelectedReportId] = useState(null);
  
  // Add state for selected customer
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  
  // Redirect admin users if they try to access restricted screens
  useEffect(() => {
    if (user?.isAdmin) {
      const restrictedScreens = ['assessments', 'new-assessment', 'locations'];
      if (restrictedScreens.includes(activeScreen)) {
        handleNavigate('user-management');
      }
    }
  }, [activeScreen, user?.isAdmin]);

  // Handle navigation
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
    
    // Reset selected customer when navigating away from customer detail
    if (screen !== 'customer-detail') {
      setSelectedCustomerId(null);
    }
    
    setActiveScreen(screen);
  };
  
  const handleStartAssessment = (paddock) => {
    setSelectedLocation(paddock);
    setActiveScreen('new-assessment');
  };
  
  const handleContinueDraft = (paddock, assessment) => {
    setSelectedLocation(paddock);
    setDraftAssessment(assessment);
    setActiveScreen('new-assessment');
  };
  
  const handleViewReport = (reportId) => {
    setSelectedReportId(reportId);
    setActiveScreen('report-viewer');
  };
  
  const handleViewCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setActiveScreen('customer-detail');
  };
  
  const handleCreateAssessmentForCustomer = (customer) => {
    // For now, just log the action - in the future this would navigate to assessment creation
    logger.info('Creating assessment for customer:', customer.name);
    // This could navigate to a special assessment screen pre-filled with customer data
  };
  
  const handleLogin = (userData) => {
    setUser(userData);
    // Set default screen based on user type
    if (userData?.isAdmin) {
      setActiveScreen('user-management');
    } else {
      setActiveScreen('home');
    }
    setIsNewUser(false);
  };
  
  const handleLogout = () => {
    setUser(null);
    setAuthScreen('email');
    setCurrentEmail('');
    setIsNewUser(false);
  };
  
  // Verification code authentication handlers
  const handleEmailSubmit = (email) => {
    setCurrentEmail(email);
  };
  
  const handleSendCode = () => {
    setAuthScreen('verification-code');
  };
  
  const handleBackToEmail = () => {
    setAuthScreen('email');
    setIsNewUser(false);
  };
  
  const handleVerifyCode = async (email, userOrPersona) => {
    // If userOrPersona is provided, it means verification was successful
    if (userOrPersona) {
      // Check if this is Fred's actual email (existing user) or a new user email
      if (email === 'fred@beetguru.com') {
        // Fred's actual email - log in directly
        handleLogin(userOrPersona);
      } else {
        // Any other email means new user registration (but using Fred's persona as template)
        setIsNewUser(true);
        setAuthScreen('register');
      }
    } else {
      // No user data means new user registration
      setIsNewUser(true);
      setAuthScreen('register');
    }
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
              onSendCode={handleSendCode}
              onLogin={handleLogin}
            />
          </ErrorBoundary>
        );
      
      case 'verification-code':
        return (
          <ErrorBoundary>
            <VerificationCodeScreen 
              email={currentEmail}
              onBack={handleBackToEmail}
              onVerify={handleVerifyCode}
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
            <LoginScreen 
              onLogin={handleLogin} 
              onRegister={() => setAuthScreen('register')}
            />
          </ErrorBoundary>
        );
      
      default:
        return (
          <ErrorBoundary>
            <EmailScreen 
              onEmailSubmit={handleEmailSubmit} 
              onSendCode={handleSendCode}
              onLogin={handleLogin}
            />
          </ErrorBoundary>
        );
    }
  }

  // Main app when authenticated
  return (
    <CustomerProvider>
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
          
          <div id="main-content" className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
            <ErrorBoundary>
              {activeScreen === 'home' && !user?.isAdmin && <HomeScreen onNavigate={handleNavigate} isMobile={isMobile} user={user} />}
              {activeScreen === 'assessments' && !user?.isAdmin && (
                <AssessmentsScreen 
                  onNavigate={handleNavigate} 
                  isMobile={isMobile}
                  onStartAssessment={handleStartAssessment}
                  onContinueDraft={handleContinueDraft}
                  user={user}
                />
              )}
              {activeScreen === 'reports' && <ReportsScreen isMobile={isMobile} onViewReport={handleViewReport} user={user} />}
              {activeScreen === 'new-assessment' && !user?.isAdmin && (
                <NewAssessmentScreen 
                  isMobile={isMobile} 
                  onNavigate={handleNavigate}
                  onViewReport={handleViewReport}
                  prefillLocation={selectedLocation}
                  draftAssessment={draftAssessment}
                  user={user}
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
              {activeScreen === 'locations' && !user?.isAdmin && <PaddocksScreen isMobile={isMobile} user={user} />}
              {activeScreen === 'settings' && <SettingsScreen isMobile={isMobile} onNavigate={handleNavigate} user={user} />}
              {activeScreen === 'about-us' && <AboutUsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
              {activeScreen === 'terms' && <TermsScreen onNavigate={handleNavigate} isMobile={isMobile} />}
              {activeScreen === 'customers' && (
                <CustomersScreen 
                  isMobile={isMobile} 
                  onViewCustomer={handleViewCustomer}
                  user={user}
                />
              )}
              {activeScreen === 'customer-detail' && (
                <CustomerDetailScreen 
                  customerId={selectedCustomerId}
                  onBack={() => handleNavigate('customers')}
                  onCreateAssessment={handleCreateAssessmentForCustomer}
                  onViewReport={handleViewReport}
                  isMobile={isMobile}
                />
              )}
              {activeScreen === 'cultivar-management' && <CultivarManagementScreen onNavigate={handleNavigate} isMobile={isMobile} />}
              {activeScreen === 'user-management' && <UserManagementScreen onNavigate={handleNavigate} isMobile={isMobile} />}
            </ErrorBoundary>
          </div>
          
          {/* Mobile Bottom Navigation */}
          {isMobile && (
            <ErrorBoundary>
              <BottomNav 
                activeScreen={activeScreen} 
                handleNavigate={handleNavigate} 
                user={user}
              />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </CustomerProvider>
  );
}

export default App;