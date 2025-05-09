# Home Screen Update for Beet Guru App

This branch implements a comprehensive redesign of the app's main screen, focusing on providing valuable information and easy access to key features.

## Key Changes

### Naming Convention
- Renamed "Dashboard" to "Home" throughout the app for consistency between mobile and desktop
- Updated navigation components to reflect this change

### New Screens and Features
- **Stock Feed Calculator**: Added a new dedicated screen for calculating feed duration based on stock count and feed amount
- Moved the Feed Forecast Widget from the Home screen to the Stock Feed Calculator screen
- Added navigation to Stock Feed Calculator in both desktop sidebar and mobile "More" menu

### New Components
Several new UI components have been developed to provide a richer user experience:

1. **Seasonal Timeline**: Visual indicator showing the current growing season for fodder beet in Canterbury, NZ
2. **Weather Widget**: Current weather conditions for Oxford, Canterbury 
3. **Recent Assessment Card**: Card showing the most recent assessment with key metrics (desktop only)
4. **Feed Forecast Widget**: Visual representation of feed availability and grazing days (moved to Stock Feed screen)
5. **Cultivar Info Widget**: Collapsible information panel about common beet cultivars
6. **Reminder Widget**: Notification system for upcoming tasks and suggestions

### Layout Improvements
- Mobile-first design with different layouts for mobile and desktop views
- Better organization of information with clear sections
- More prominent "New Assessment" button at the top for quick access
- Welcoming section with user's name and app description

### Mobile View Optimizations
- Optimized component order for mobile:
  1. Welcome section
  2. New Assessment button
  3. Reminders
  4. Weather widget
  5. Growing Season timeline
  6. Cultivar Info
- Removed recent assessment card from mobile view to focus on the most essential information

### Content Updates
- Added informational blurb explaining Beet Guru's purpose and benefits
- Included detailed cultivar information for common beet varieties grown in Canterbury
- Incorporated growing season timeline specific to New Zealand conditions

## Implementation Details

### Mobile View
In mobile view, the components are stacked in a single column with a carefully considered order that prioritizes the most essential information:
1. Welcome section
2. New Assessment button
3. Reminders/alerts
4. Weather information
5. Seasonal timeline
6. Cultivar information

### Desktop View
The desktop layout uses a two-column grid:
- Left column (2/3 width): Welcome message, reminders, recent assessment, seasonal timeline
- Right column (1/3 width): Weather widget, cultivar information

### Stock Feed Calculator
The new Stock Feed Calculator screen includes:
- Feed Forecast Widget showing current feed utilization
- Interactive calculator form with fields for:
  - Number of stock
  - Total feed amount (tonnes)
  - Dry matter percentage
- Results section showing calculated feeding duration
- Option to save calculation to reports

### Responsive Behavior
- All components adapt to different screen sizes
- Weather widget shows a compact version on mobile
- Content is prioritized differently based on screen size

## Technical Notes
- All new components are designed to be reusable
- Used Tailwind CSS for styling
- Implemented conditional rendering for mobile/desktop views
- Data is currently static but structured for easy integration with backend APIs
