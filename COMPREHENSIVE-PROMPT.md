# Updated Comprehensive Prompt for Beet Guru App Project

## Project Overview 
You are working on a React application called Beet Guru, designed for farmers to manage beet crop assessments, measure dry matter content, and plan feeding schedules. The app allows farmers to conduct assessments by harvesting small samples from their fields, record measurements, and generate reports on feed quantities and duration.
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
- Stock Feed Calculator with WIP disclaimer
- Settings screen with profile, farm details, and security sections
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
- Custom hooks for reusable functionality
- Error boundaries for improved error handling
- API service layer with mock data
- Reusable form components
- No routing library - uses component-based navigation

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
├── assets/            # Images, icons, etc.
└── utils/             # Helper functions
```

## Navigation System
The app uses different navigation patterns for desktop and mobile:

### Desktop Navigation
- Left sidebar (64px width, dark green background)
- No top header
- Main navigation links in the sidebar with Locations before Stock Feed
- User profile card below the divider line
- Settings and logout options below the user card
- App version and copyright displayed at the bottom of the sidebar

### Mobile Navigation
- Bottom tab navigation with four main sections: Home, Assessments, Reports, More
- Simple header with left-aligned logo and app name
- User profile accessed through the "More" tab
- Settings and app info in the "More" tab
- "More" menu now lists Locations before Stock Feed for consistency
- Tab-based navigation within specific screens (like Settings)

## Visual Language Guide
The Beet Guru application follows a consistent visual language across all screens:

### Layout Structure
- **Page Header Cards**: Every main screen starts with a white card with title and description
- **Card-Based Containers**: Content is organized in rounded white cards with subtle shadows
- **Consistent Spacing**: 1.5rem (24px) spacing between major UI elements
- **Full-Width Cards**: Cards extend to the full width of the container on mobile
- **Responsive Grid**: Desktop views use grid layouts where appropriate

### Typography
- **Page Titles**: 1.5rem (24px), bold, dark gray (#1F2937)
- **Section Headers**: 1.25rem (20px), bold, dark gray
- **Descriptive Subtitles**: 1rem (16px), regular, medium gray (#4B5563)
- **Body Text**: 0.875rem (14px), regular, dark gray
- **Supporting Text**: 0.75rem (12px), regular, light gray

### Color Palette
- **Primary Brand**: Green (#16A34A)
- **Primary Dark**: Dark green (#166534) for active/hover states
- **Background**: Light gray (#F9FAFB) for page background
- **Container Background**: White (#FFFFFF) for cards and content containers
- **Text**: Dark gray (#1F2937) for primary text
- **Supporting Text**: Medium gray (#4B5563) for descriptions and subtitles
- **Muted Text**: Light gray (#9CA3AF) for tertiary information
- **Warning/Disclaimer**: Amber (#FEF3C7 background, #92400E text, #F59E0B border) for WIP features
- **Status Colors**:
  - Yellow (#FEF3C7 background, #92400E text) for draft/pending states
  - Gray (#F3F4F6 background, #1F2937 text) for neutral states

For complete details on the visual language, refer to README-UX-CONSISTENCY.md.

## Key Components
### Layout Components
- **Sidebar.js**: Desktop navigation sidebar with user profile
- **Header.js**: Mobile-only top header with app logo and name
- **BottomNav.js**: Mobile-only bottom tab navigation

### Screen Components
- **HomeScreen.js**: Main dashboard with key information widgets in a 2×2 grid layout for desktop
- **LoginScreen.js**: User authentication screen (uses form components and hooks)
- **RegisterScreen.js**: New user registration screen
- **AssessmentsScreen.js**: List of locations with their assessment status (Draft/Not Started)
- **NewAssessmentScreen.js**: Multi-step wizard for creating assessments (uses assessment components)
- **ReportsScreen.js**: View and management of completed reports (table on desktop, cards on mobile)
- **StockFeedScreen.js**: Feed calculator and forecasting tools with WIP disclaimer
- **SettingsScreen.js**: User profile, farm details, and security settings with tab navigation
- **MoreScreen.js**: Additional options, user profile, settings, etc.

### UI Components
- **WeatherWidget.js**: Displays weather conditions for Oxford, Canterbury with both mobile and desktop views
- **CultivarInfoWidget.js**: Information about beet varieties with simplified view option
- **SeasonalTimeline.js**: Visual calendar of growing seasons with pastel color scheme
- **ReminderWidget.js**: Action items and notifications for users (replaced by Action Items in HomeScreen V3)
- **LocationCard.js**: Card component for displaying location with status
- **AssessmentTable.js**: Reusable table component for displaying data
- **form/FormField.js**: Reusable form input component with validation
- **form/FormButton.js**: Standardized button component with variants
- **form/FormButtonNav.js**: Mobile-optimized button navigation component for forms

### Assessment Components
- **StepProgress.js**: Wizard progress indicator for multi-step forms with precise dot alignment
- **CropDetailsStep.js**: First step of assessment creation (crop information)
- **FieldSetupStep.js**: Second step of assessment creation - restructured with Field Measurements and Dry Matter Estimates sections, includes real-time area calculation
- **MeasurementsStep.js**: Third step of assessment creation - captures leaf weight, bulb weight, and plant count with ability to add multiple samples
- **ReviewStep.js**: Fourth step of assessment creation (review and generate reports)

### Utility Components
- **ErrorBoundary.js**: Component that catches JavaScript errors and displays fallback UI

### Custom Hooks
- **useDeviceDetection**: Detects device type based on screen width
- **useForm**: Handles form state, validation, and submission
- **useLocalStorage**: Persists state in localStorage
- **useApi**: Handles API calls with loading and error states

## State Management
The application uses React's built-in hooks for state management:
- **App.js**: Core component managing:
  - Authentication state (`isAuthenticated`)
  - Current user information (`user`) - uses useLocalStorage hook
  - Active screen (`activeScreen`)
  - Device type detection (`isMobile`) - uses useDeviceDetection hook
  - Authentication screen type (`authScreen`)
  - Selected location (`selectedLocation`)
  - Draft assessment (`draftAssessment`)
  - Uses `handleNavigate` function for screen transitions
  - Handles starting assessments and continuing drafts
- Component-level state is managed within individual components
- Custom hooks provide reusable state logic
- Forms use the useForm hook for consistent handling
- API calls use the useApi hook for loading and error states

## API Service Layer
The app includes a service layer for API calls:

### API Structure
- `authAPI`: Authentication methods (login, register)
- `assessmentsAPI`: Assessment CRUD operations, including draft management and completion status
- `reportsAPI`: Report generation and management
- `referencesAPI`: Reference data (locations, cultivars, etc.)

### Features
- Structured mock data for demonstration
- Consistent error handling
- Simulated API delays for realistic behavior
- Ready for integration with real backend
- Locations include status (draft, not-started)
- Reports include historical data, cultivar, and season information

## Home Screen V3 (May 2025)
We've implemented a complete redesign of the HomeScreen with the following key enhancements:

### Key Features
- **Optimized Grid Layout**: 
  - Separate mobile (stacked) and desktop (2×2 grid) layouts
  - Desktop uses precise 12-column grid with 8-4 column splits
  - Perfect alignment at widget intersections
  - Consistent spacing and sizing

- **Enhanced Content**:
  - Action Items card with color-coded notifications (yellow for urgent, blue for informational)
  - Growing Season widget with pastel-colored timeline
  - Additional seasonal notes section on desktop
  - Weather Widget showing Oxford, Canterbury conditions
  - Cultivar Information widget with reference data

- **Visual Improvements**:
  - Pastel color scheme for seasonal indicators (green, blue, amber)
  - Card-based design for all content with subtle shadows
  - Consistent typography and spacing
  - Proper responsive behavior with completely separate mobile/desktop layouts

### Implementation Details
- Completely separate DOM structures for mobile and desktop for perfect control
- Height management with h-full to ensure consistent row heights
- FormButton integration in the header card
- Color-coded notifications with action buttons
- Responsive components that adapt to their container size

See [README-HOME-SCREEN-UPDATE-V3.md](./README-HOME-SCREEN-UPDATE-V3.md) for complete details.

## Recent Updates

### Home Screen V3 Update (May 2025)
- Completely redesigned layout with optimized 2×2 grid for desktop
- Implemented separate mobile and desktop layouts for maximum control
- Added Action Items widget with color-coded notifications
- Updated seasonal timeline with pastel color scheme
- Added desktop-only seasonal notes section
- Standardized header card with integrated action button
- Enhanced widget components with improved h-full support
- Improved alignment and spacing between all elements
- Implemented 12-column grid system for precise layout control
- See [README-HOME-SCREEN-UPDATE-V3.md](./README-HOME-SCREEN-UPDATE-V3.md) for details

### Measurements Form Updates (May 2025)
- Redesigned the MeasurementsStep component to capture leaf weight, bulb weight, and plant count
- Simplified the form by showing only one sample by default instead of multiple
- Added ability to add more samples from different field areas when needed
- Removed helper text and notes field for a cleaner interface
- Updated the yield preview graph to visualize leaf, bulb, and total weights
- Streamlined with a simplified info message for better user experience
- Fixed initialization logic to ensure only a single sample is displayed initially
- See [README-MEASUREMENTS-FORM.md](./README-MEASUREMENTS-FORM.md) for details

### Field Setup Form Updates (May 2025)
- Reorganized the form into distinct sections for Field Measurements and Dry Matter Estimates
- Added real-time area calculation for sample measurements (Row Spacing × Measurement Length = Area in m²)
- Added Measurement Length field under Field Measurements section
- Added Bulb Estimate and Leaf Estimate fields under Dry Matter Estimates section
- Added toggle between Estimate and Actual value types for dry matter content
- Improved form handling to allow clearing and editing all fields
- Maintained sensible defaults with user-friendly placeholders
- Fixed form state management to properly handle empty fields
- Implemented local form state for better control of field values
- See [README-FIELD-SETUP-FORM.md](./README-FIELD-SETUP-FORM.md) for details

### Progress Bar Improvements (May 2025)
- Enhanced the StepProgress component with precise dot and track alignment
- Fixed issues with the progress bar extending past endpoints
- Implemented dynamic progress calculation based on current step
- Used proper z-index layering for visual continuity
- Ensured progress dots visually connect with the track
- Made component responsive across different screen sizes
- Implemented DOM-based measurement for exact positioning
- See [README-PROGRESS-BAR.md](./README-PROGRESS-BAR.md) for details

### Form Button Fixes (May 2025)
- Created a new reusable `FormButtonNav` component for consistent button layouts across forms
- Implemented mobile-optimized button layout with vertical stacking and full-width buttons
- Fixed spacing issues between form cards and bottom navigation in mobile view
- Established a clear button hierarchy for easy thumb access on mobile devices
- Fixed an initial circular dependency issue that was causing runtime errors
- Added proper bottom margin to form cards to ensure spacing above navigation
- Made buttons more accessible with larger tap targets on mobile

For complete details, see README-FORM-BUTTON-FIXES.md.

### Settings Screen Implementation (May 2025)
- Added a comprehensive Settings screen with three key sections:
  - Profile Information (name, email, role, phone)
  - Farm Details (farm address in Oxford, Canterbury, New Zealand)
  - Security (password management)
- Implemented intuitive mobile navigation with tab buttons and Next/Previous navigation
- Consistent design with the rest of the application

### Stock Feed Calculator Updates (May 2025)
- Added WIP disclaimer to Stock Feed Calculator indicating it's a concept exploration
- Improved UI consistency with standard page header card
- Created a clear visual hierarchy (Page Header → Disclaimer → Content)

### UX Consistency Update (May 2025)
- Aligned visual design across Assessments, Reports, and Locations screens
- Enhanced Reports screen with cultivar/season columns and improved filtering
- Updated navigation ordering for consistency
- Added detailed visual language documentation
- Standardized page header cards across all screens

For complete details, see README-UX-CONSISTENCY.md.

### Assessments and Reports Update (May 2025)
- Split functionality between Assessments (in-progress) and Reports (completed)
- Redesigned screens with status indicators and improved mobile views
- Added draft assessment continuation functionality

For complete details, see README-ASSESSMENTS-UPDATE.md.

### Code Refactoring (May 2025)
- Implemented custom hooks, error boundaries, and service layer
- Created reusable components and improved documentation

### Navigation Fixes (April 2025)
- Improved sidebar layout and mobile navigation
- Fixed responsive layout issues

## Form Component Usage
The app uses standardized form components:

### FormField
```jsx
<FormField
  label="Email address"
  name="email"
  type="email" // text, email, password, number, select, textarea, checkbox
  placeholder="you@example.com"
  value={values.email}
  onChange={handleChange}
  onBlur={handleBlur}
  error={errors.email}
  touched={touched.email}
  options={selectOptions} // for select type
  hint="Helper text goes here"
  required={true}
