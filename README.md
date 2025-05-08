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
- **BottomNav.js**: Mobile-specific bottom tab navigation
- **Sidebar.js**: Desktop navigation sidebar (hidden on mobile)
- **Header.js**: Adaptive header with mobile-optimized search
- **Screen Components**: All screen components with responsive designs

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

## License

[MIT](LICENSE)
