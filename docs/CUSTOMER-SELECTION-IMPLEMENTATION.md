# Customer Selection Implementation

## Overview

This document describes the implementation of customer selection functionality for retailer users in the Beet Guru application. When logged in as a retailer, the AssessmentsScreen and ReportsScreen now require customer selection before displaying any data.

## Architecture

### Customer Context (`src/contexts/CustomerContext.js`)
- **Purpose**: Global state management for selected customer
- **Features**:
  - `selectedCustomer`: Currently selected customer object
  - `requireCustomerSelection(boolean)`: Controls whether customer selection is mandatory
  - `selectCustomer(customer)`: Sets the selected customer
  - `clearCustomer()`: Clears the selection
  - `hasSelectedCustomer`: Boolean indicating if a customer is selected

### Customer Selector Component (`src/components/ui/CustomerSelector.js`)
- **Purpose**: UI component for customer selection dropdown
- **Features**:
  - Only renders for retailer accounts
  - Fetches customer list using `api.customers.getByRetailerId`
  - Shows warning when customer selection is required but none selected
  - Displays customer info (paddock count, farm name)
  - Loading and error states

### Updated Screens

#### AssessmentsScreen (`src/components/screens/AssessmentsScreen.js`)
- **Changes**:
  - Integrates CustomerSelector component
  - Requires customer selection for retailers
  - Filters draft assessments by selected customer
  - Updates header subtitle to show selected customer name
  - Disables "New Assessment" button until customer is selected
  - Shows placeholder when no customer is selected

#### ReportsScreen (`src/components/screens/ReportsScreen.js`)
- **Changes**:
  - Integrates CustomerSelector component  
  - Requires customer selection for retailers
  - Filters reports by selected customer
  - Updates header subtitle to show selected customer name
  - Disables "Export Reports" button until customer is selected
  - Shows placeholder when no customer is selected

## User Flow

### For Farmers
- No change in behavior
- Data continues to be filtered by their own user ID
- CustomerSelector component is not shown

### For Retailers
1. Navigate to Assessments or Reports screen
2. CustomerSelector appears below page header
3. Must select a customer from dropdown to view data
4. Once selected, all data is filtered to show only that customer's information
5. Customer selection persists across screen navigation within the session
6. Header subtitles and empty states are personalized for the selected customer

## Data Filtering

### API Integration
- **Farmer users**: `userId = user.id` (unchanged)
- **Retailer users**: `userId = selectedCustomer?.id || null`
- Data is only fetched when:
  - User is a farmer (always has valid userId), OR
  - User is a retailer AND has selected a customer

### API Methods Used
- `api.customers.getByRetailerId(retailerId)` - Fetch customer list
- `api.references.getLocations(withStatus, userId)` - Fetch filtered locations
- `api.reports.getAll(userId)` - Fetch filtered reports
- `api.assessments.getCompletedAssessments(userId)` - Fetch filtered assessments

## Benefits

1. **Data Security**: Retailers can only view one customer's data at a time
2. **User Experience**: Clear indication of whose data is being viewed
3. **Performance**: Only loads relevant data for selected customer
4. **Scalability**: Context-based approach easily extends to other screens
5. **Consistency**: Same customer selection persists across navigation

## Technical Notes

- Customer context state is maintained at app level via `CustomerProvider`
- CustomerSelector component handles its own loading/error states
- Customer selection is cleared when navigating to non-customer screens
- All customer-related API calls include proper error handling
- Mobile-responsive design maintains functionality on smaller screens

## Testing

Basic unit tests are included in `src/contexts/__tests__/CustomerContext.test.js` to verify:
- Context provider functionality
- Customer selection and clearing
- Requirement setting
- Error handling when used outside provider 