/>
```

### FormButton
```jsx
<FormButton
  onClick={handleClick}
  variant="primary" // primary, secondary, outline, danger, link
  size="md" // sm, md, lg
  isLoading={loading}
  fullWidth={false}
  icon={<IconComponent />}
>
  Button Text
</FormButton>
```

### FormButtonNav
```jsx
<FormButtonNav
  onNext={handleNext}
  onBack={handleBack}
  onCancel={handleCancel}
  onSaveAsDraft={handleSaveAsDraft}
  nextLabel="Continue" // or "Generate Report", etc.
  showSaveAsDraft={true}
  showBack={true}
  isGeneratingReport={false}
  isMobile={isMobile}
/>
```

## Step Progress Component
The StepProgress component provides a visual indicator for multi-step forms:

```jsx
<StepProgress 
  currentStep={2} 
  steps={['Crop Details', 'Field Setup', 'Measurements', 'Review']} 
/>
```

### Features
- Numbered step indicators with color coding for current/completed/upcoming steps
- Text labels for each step
- Gray track showing the full path from the first to the last dot
- Green progress indicator that advances as steps are completed
- Proper visual connection between dots and track with z-indexing
- Responsive design that adapts to different screen sizes

### Implementation
- Uses CSS Grid for layout and alignment
- DOM measurements for precise positioning
- Dynamic calculation of progress based on current step
- No elements extending beyond the first and last dots
- See [README-PROGRESS-BAR.md](./README-PROGRESS-BAR.md) for full details

## Field Setup Form
The Field Setup form has been restructured into logical sections:

### Field Measurements Section
- **Row Spacing (m)**: Distance between planted rows (default: 0.5m)
- **Measurement Length (m)**: Length of the sample area (default: 4m)
- **Area Calculation**: Shows the calculated area (Row Spacing × Measurement Length) in square meters
- Calculation updates dynamically as values change

### Dry Matter Estimates Section
- **Bulb Estimate (DM%)**: Expected dry matter percentage of bulbs (default: 2%)
- **Leaf Estimate (DM%)**: Expected dry matter percentage of leaves (default: 3%)
- **Value Type Toggle**: Switch between "Estimate" and "Actual" value types

### Form Handling Features
- All fields can be edited and cleared
- Placeholders show expected values when fields are empty
- Input validation with appropriate min/max values
- User-friendly form state management
- See [README-FIELD-SETUP-FORM.md](./README-FIELD-SETUP-FORM.md) for full details

## Sample Measurements Form
The Measurements step has been redesigned to capture specific plant data:

### Sample Measurement Fields
- **Leaf Weight (kg)**: Weight of leaves from the sample
- **Bulb Weight (kg)**: Weight of bulbs from the sample
- **Plant Count**: Number of plants in the sample

### Key Features
- Clean, focused interface with only essential fields
- Starts with one sample by default for simplicity
- "Add Sample" button to add multiple samples from different field areas
- Ability to remove additional samples if needed
- Real-time yield preview graph showing leaf, bulb, and total weights
- Simple, concise information message for better user guidance

### Implementation
- Carefully handles initialization to ensure only one sample is shown initially
- Uses consistent FormField components for measurements
- Proper input validation with appropriate min values and step intervals
- Responsive grid layout for desktop and mobile views
- See [README-MEASUREMENTS-FORM.md](./README-MEASUREMENTS-FORM.md) for details

## Mobile Form Navigation
The new mobile form navigation system follows these principles:
- Buttons are stacked vertically in order of importance
- Primary actions are positioned at the bottom for easy thumb access
- Full-width buttons provide larger tap targets
- Button spacing prevents accidental taps
- Clear visual hierarchy distinguishes between actions:
  1. Primary action (Continue/Generate Report): Bold green background
  2. Back action: Gray secondary button
  3. Save as Draft: Outline button
  4. Cancel: Least prominent with link styling

## Settings Screen
The SettingsScreen component includes:

### Profile Information
- Full Name
- Email Address
- Role (e.g., Farm Manager)
- Phone Number

### Farm Details
- Farm Name (Oxford Valley Farm)
- Farm Address (123 Canterbury Plains Rd)
- City (Oxford)
- Postal Code (7495)
- Region (Canterbury)
- Country (New Zealand)

### Security Settings
- Change Password functionality

### Mobile Navigation
- Tab buttons at the top for quick section switching
- Next/Previous buttons at the bottom for sequential navigation

## Stock Feed Calculator
The StockFeedScreen component includes:

### WIP Disclaimer
- Amber/yellow warning banner with AlertTriangle icon
- Explanation that it's a work-in-progress concept exploration
- Caution that calculations use simplified models

### Calculator Features
- Input fields for stock count, feed amount, and dry matter percentage
- Results display showing estimated feeding duration
- Option to save calculations to reports

## Data Structure
The app currently uses mock data for demonstration:
- Locations include name, area, coordinates, and assessment status
- Assessments include date, location, crop type, dry matter, and status
- Reports include title, date, location, cultivar, and season information
- Season format follows agricultural standard: YYYY/YYYY (e.g., 2024/2025)

## Assessment System
The assessment system allows farmers to record and track beet crop measurements:

### Assessment Workflow
1. Navigate to Assessments screen to see available locations
2. For a "Draft" location, continue the in-progress assessment
3. For a "Not Started" location, start a new assessment with that location pre-filled
4. Or create a new assessment from scratch via the "New Assessment" button
5. Step 1: Enter crop details (crop type, cultivar, planting date, water type)
6. Step 2: Configure field setup (now with separate Field Measurements and Dry Matter Estimates sections)
7. Step 3: Record sample measurements (leaf weight, bulb weight, plant count) with ability to add multiple samples
8. Step 4: Review results and generate a report with yield estimates and feeding projections

### Fields Setup Form
- Recently restructured for better organization
- New real-time area calculation feature
- Separate sections for Field Measurements and Dry Matter Estimates
- Value type toggle between Estimate and Actual
- Improved form state management for better user experience
- All fields can be cleared and edited as needed

## Report System
The reports system allows farmers to view and manage assessment reports:

### Report Features
- View reports in table format (desktop) or card format (mobile)
- See cultivar and season information for each report
- Filter reports by date range, cultivar, and season
- Sort reports by different criteria (date, location, cultivar)
- View, edit, and send/resend reports to recipients

## Authentication System
The app includes a demonstration login and registration flow:

### Login Features
- Two-step login process for demonstration (uses the useForm hook)
- Error handling for incorrect credentials
- Remember me option and forgot password link (visual only)

### Registration Features
- Registration form with user type selection (Farmer/Retailer)
- Subscription and terms agreement options

## Error Handling
The app uses error boundaries to catch and handle JavaScript errors:
```jsx
<ErrorBoundary>
  <ComponentThatMightFail />
