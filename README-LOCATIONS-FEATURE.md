# Farmer Locations Feature

This feature adds location management functionality to the Beet Guru app, allowing farmers to create, view, edit, and delete their field/paddock locations. This is a key component of the app as locations are used throughout the assessment process.

## Components Added

1. **LocationsScreen**: The main screen for viewing and managing locations.
   - Lists all locations for the current farmer
   - Includes search functionality for filtering locations
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
- Try adding a new location, editing an existing one, and deleting a location
- Test the search functionality with existing location names
- Verify that all modals can be opened and closed correctly

## Implementation Notes

- The map functionality is currently simulated and does not use actual geolocation
- In a production environment, proper geolocation APIs would be integrated
- For demonstration purposes, the locations are filtered by user ID in the front end, but in a real application, this would be handled by the backend API