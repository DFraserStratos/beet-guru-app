# Beet Guru App

A modern React application for farmers to manage beet crop assessments, measure dry matter content, and plan feeding schedules. Built with a mobile-first approach for field use, with full desktop support for office management.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/DFraserStratos/beet-guru-app.git

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📱 Demo Guide

### Using the App Demo
1. **Email Entry**: Enter any email or click "Continue" for demo
2. **Verification Code**: Click "Fill in Code" to auto-fill `123456`
3. **Login/Register**: Choose existing user login or new registration
4. **Explore**: Navigate using sidebar (desktop) or bottom tabs (mobile)

## 🏗️ Technical Stack

- **React 18.2.0** - UI framework
- **Tailwind CSS 3.3.3** - Styling
- **Lucide React 0.294.0** - Icons
- **No routing library** - Component-based navigation
- **No Redux** - React hooks for state management

---

# Comprehensive Documentation for Development

## Table of Contents
1. [Project Architecture](#project-architecture)
2. [Authentication System](#authentication-system)
3. [Visual Language Guide](#visual-language-guide)
4. [Component System](#component-system)
5. [State Management](#state-management)
6. [API & Mock Data](#api--mock-data)
7. [Development Guidelines](#development-guidelines)
8. [Feature Documentation](#feature-documentation)

## Project Architecture

### Directory Structure
```
src/
├── components/
│   ├── assessment/      # Multi-step assessment wizard components
│   ├── layout/          # Core layout components
│   │   ├── AuthLayout.js    # Standardized auth screen layout
│   │   ├── Sidebar.js       # Desktop navigation
│   │   ├── Header.js        # Mobile header
│   │   └── BottomNav.js     # Mobile navigation
│   ├── screens/         # Main application screens
│   ├── ui/              # Reusable UI components
│   │   ├── form/        # Standardized form components
│   │   └── ...          # Widgets, cards, etc.
│   └── utility/         # Error boundaries, helpers
├── hooks/               # Custom React hooks
├── services/            # API layer with mock data
├── assets/              # Images, logos
└── utils/               # Helper functions
```

### Core Principles
- **Mobile-first design** - Primary use case is farmers in the field
- **Component-based navigation** - No React Router, uses conditional rendering
- **Centralized state** - App.js manages all top-level state
- **Mock-first development** - Complete API layer with realistic data
- **Error boundaries** - Graceful error handling throughout
- **Custom hooks** - Reusable logic patterns

## Authentication System

### Current Implementation (May 2025)
The app uses a **verification code system** (6-digit codes) instead of magic links:

```javascript
// Authentication flow
1. EmailScreen → User enters email
2. API checks if email exists → Sends verification code
3. VerificationCodeScreen → User enters 6-digit code
4. Verification → Routes to login (existing) or registration (new)
```

### Authentication Components

#### EmailScreen
- Entry point for authentication
- Persona selection for demos
- Email validation
- Routes based on email existence

#### VerificationCodeScreen
```javascript
// Key features:
- 6 individual input boxes for digits
- Auto-advance on input
- Paste support for full code
- Demo button fills "123456"
- Error handling with retry limits
```

#### App.js Authentication State
```javascript
// Core authentication state
const [user, setUser] = useLocalStorage('beet-guru-user', null);
const [authScreen, setAuthScreen] = useState('email');
const [currentEmail, setCurrentEmail] = useState('');
const [selectedPersona, setSelectedPersona] = useState(null);
const [isNewUser, setIsNewUser] = useState(false);

// Authentication handlers
handleEmailSubmit(email)
handleSendCode()
handleVerifyCode(email, code)
handleLogin(userData)
handleLogout()
```

### Persona System
The app includes 12 diverse personas for demo purposes:
```javascript
// Example persona structure
{
  id: '1',
  name: 'Maria Rodriguez',
  email: 'maria.rodriguez@example.com',
  password: 'password123',  // Some have passwords
  hasPassword: true,        // Some are verification-only
  role: 'Farm Manager',
  initials: 'MR',
  farmName: 'Sunnydale Organics',
  location: 'California'
}
```

## Visual Language Guide

### Layout Structure
- **Page Header Cards**: Every screen starts with a white card containing title and description
- **Card-Based Containers**: Content in rounded white cards with subtle shadows
- **Consistent Spacing**: 24px (1.5rem) between major elements
- **Responsive Grids**: Desktop uses 12-column grid, mobile uses single column

### Typography Scale
```css
/* Page Titles */
font-size: 1.5rem (24px); font-weight: bold; color: #1F2937;

/* Section Headers */
font-size: 1.25rem (20px); font-weight: bold; color: #1F2937;

/* Body Text */
font-size: 0.875rem (14px); color: #1F2937;

/* Supporting Text */
font-size: 0.75rem (12px); color: #9CA3AF;
```

### Color Palette
```javascript
// Primary Brand
primary: '#16A34A'      // Green
primaryDark: '#166534'  // Dark green for active states

// Backgrounds
background: '#F9FAFB'   // Page background
white: '#FFFFFF'        // Cards and containers

// Text Colors
textPrimary: '#1F2937'  // Dark gray
textSecondary: '#4B5563' // Medium gray
textMuted: '#9CA3AF'    // Light gray

// Status Colors
warning: {
  bg: '#FEF3C7',
  text: '#92400E',
  border: '#F59E0B'
}
draft: {
  bg: '#FEF3C7',
  text: '#92400E'
}
```

### Navigation Patterns

#### Desktop (≥768px)
- Left sidebar: 64px width, dark green (#166534)
- No top header
- Navigation order: Home → Assessments → Reports → Locations → Stock Feed
- User profile below divider
- Settings and logout at bottom

#### Mobile (<768px)
- Bottom tab navigation
- Simple header with logo
- 4 main tabs: Home, Assessments, Reports, More
- "More" menu contains: Locations, Stock Feed, Settings, etc.

## Component System

### Form Components
The app uses a standardized form system for consistency:

#### FormField
```jsx
<FormField
  label="Email address"
  name="email"
  type="email"  // text, email, password, number, select, textarea, checkbox
  placeholder="you@example.com"
  value={values.email}
  onChange={handleChange}
  onBlur={handleBlur}
  error={errors.email}
  touched={touched.email}
  options={selectOptions}  // for select type
  hint="Helper text"
  required={true}
/>
```

#### FormButton
```jsx
<FormButton
  onClick={handleClick}
  variant="primary"  // primary, secondary, outline, danger, link
  size="md"          // sm, md, lg
  isLoading={loading}
  fullWidth={false}
  icon={<IconComponent />}
>
  Button Text
</FormButton>
```

#### FormButtonNav
```jsx
<FormButtonNav
  onNext={handleNext}
  onBack={handleBack}
  onCancel={handleCancel}
  onSaveAsDraft={handleSaveAsDraft}
  nextLabel="Continue"  // Dynamic labels
  showSaveAsDraft={true}
  showBack={true}
  isGeneratingReport={false}
  isMobile={isMobile}
/>
```

### Custom Hooks

#### useForm
```javascript
const {
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  setFieldError,
  resetForm
} = useForm(initialValues, validationFunction);
```

#### useDeviceDetection
```javascript
const isMobile = useDeviceDetection(768); // breakpoint in pixels
```

#### useLocalStorage
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue);
```

#### useApi
```javascript
const { data, loading, error, execute } = useApi(apiFunction);
```

### Layout Components

#### AuthLayout
Standardized layout for all authentication screens:
```jsx
<AuthLayout 
  title="Sign in to your account"
  onBack={handleBack}
  showBackButton={true}
>
  {/* Auth form content */}
</AuthLayout>
```

#### PageContainer
Consistent page wrapper:
```jsx
<PageContainer>
  <PageHeader 
    title="Assessments"
    description="Manage your crop assessments"
    action={{
      label: "New Assessment",
      onClick: handleNewAssessment
    }}
  />
  {/* Page content */}
</PageContainer>
```

## State Management

### App.js Central State
```javascript
// Core application state
const [user, setUser] = useLocalStorage('beet-guru-user', null);
const [activeScreen, setActiveScreen] = useState('home');
const [authScreen, setAuthScreen] = useState('email');
const [selectedLocation, setSelectedLocation] = useState(null);
const [draftAssessment, setDraftAssessment] = useState(null);
const [selectedReportId, setSelectedReportId] = useState(null);

// Navigation handler
const handleNavigate = (screen) => {
  // Reset context-specific state
  if (screen !== 'new-assessment') {
    setSelectedLocation(null);
    setDraftAssessment(null);
  }
  setActiveScreen(screen);
};
```

### State Management Rules
1. **Global state in App.js** - Authentication, navigation, selected items
2. **Component state locally** - Forms, UI state, temporary data
3. **Custom hooks for reusable state** - Form handling, API calls
4. **Props for parent-child communication** - No prop drilling beyond 2 levels
5. **LocalStorage for persistence** - User session only

## API & Mock Data

### API Service Structure
```javascript
// API modules
authAPI: {
  checkEmailExists(email)
  generateVerificationCode(email)
  verifyCode(email, code)
  loginWithVerifiedEmail(email)
  register(userData)
  getRandomPersona()
}

assessmentsAPI: {
  getAll()
  getById(id)
  create(data)
  update(id, data)
  delete(id)
  getDraftAssessments()
}

reportsAPI: {
  getAll()
  getById(id)
  generate(assessmentId, type)
  send(id, recipients)
}

referencesAPI: {
  getLocations(withStatus)
  getCropTypes()
  getCultivars(cropTypeId)
  createLocation(data)
  updateLocation(id, data)
  deleteLocation(id)
}
```

### Mock Data Structure
```javascript
// Locations with status
{
  id: '1',
  name: 'North Paddock',
  area: 3.5,
  latitude: -43.5280,
  longitude: 172.6316,
  status: 'draft',      // 'draft' or 'not-started'
  assessmentId: '4'     // Reference to draft
}

// Assessments with calculations
{
  id: '1',
  locationId: '1',
  cropTypeId: '1',
  cultivarId: '1',
  dryMatter: '21.8%',
  date: '2025-05-08',
  status: 'completed',  // 'draft' or 'completed'
  waterType: 'irrigated',
  rowSpacing: 0.5,
  estimatedYield: '22.4 t/ha',
  totalYield: '78.4 tonnes',
  feedingCapacity: '186 days',
  stockCount: 50
}

// Cultivars reference data
{
  id: '1',
  name: 'Brigadier',
  cropTypeId: '1',
  dryMatter: '12-15%',
  yield: '20-30 t/acre',
  growingTime: '24-28 weeks',
  description: 'Low dry matter, high sugar content...'
}
```

## Development Guidelines

### Code Style Rules

1. **Component Structure**
```jsx
// Standard component template
import React, { useState, useEffect } from 'react';
import { IconName } from 'lucide-react';
import { useForm, useApi } from '../../hooks';
import { FormField, FormButton } from '../ui/form';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // State declarations
  const [localState, setLocalState] = useState();
  
  // Custom hooks
  const { values, handleSubmit } = useForm();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

2. **Naming Conventions**
- Components: PascalCase (`UserProfile.js`)
- Hooks: camelCase with 'use' prefix (`useLocalStorage.js`)
- Event handlers: 'handle' prefix (`handleSubmit`)
- Boolean props: 'is/has' prefix (`isLoading`, `hasError`)

3. **Tailwind Classes Order**
```jsx
// Order: positioning → display → spacing → sizing → styling → state
className="absolute flex items-center p-4 w-full bg-white rounded-lg hover:shadow-md"
```

4. **Error Handling**
```jsx
// Always wrap major components
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>

// API calls with proper error handling
try {
  const data = await apiCall();
  // Handle success
} catch (error) {
  console.error('Context:', error);
  // Show user-friendly message
}
```

### Component Development Rules

1. **Mobile-First Development**
   - Design for mobile screens first
   - Use `isMobile` prop for conditional rendering
   - Test on 375px width minimum

2. **Form Handling**
   - Always use FormField components
   - Implement proper validation
   - Show loading states during submission
   - Handle errors gracefully

3. **State Management**
   - Keep state as local as possible
   - Lift state only when necessary
   - Use custom hooks for complex state logic
   - Don't store derived state

4. **Performance**
   - Use React.memo for expensive components
   - Implement proper key props in lists
   - Lazy load heavy components
   - Optimize images and assets

### Testing Approach
```javascript
// Component testing priorities
1. User interactions (clicks, form submissions)
2. Error states and edge cases
3. Responsive behavior
4. Accessibility features
```

## Feature Documentation

### Assessment System

#### Multi-Step Wizard
```javascript
// Step components
1. CropDetailsStep - Crop type, cultivar, dates
2. FieldSetupStep - Measurements and dry matter
3. MeasurementsStep - Sample weights and counts
4. ReviewStep - Summary and report generation

// Progress indicator
<StepProgress 
  currentStep={currentStep}
  steps={['Crop Details', 'Field Setup', 'Measurements', 'Review']}
/>
```

#### Field Setup Features
- Real-time area calculation
- Toggle between Estimate/Actual values
- Organized sections for measurements and dry matter
- Input validation with sensible defaults

#### Measurements Features
- Capture leaf weight, bulb weight, plant count
- Multiple sample support
- Visual yield preview graph
- Simplified single-sample default

### Report System

#### Report Display
```javascript
// Desktop: Table view
<DataTable 
  columns={['Date', 'Title', 'Location', 'Actions']}
  data={reports}
  onRowClick={handleViewReport}
/>

// Mobile: Card view
<div className="space-y-4">
  {reports.map(report => (
    <ReportCard key={report.id} {...report} />
  ))}
</div>
```

#### Report Features
- Historical data spanning multiple years
- Filtering by date, cultivar, season
- Multiple sorting options
- Status tracking (draft, sent)
- Email delivery simulation

### Location Management
- CRUD operations
- GPS coordinate support
- Status indicators (draft/not-started)
- Assessment linking
- Map picker integration

### Settings Screen
- Tab-based navigation (Profile, Farm, Security)
- Consistent form layouts
- Mobile-optimized tabs
- Logout functionality

## Cursor/LLM Development Instructions

When developing with this codebase:

1. **Always check existing patterns** - Look for similar components before creating new ones
2. **Use the form system** - Never create raw input elements
3. **Follow the visual language** - Maintain consistent spacing, colors, typography
4. **Test responsive behavior** - Check both mobile and desktop views
5. **Handle errors gracefully** - Use try-catch and show user-friendly messages
6. **Update mock data** - Keep the API service layer realistic
7. **Document changes** - Add comments for complex logic
8. **Respect the navigation pattern** - Use handleNavigate, not routing

### Common Tasks

#### Adding a New Screen
```javascript
1. Create screen component in components/screens/
2. Add to App.js conditional rendering
3. Add navigation handler case
4. Update navigation menus (Sidebar, BottomNav, MoreScreen)
5. Add mock data if needed
```

#### Adding Form Fields
```javascript
1. Use FormField component
2. Add to form validation schema
3. Handle in submit function
4. Update mock API if needed
```

#### Modifying Navigation
```javascript
1. Update both Sidebar.js and BottomNav.js
2. Maintain consistent ordering
3. Update MoreScreen.js if needed
4. Test on both mobile and desktop
```

## Recent Updates (May 2025)

### Authentication System Overhaul
- Migrated from magic links to 6-digit verification codes
- Created VerificationCodeScreen with individual digit inputs
- Updated API to support code generation and verification
- Maintained persona system for demos

### UI/UX Improvements
- Created AuthLayout for consistent auth screens
- Enhanced YieldRangeVisualization accessibility
- Improved form button navigation patterns
- Standardized error handling across screens

### Code Quality
- Added comprehensive test coverage for auth flows
- Improved TypeScript-like documentation
- Enhanced mock data realism
- Standardized component patterns

## Documentation References

Detailed documentation for specific features is available in the `/docs` folder:

- [Assessment System](./docs/README-ASSESSMENTS-UPDATE.md)
- [Home Screen Design](./docs/README-HOME-SCREEN-UPDATE-V3.md)
- [Form Components](./docs/README-REFACTORING.md)
- [Progress Bar Implementation](./docs/README-PROGRESS-BAR.md)
- [Report Viewer](./docs/README-REPORT-VIEWER.md)
- [Settings Screen](./docs/README-SETTINGS-SCREEN.md)
- [User Personas](./docs/README-USER-PERSONAS.md)
- [UX Consistency Guide](./docs/README-UX-CONSISTENCY.md)

## Future Roadmap

1. **Backend Integration**
   - REST API with Node.js/Express
   - PostgreSQL database
   - JWT authentication
   - Real verification code emails

2. **Enhanced Features**
   - Offline mode for field use
   - Camera integration for visual assessment
   - GPS auto-location
   - Push notifications
   - Data export (PDF, CSV)

3. **Performance**
   - Code splitting
   - Service workers
   - Image optimization
   - PWA capabilities

---

This project is actively maintained and designed for real-world farming operations in New Zealand and beyond.