# Settings Screen Implementation

This branch adds a comprehensive Settings screen to the Beet Guru application with the following features:

## Features Added

### 1. Settings Screen with Multiple Sections
- **Profile Information**: Manage user details (name, email, role, phone)
- **Farm Details**: Store farm information including address, region, and country
- **Notifications**: Configure notification preferences
- **App Preferences**: Set default values and measurement units
- **Data Management**: Control data sync and backup settings
- **Security**: Password management and security features

### 2. Responsive Design
- Desktop view with sidebar navigation for settings categories
- Mobile view with dropdown selection for settings categories
- Consistent styling matching the rest of the application

### 3. Farm Address Management
Added ability to manage farm address information including:
- Farm name
- Street address
- City/Town
- Postal code
- Region (Canterbury)
- Country (New Zealand)

### 4. Default Application Settings
Added configuration options for application defaults:
- Default dry matter percentage (14%)
- Default row spacing (0.5m)
- Measurement unit preference (metric/imperial)

## Implementation Details

- Created `SettingsScreen.js` component in the screens directory
- Updated `App.js` to use the new component instead of the placeholder
- Leveraged existing form components and hooks for consistent UI
- Mobile and desktop optimized layouts

## Testing

To test this implementation:
1. Log in to the application
2. Navigate to Settings using either:
   - The Settings option in the "More" tab (mobile)
   - The Settings link in the sidebar (desktop)
3. Verify that all settings sections display correctly
4. Test form input validation and submission
5. Verify responsive design by testing on different screen sizes

Note: In this implementation, saving settings will only log them to the console, since there's no backend integration yet.

## Future Improvements

For future iterations:
- Add form validation for all inputs
- Implement actual data persistence through API calls
- Add user avatar upload functionality
- Add theme selection option (light/dark mode)
- Implement two-factor authentication