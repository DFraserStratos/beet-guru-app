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
- Log out via the sidebar or "More" tab

## Implementation Details

### Navigation Improvements
- Better separation between mobile and desktop layouts
- Proper z-index management for sidebar and overlays
- Improved responsive behavior with cleaner breakpoints
- Conditional rendering based on device type
- Visual consistency across all screens

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

This project is designed as a starting point for a fully-featured crop management application, with a focus on usability for farmers in the field.
