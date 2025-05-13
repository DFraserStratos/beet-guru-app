# Beet Guru App

Beet Guru is a modern React application for farmers to manage beet crop assessments, measure dry matter content, and plan feeding schedules. The app allows farmers to conduct assessments by harvesting small samples from their fields, record measurements, and generate reports on feed quantities and duration.

## Project Overview

The application follows a mobile-first approach since farmers primarily use it directly in the field on their mobile devices. However, it also has a fully functional desktop interface for office use. The project is currently a front-end mockup with no backend integration.

## Domain Knowledge: Beet Farming Concepts

To understand the application fully, it's important to know these key concepts:

- **Fodder Beet**: A high-yielding root crop grown for livestock feed, particularly popular in New Zealand
- **Dry Matter (DM)**: The non-water content of feed, typically expressed as a percentage
- **Cultivars**: Different varieties of beet with varying characteristics (yield, dry matter, etc.)
- **Assessment**: The process of sampling and measuring crop yield and quality
- **Strip Grazing**: A feeding method where livestock are given access to a small strip of crop at a time

## Key Features

- User authentication (login/registration)
- Create and manage crop assessments
- Record field measurements and dry matter percentages 
- Calculate feed quantities and feeding duration
- Generate reports for better crop management
- User profile management
- Location management
- Stock Feed Calculator
- Cultivar information reference
- Seasonal timeline visualization
- Weather information display
- Reminder system for farm tasks

## Technical Implementation

