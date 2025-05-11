# Beet Guru App

Beet Guru is a modern React application for farmers to manage beet crop assessments, measure dry matter content, and plan feeding schedules. The app allows farmers to conduct assessments by harvesting small samples from their fields, record measurements, and generate reports on feed quantities and duration.

## Project Overview

The application follows a mobile-first approach since farmers primarily use it directly in the field on their mobile devices. However, it also has a fully functional desktop interface for office use. The project is currently a front-end mockup with no backend integration.

## Key Features

- User authentication (login/registration)
- Create and manage crop assessments
- Record field measurements and dry matter percentages 
- Calculate feed quantities and feeding duration
- Generate reports for better crop management
- User profile management
- Location management
- Stock Feed Calculator

## Technical Implementation

- Built with React
- Styled with Tailwind CSS
- Icons from Lucide React
- Responsive design with mobile and desktop views
- State management through React hooks (no Redux)

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── layout/        # Layout components (Sidebar, Header, BottomNav)
│   ├── ui/            # UI elements (cards, buttons)
│   └── screens/       # Main screen components 
├── assets/            # Images, icons, etc.
└── utils/             # Helper functions
```

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

## Home Screen Updates (May 2025)

The home screen has been completely redesigned to improve user experience and make important information more accessible:

### Key Changes
- Renamed "Dashboard" to "Home" throughout the application for more intuitive navigation
- Added a prominent "New Assessment" button at the top of the screen for quick access
- Redesigned layout with different arrangements for mobile and desktop views
- Mobile view now uses a stacked single-column layout
- Desktop view uses a grid layout with 2/3 and 1/3 width columns
- Removed Recent Assessments widget to simplify the interface
- Relocated Feed Forecast widget to the dedicated Stock Feed screen
- Added a non-expandable Cultivar Information widget with fixed display
- Added a Seasonal Timeline widget showing growing seasons
- Added a Weather Widget specifically for Oxford, Canterbury
- Added a Reminder Widget to show notifications and actionable items

### New Features
- **Stock Feed Calculator**: Added a dedicated screen for calculating feed duration based on stock count, feed amount, and dry matter percentage
- **Cultivar Information**: Fixed-height widget showing details about beet cultivars (no longer expandable/collapsible)
- **Seasonal Timeline**: Visual representation of planting, growing, and harvesting seasons for fodder beet in Canterbury, NZ
- **Reminders**: Actionable notifications for assessments and other farm tasks

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

## Authentication

The app includes a fake login and registration flow that allows for demonstration without actual backend integration.

### Login Features
- Two-step login process:
  - First click on "Continue" fills in sample credentials
  - Second click on "Sign in" completes login
- Remember me option and forgot password link (visual only)

### Registration Features
- Clean registration form with all necessary fields
- User type selection (Farmer/Retailer)
- Subscription and terms agreement options
- Two-step process similar to login

### Authentication State Management
- Simple state management in App.js
- User information persisted during the session
- Profile details displayed in sidebar and mobile "More" screen
- Functional logout that returns to login screen

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
- View and create assessments
- View reports
- Use the Stock Feed Calculator
- Log out via the sidebar or "More" tab

## Implementation Details

### Navigation Improvements
- Better separation between mobile and desktop layouts
- Proper z-index management for sidebar and overlays
- Improved responsive behavior with cleaner breakpoints
- Conditional rendering based on device type
- Visual consistency across all screens

### Home Screen Implementation
- Uses conditional rendering based on the isMobile flag for responsive layouts
- Implements modern Tailwind CSS styling for clean user interface
- Widget components are reusable and self-contained
- Fixed-height Cultivar Information widget for better user experience
- Responsive design adapts to different screen sizes

### Authentication Implementation
- Form validation is intentionally bypassed for smooth demo experience
- Separate handler functions for form filling and submission
- State reset when navigating between screens
- Consistent behavior between forms

## Development Notes

- The current implementation is a front-end mockup only
- No actual authentication or data persistence
- Focus on user experience and interface design
- Responsive design that works well on both mobile and desktop

## Future Improvements

1. Backend integration for real authentication and data persistence
2. Proper form validation
3. Error handling for edge cases
4. Enhanced reporting features
5. Offline mode for field use
6. Data synchronization
7. Advanced analytics for crop planning
8. Location-based weather data

This project is designed as a starting point for a fully-featured crop management application, with a focus on usability for farmers in the field.
