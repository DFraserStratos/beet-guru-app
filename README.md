# Beet Guru App

A modern, mobile-first React application for farmers to manage beet crop assessments, measure dry matter, and plan feeding schedules.

## Overview

Beet Guru allows farmers to:
- Create and manage crop assessments
- Record field measurements and dry matter percentages
- Calculate feed quantities and feeding duration
- Generate reports for better crop management

## Mobile-First Approach

This application has been designed with a mobile-first approach, making it ideal for farmers to use directly in the field:

- **Responsive Layout**: Adapts seamlessly between mobile devices and desktop screens
- **Touch-Optimized**: Larger touch targets and simplified navigation on mobile
- **Bottom Navigation**: Tab-based navigation on mobile for easy one-handed operation
- **Card-Based UI**: Content presented in easy-to-read cards on mobile instead of tables
- **Collapsible Filters**: Filters are hidden by default on mobile to maximize content space
- **Optimized Forms**: Form inputs and controls sized appropriately for touch interaction
- **Contextual UI**: Different UI components shown based on screen size for optimal experience
- **Performance Focused**: Minimized layout shifts and optimized rendering for mobile devices

## Navigation Design Rules

The application uses distinct navigation patterns for mobile and desktop views:

### Desktop Navigation Rules

1. **Sidebar Navigation**:
   - Always visible on the left side of the screen
   - Fixed width of 64px (w-64 class)
   - Deep green background (bg-green-800) with white text
   - Contains app logo and name at the top
   - Main navigation links in the middle section
   - User profile card, settings, and logout at the bottom

2. **No Top Header**:
   - Desktop view intentionally does not use a top header bar
   - Maximizes vertical space for content
   - All navigation is handled through the sidebar

3. **User Profile Display**:
   - User profile card appears in the sidebar below the main navigation
   - Positioned below the divider line but above settings/logout options
   - Shows user initials, name, email, and role
   - Uses a slightly darker green background (bg-green-700) to stand out

4. **App Information**:
   - Version number and copyright appear at the bottom of the sidebar
   - Single line with bullet point separator
   - Subtle styling with reduced opacity

### Mobile Navigation Rules

1. **Bottom Tab Navigation**:
   - Primary navigation through bottom tabs
   - Fixed to the bottom of the screen
   - Four key sections: Home, Assessments, Reports, More
   - Active tab highlighted in green
   - Icons positioned above labels for clarity

2. **Top Header**:
   - Simple header with app logo and name
   - Left-aligned to match desktop sidebar header
   - No search or user icons in the header
   - Green background consistent with the app's color scheme

3. **User Profile Access**:
   - User profile information accessed through the "More" tab
   - Displayed as a card at the top of the More screen
   - Shows larger user initials, name, email, and role
   - White background with green accents

4. **App Information**:
   - Version and copyright appear at the bottom of the More screen
   - Displayed in a card with subtle styling

### Cross-Device Consistency Rules

1. **Color Scheme**:
   - Green is the primary color (various shades)
   - White text on dark green backgrounds
   - Consistent application of colors across device sizes

2. **Information Architecture**:
   - Same core navigation options on both mobile and desktop
   - Consistent naming and iconography
   - Same data displayed, just adapted to different layouts

3. **User Profile**:
   - Consistent information shown (initials, name, email, role)
   - Adapted to different layouts but maintaining visual connection

4. **Responsive Breakpoints**:
   - Mobile view: < 768px width
   - Desktop view: ≥ 768px width
   - No tablet-specific view (uses either mobile or desktop based on width)

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

## Key Components

- **App.js**: Main application component with responsive layout logic
  - Manages activeScreen state and isMobile detection
  - Conditionally renders Header and BottomNav based on screen size
  - Handles navigation through handleNavigate function

- **BottomNav.js**: Mobile-specific bottom tab navigation
  - Fixed to bottom of screen on mobile only
  - Contains four main navigation tabs
  - Highlights active section

- **Sidebar.js**: Desktop navigation sidebar
  - Shows on desktop, hidden on mobile
  - Contains app branding, main navigation, user info, and settings
  - Includes app version and copyright at bottom

- **Header.js**: Mobile-specific header
  - Only shows on mobile devices
  - Simple design with app logo and name
  - Left-aligned to match desktop sidebar

- **Screen Components**: 
  - Content components that adapt to both mobile and desktop views
  - Use responsive designs based on isMobile prop
  - Often display as cards on mobile and tables on desktop

## Component State Management

- **activeScreen**: Tracks the currently active section/screen
- **isMobile**: Boolean state determined by window width (< 768px)
- **handleNavigate**: Function to change the active screen

## Mobile-Desktop Differences

| Feature | Mobile | Desktop |
|---------|--------|---------|
| **Primary Navigation** | Bottom tabs | Left sidebar |
| **Header** | Simple app logo and name | None |
| **Content Layout** | Card-based, stacked | Table-based, spread |
| **User Profile** | In More tab | In sidebar |
| **Filters** | Collapsible | Always visible |
| **Actions** | Simplified, prioritized | Complete set |
| **Data Display** | Limited columns, focused | Full data tables |
| **App Info** | In More tab | At sidebar bottom |

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/DFraserStratos/beet-guru-app.git
cd beet-guru-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. The application will be available at http://localhost:3000

## Dependencies

- React
- Lucide React (for icons)
- Tailwind CSS (for styling)

## Mobile-First Best Practices Implemented

- **Content Prioritization**: Essential content first, secondary content accessible but not immediate
- **Touch-First Design**: UI elements sized and spaced appropriately for touch interaction
- **Progressive Enhancement**: Basic functionality works on all devices, enhanced on larger screens
- **Responsive Images**: Image sizes optimized for mobile screens
- **Minimal Text Entry**: Forms designed to minimize keyboard use where possible
- **Offline Capability**: Designed to work in areas with limited connectivity (to be implemented)

## Implementation Notes

- This is currently a front-end mockup with no backend logic
- All data is simulated with static arrays or mock objects
- Future implementation will include API integration with a proper backend
- The app is designed to handle offline functionality for field use

## License

[MIT](LICENSE)