- Built with React 18.2.0
- Styled with Tailwind CSS 3.3.3
- Icons from Lucide React 0.294.0
- Responsive design with mobile and desktop views
- State management through React hooks (no Redux)
- Custom hooks for common functionality
- API service layer with mock data
- Error boundaries for improved error handling
- Reusable form components

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── assessment/    # Assessment wizard components
│   ├── layout/        # Layout components (Sidebar, Header, BottomNav)
│   ├── screens/       # Main screen components 
│   ├── ui/            # UI elements (cards, buttons, widgets, forms)
│   └── utility/       # Utility components (ErrorBoundary, etc.)
├── hooks/             # Custom React hooks
├── services/          # API services
└── utils/             # Helper functions
```

### Key Components Overview

#### Layout Components
- **Sidebar.js**: Desktop navigation sidebar (64px width, dark green background)
- **Header.js**: Mobile-only top header with app logo and name
- **BottomNav.js**: Mobile-only bottom tab navigation

#### Screen Components
- **LoginScreen.js**: User authentication screen
- **RegisterScreen.js**: New user registration screen
- **HomeScreen.js**: Main dashboard with key information widgets
- **AssessmentsScreen.js**: List of locations with status indicators
- **NewAssessmentScreen.js**: Multi-step form for creating new crop assessments
- **ReportsScreen.js**: View and management of generated reports
- **StockFeedScreen.js**: Feed calculator and forecasting tools
- **MoreScreen.js**: Additional options, user profile, settings, etc.

#### UI Components
- **WeatherWidget.js**: Displays weather conditions for Oxford, Canterbury
- **CultivarInfoWidget.js**: Information about beet varieties
- **SeasonalTimeline.js**: Visual calendar of growing seasons
- **ReminderWidget.js**: Action items and notifications for users
- **LocationCard.js**: Displays location with status (Draft/Not Started)
- **AssessmentTable.js**: Reusable table component for displaying data
- Form components (FormField, FormButton) for consistent styling

#### Assessment Components
- **StepProgress.js**: Wizard progress indicator for multi-step forms
- **CropDetailsStep.js**: Step 1 of assessment creation
- **FieldSetupStep.js**: Step 2 of assessment creation - field measurements and dry matter estimates
- **MeasurementsStep.js**: Step 3 of assessment creation
- **ReviewStep.js**: Step 4 of assessment creation

#### Custom Hooks
- **useDeviceDetection**: Detects device type based on screen width
- **useForm**: Handles form state, validation, and submission
- **useLocalStorage**: Persists state in localStorage
- **useApi**: Handles API calls with loading and error states

## State Management

The application uses React's built-in hooks for state management:

- **App.js**: Manages global state including:
  - Authentication state (`isAuthenticated`)
  - Current user information (`user`)
  - Active screen (`activeScreen`)
  - Device type detection (`isMobile`)
  - Authentication screen type (`authScreen`)
  - Selected location (`selectedLocation`)
  - Draft assessment (`draftAssessment`)

- Component-level state is managed within individual components
- Custom hooks provide reusable state logic
- Props are passed down to child components as needed
- No global state management library is currently used

## Navigation System

The app uses different navigation patterns for desktop and mobile:

### Desktop Navigation
- Left sidebar (64px width, dark green background)
- No top header
- Main navigation links in the sidebar
- User profile card below the divider line
- Settings and logout options below the user card
- App version and copyright displayed at the bottom of the sidebar

### Mobile Navigation
- Bottom tab navigation with four main sections (Home, Assessments, Reports, More)
- Simple header with left-aligned logo and app name
- User profile accessed through the "More" tab
- Settings and app info in the "More" tab

### Navigation Implementation
- The `activeScreen` state in App.js controls which screen is displayed
- The `handleNavigate` function updates this state when navigation occurs
- Conditional rendering based on the `isMobile` flag determines which navigation components are shown
- Screen components receive an `onNavigate` prop to trigger navigation from within them

## Home Screen (May 2025)

The home screen provides a dashboard view with important information for farmers:

### Key Components
- Welcome Section with user greeting and app introduction
- Prominent "New Assessment" button for quick access
- ReminderWidget for notifications and action items
- WeatherWidget showing conditions for Oxford, Canterbury
- SeasonalTimeline displaying growing seasons visually
- CultivarInfoWidget with reference information about beet varieties

### Layout Design
- Mobile view: Single-column stacked layout
- Desktop view: Two-column grid (2/3 and 1/3 width columns)
- Responsive design that adapts to different screen sizes

### Home Screen Component Hierarchy
```
HomeScreen
├── Welcome Section
├── New Assessment Button
├── ReminderWidget
├── WeatherWidget
├── SeasonalTimeline
└── CultivarInfoWidget
```

## Assessment System

The assessment system allows farmers to record and track beet crop measurements:

### Assessment Workflow
1. Navigate to Assessments screen to see available locations
2. For a "Draft" location, continue the in-progress assessment
3. For a "Not Started" location, start a new assessment with that location pre-filled
4. Fill in crop details, field setup, and measurements
5. Review and generate a report with yield estimates

### Assessment Components
- **AssessmentsScreen.js**: Shows locations with their assessment status
- **NewAssessmentScreen.js**: Multi-step form for creating assessments
- **LocationCard.js**: Card component for displaying location with status
- Field measurement input forms with validation
- Dry matter and row spacing calculators
- Preview graphs for visualization

### Progress Indicator
The assessment wizard uses a custom StepProgress component that:
- Shows the current step in the multi-step form
- Displays numbered indicators for each step
- Includes a progress bar that advances as steps are completed
- Uses color coding to indicate current, completed, and upcoming steps
- Maintains precise alignment between dots and the progress track
- See [README-PROGRESS-BAR.md](./README-PROGRESS-BAR.md) for details

### Field Setup Form
The Field Setup step provides important tools for measuring crop samples:
- Organized into Field Measurements and Dry Matter Estimates sections
- Real-time calculation of sample area based on row spacing and measurement length
- Input fields for bulb and leaf dry matter estimates
- Toggle between estimate and actual value types
- See [README-FIELD-SETUP-FORM.md](./README-FIELD-SETUP-FORM.md) for details

## Stock Feed Calculator

The Stock Feed Calculator helps farmers plan feeding schedules:

### Features
- Input fields for stock count, feed amount, and dry matter percentage
- Automatic calculation of feeding duration
- Option to save calculations to reports
- Feed forecast visualization

### Components
- **StockFeedScreen.js**: Main screen component
- Form inputs with validation
- Results display with feeding estimates
- Save/export functionality

## Authentication System

The app includes a demonstration login and registration flow:

### Login Features
- Two-step login process:
  - First click on "Continue" fills in sample credentials
  - Second click on "Sign in" completes login
- Remember me option and forgot password link (visual only)
- Error handling for incorrect credentials

### Registration Features
- Clean registration form with all necessary fields
- User type selection (Farmer/Retailer)
- Subscription and terms agreement options
- Two-step process similar to login

### Authentication State Management
- Managed through state in App.js
- `isAuthenticated` flag controls access to the main application
- `user` object contains user details (name, email, role, initials)
- `authScreen` state toggles between login and registration screens
- Functions for handling login, logout, and registration

## Report Generation

The reporting system provides farmers with actionable data:

### Report Features
- Yield estimates based on field measurements
- Feeding duration calculations
- Stock feed requirements
- Visual graphs and charts
- Exportable to email

### Report Display
- Desktop: Table view with columns for Date, Report Title, Location, and Actions
- Mobile: Card view with vertically stacked information for better readability
- Historical reports included for better data analysis over time

## Responsive Design

The application is designed to work well on both mobile and desktop:

### Mobile Considerations
- Touch-friendly UI elements with adequate spacing
- Bottom navigation for easy thumb access
- Simplified layouts for smaller screens
- Card-based displays for better readability and touch interaction
- Vertical scrolling optimized for mobile

### Desktop Enhancements
- Sidebar navigation for efficient screen utilization
- Multi-column layouts for better information density
- Tabular data displays for efficient scanning
- Larger graphs and visualizations

## API Service Layer

The app includes a service layer for API calls:

### API Structure
- `authAPI`: Authentication methods (login, register)
- `assessmentsAPI`: Assessment CRUD operations, including draft management
- `reportsAPI`: Report generation and management
- `referencesAPI`: Reference data (locations, cultivars, etc.)

### Features
- Structured mock data for demonstration
- Consistent error handling
- Simulated API delays for realistic behavior
- Ready for integration with real backend

## Development Environment

### Requirements
- Node.js (v16+)
- npm or yarn
- React 18.2.0
- Tailwind CSS 3.3.3

### Setup Instructions
1. Clone the repository
2. Install dependencies with `npm install` or `yarn`
3. Start development server with `npm start` or `yarn start`
4. Access the app at localhost:3000

### Build Process
- Create production build with `npm run build` or `yarn build`
- Static files will be output to the `build` directory
- Deploy static files to any web server

## Demo Guide

### Using Login Demo
1. When the app loads, you'll see the login screen
2. Click the "Continue" button to fill in fake credentials
3. Click the "Sign in" button to enter the app
4. You'll be logged in as "John Doe"

### Using Registration Demo
1. From the login screen, click "Create new account"
2. Click "Continue" to fill in sample data (Donald)
3. Click "Complete Registration" to finish and log in
4. You'll be logged in with the registered user details

### Using the App
- Navigate between sections using the sidebar (desktop) or bottom tabs (mobile)
- In Assessments, view locations and their status (Draft/Not Started)
- Continue draft assessments or start new ones for specific locations
- View historical reports in the Reports section
- Use the Stock Feed Calculator
- Log out via the sidebar or "More" tab

## Development Notes

- The current implementation is a front-end mockup only
- No actual authentication or data persistence
- Mock data is used throughout the application
- Focus on user experience and interface design
- Responsive design that works well on both mobile and desktop

## Recent Updates History

### Field Setup Form Updates (May 2025)
- Reorganized the form into distinct sections for Field Measurements and Dry Matter Estimates
- Added real-time area calculation for sample measurements
- Added toggle between Estimate and Actual value types for dry matter content
- Improved form handling to allow clearing and editing all fields
- Maintained sensible defaults with user-friendly placeholders
- See [README-FIELD-SETUP-FORM.md](./README-FIELD-SETUP-FORM.md) for details

### Progress Bar Improvements (May 2025)
- Enhanced the StepProgress component with exact alignment between dots and tracks
- Fixed issues with the progress bar extending past endpoints
- Implemented dynamic progress calculation based on current step
- Added proper z-index layering for visual continuity
- Ensured responsive behavior across all screen sizes
- See [README-PROGRESS-BAR.md](./README-PROGRESS-BAR.md) for details

### Assessments and Reports Update (May 2025)
- Split functionality between Assessments (in-progress) and Reports (completed)
- Redesigned Assessments screen to display locations with status indicators
- Added support for starting assessments for specific locations
- Added draft assessment continuation functionality
- Optimized Reports screen for mobile with card-based layout
- Added historical reports spanning multiple years
- Created reusable UI components (LocationCard, AssessmentTable)
- See [README-ASSESSMENTS-UPDATE.md](./README-ASSESSMENTS-UPDATE.md) for details

### Logo Implementation (May 2025)
- Added official Beet Guru logo in two variants (square and wide)
- Implemented wide logo on Login and Registration screens
- Added square logo to Header and Sidebar navigation
- Maintained consistent styling and branding throughout the app
- See [README-LOGO-UPDATE.md](./README-LOGO-UPDATE.md) for details

### Code Refactoring (May 2025)
- Implemented custom hooks for reusable functionality
- Added error boundaries for improved error handling
- Created a service layer for API calls
- Developed reusable form components
- Split large components into smaller, focused ones
- Added comprehensive documentation
- See [README-REFACTORING.md](./README-REFACTORING.md) for details

### Home Screen Update (May 2025)
- Renamed "Dashboard" to "Home" for more intuitive navigation
- Added prominent "New Assessment" button
- Redesigned layout for both mobile and desktop views
- Removed Recent Assessments widget to simplify the interface
- Relocated Feed Forecast widget to the dedicated Stock Feed screen
- Added non-expandable Cultivar Information widget
- Added Seasonal Timeline and Weather Widgets
- Added Reminder Widget for notifications
- See [README-HOME-SCREEN-UPDATE.md](./README-HOME-SCREEN-UPDATE.md) for details

### Navigation Fixes (April 2025)
- Removed header on desktop view
- Repositioned user profile card in sidebar
- Simplified mobile header
- Placed app version and copyright on a single line
- Fixed z-index issues with overlapping elements
- Improved responsive breakpoints behavior
- See [README-NAVIGATION-FIXES.md](./README-NAVIGATION-FIXES.md) for details

## Future Improvements Roadmap

1. Backend Integration
   - RESTful API development with Node.js/Express
   - MongoDB database for data persistence
   - Authentication with JWT

2. Enhanced Features
   - Proper form validation
   - Error handling for edge cases
   - Enhanced reporting features
   - Data export options (PDF, CSV)
   - Custom date ranges for reports

3. Advanced Functionality
   - Offline mode for field use
   - Data synchronization when connection is restored
   - Push notifications for important reminders
   - Geolocation for automatic weather data
   - Camera integration for visual assessment

4. Performance Optimization
   - Code splitting for faster loading
   - Service workers for offline functionality
   - Optimized assets for mobile networks
   - Memory usage improvements

5. User Experience Enhancements
   - Advanced data visualization
   - Guided onboarding for new users
   - Customizable dashboard
   - Accessibility improvements
   - Dark mode option

This project is designed as a starting point for a fully-featured crop management application, with a focus on usability for farmers in the field.