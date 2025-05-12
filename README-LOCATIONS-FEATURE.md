# Farmer Locations Feature

This feature adds location management functionality to the Beet Guru app, allowing farmers to create, view, edit, and delete their field/paddock locations. This is a key component of the app as locations are used throughout the assessment process.

## Components Added

1. **LocationsScreen**: The main screen for viewing and managing locations.
   - Lists all locations for the current farmer
   - Provides options to add, edit, and delete locations

2. **LocationForm**: A modal form component for creating and editing locations.
   - Fields for location name and area
   - Interface for capturing coordinates via current location or map selection

3. **MapPicker**: A simulated map interface for selecting location coordinates.
   - Mock implementation for demonstration purposes
   - Would be replaced with an actual mapping API in production

## API Enhancements

Extended the `referencesAPI` in the service layer with additional location-related methods:

- `getLocationById`: Fetch a specific location by ID
- `createLocation`: Create a new location
- `updateLocation`: Update an existing location
- `deleteLocation`: Delete a location (with checks to prevent deletion of locations used in assessments)

## Data Structure

Each location includes:
- `id`: Unique identifier
- `name`: Location name
- `userId`: ID of the owner (farmer)
- `area`: Size in hectares
- `latitude`: Geographic coordinate
- `longitude`: Geographic coordinate

## Demo Data

For demonstration purposes, the app comes pre-populated with three locations:
- North Paddock (3.5 hectares)
- Mid Paddock (2.2 hectares)
- South Paddock (4.1 hectares)

Each has corresponding coordinates and is associated with the logged-in user. The login process has been modified to ensure the user ID matches the demo locations.

## Demo Implementation Notes

### Data Display

For the purposes of this demo:

1. The user ID filtering has been temporarily disabled in the `LocationsScreen` component to ensure all demo locations are visible.
2. The `LoginScreen` component explicitly sets a user ID that matches the mock location data.
3. In a production implementation, proper user-based filtering would be handled server-side.

### UI Simplifications

1. Search functionality has been removed since farmers typically won't have many locations to manage.
2. The interface is focused on the core functionality of managing locations rather than advanced filtering.

## UX/UI Patterns

- **Mobile & Desktop Responsive**: Works well on both form factors
- **Consistent Design Language**: Follows the same UI patterns as the rest of the app
- **Modal Pattern**: Uses modals for forms and confirmations
- **Empty States**: Provides helpful guidance when no locations exist
- **Loading States**: Shows loading indicators during API operations
- **Error Handling**: Displays user-friendly error messages

## Context for the Retail/Farmer Relationship

This implementation focuses on the farmer perspective, where:
- Farmers are the top-level entity
- Locations belong to a specific farmer

In a future implementation for retailers, the hierarchy would change:
- Retailers would be the top-level entity
- Farmers would belong to retailers
- Locations would belong to farmers

## Future Enhancements

1. **Real Map Integration**: Replace the mock map with a real mapping API
2. **Boundary Drawing**: Allow for drawing field boundaries instead of just a point
3. **Soil Type Data**: Add soil information for better crop analysis
4. **Historical Data**: Track location use over time for crop rotation
5. **Weather Integration**: Show weather forecasts specific to each location

## Testing Notes

- To test the feature, login as a farmer user and navigate to the Locations screen
- You should immediately see the three demo locations: North Paddock, Mid Paddock, and South Paddock
- Try adding a new location, editing an existing one, and deleting a location
- Verify that all modals can be opened and closed correctly

## Implementation Notes

- The map functionality is currently simulated and does not use actual geolocation
- In a production environment, proper geolocation APIs would be integrated
- For demonstration purposes, user authentication has been simplified with pre-defined user IDs
- Error handling for API failures has been implemented with user-friendly messages