</ErrorBoundary>
```
Key components are wrapped with error boundaries to prevent cascading failures.

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
- Filter reports by cultivar, season, and date range
- Use the Stock Feed Calculator (note the WIP disclaimer)
- Access Settings via the sidebar (desktop) or "More" tab (mobile)
- Log out via the sidebar or "More" tab

## Common UI Patterns
- All main screens start with a Page Header Card containing title and description
- Content is organized in card-based containers with consistent styling
- Mobile screens often use tab navigation for multi-section content
- Sequential steps use Previous/Next navigation at the bottom
- WIP features display amber/yellow warning banners
- Form cards maintain proper spacing from the bottom navigation bar
- Form buttons use consistent layout and hierarchy
- Progress bars have precisely aligned dots and tracks
- Area calculators use green-themed display with Calculator icon
- Form fields have clear labels and helpful placeholder text

## Current Limitations
- Front-end mockup only, no backend integration
- All data is static/mocked (in the API service layer)
- No actual data persistence (except for localStorage usage)
- Focus on UX/UI rather than full functionality
- Stock Feed Calculator is marked as a work-in-progress concept

## Development Best Practices
- Use custom hooks for reusable functionality
- Leverage form components for all form inputs
- Follow the component composition pattern
- Wrap key components with error boundaries
- Use the API service for data fetching
- Follow the established visual language for new screens
- Adhere to the component patterns documented in the README
- Place page headers at the top of all main screens
- Use appropriate warning banners for WIP features
- Ensure proper spacing between elements, especially in mobile views
- Use the FormButtonNav component for consistent form navigation
- Use DOM measurements for precise component alignment when needed
- Implement proper z-indexing for layered UI elements
- Use local state for form controls when needed (as in FieldSetupStep.js)
- Apply sensible defaults with appropriate placeholders
- Ensure all form fields can be edited and cleared without issues

## Current Projects
We've just completed the HomeScreen V3 update which includes a comprehensive redesign of the home screen with optimized layout, enhanced content, and visual improvements. This update focuses on providing a better user experience on both mobile and desktop devices with more intuitive presentation of information.

A pull request has been created for the HomeScreen V3 update in the home-screen-update-v3 branch. The PR includes all necessary component updates, documentation, and README updates.

## Repository Information
The project is hosted on GitHub at `DFraserStratos/beet-guru-app`