# Beet Guru App - Login V2

This branch adds a fake login and registration flow to the Beet Guru app. The implementation allows for demonstration of the authentication process without actual backend integration.

## Features Added

### 1. Login Screen
- Fake login form with email and password fields
- Two-step login process:
  - First click on the login button fills in fake credentials (button shows "Continue")
  - Second click completes the login and enters the app (button changes to "Sign in")
- Visual design consistent with the overall app theme
- "Remember me" option (visual only)
- "Forgot password" link (visual only)
- Option to navigate to registration

### 2. Registration Flow
- Clean registration form with consistent styling
- User details:
  - Name
  - Email
  - Password and confirmation
  - User Type (Farmer/Retailer) selection
  - Subscribe to News & Updates option
  - Terms agreement checkbox
- Two-step submission process:
  - First click on "Continue" fills the form with sample data (Donald, donald@stp.co.nz)
  - Second click on "Complete Registration" completes registration and logs in
- Visual feedback during the process
- Option to go back to login screen
- Validation bypassed for demo purposes

### 3. Authentication State Management
- Simple state management in App.js
- User information persisted during the session
- User profile details displayed in the sidebar and mobile "More" screen
- Functional logout button that returns to the login screen

## How to Use

### Login Demo
1. When the app loads, you'll see the login screen
2. Click the "Continue" button once to fill in fake credentials
3. Click the "Sign in" button (which replaces "Continue") to enter the app
4. You'll be logged in as "John Doe"

### Registration Demo
1. From the login screen, click "Create new account"
2. You'll see the registration form
3. Click "Continue" to automatically fill in sample data
4. Click "Complete Registration" (which replaces "Continue") to complete registration
5. You'll be logged in with the details you provided (Donald as Farmer)

### Logout
- On desktop: Click "Log Out" in the sidebar
- On mobile: Navigate to the "More" tab and click "Log Out"
- Either action will return you to the login screen

## Implementation Details

This implementation uses a simple component-based approach with the following components:

1. **LoginScreen.js**: Displays the login form and handles two-step login logic
2. **RegisterScreen.js**: Handles the registration process with Farmer/Retailer selection
3. **App.js**: Updated to manage authentication state and conditional rendering
4. **Sidebar.js & MoreScreen.js**: Updated to handle logout and display user information

The authentication flow is purely client-side with no actual backend integration. User data is stored in React state and is lost on page refresh.

### Technical Notes
- Form validation is intentionally bypassed to ensure smooth demo experience
- Button type is changed from "submit" to "button" to prevent HTML5 validation
- noValidate attribute is added to forms
- Separate handler functions are implemented for form filling and submission

## Recent Improvements

- Fixed issue with form validation interrupting the demo flow
- Added state reset when navigating between screens
- Implemented consistent behavior between login and registration forms
- Added safety checks for data handling
- Created modular functions for better code maintainability

## Future Improvements

In a production environment, this could be enhanced with:

1. Real API integration for authentication
2. Proper form validation
3. Error handling for failed login attempts
4. Password reset functionality
5. User registration with email verification
6. Token-based authentication with refresh tokens
7. Persistent session management with storage APIs
