# Beet Guru App - Login V2

This branch adds a fake login and registration flow to the Beet Guru app. The implementation allows for demonstration of the authentication process without actual backend integration.

## Features Added

### 1. Login Screen
- Fake login form with email and password fields
- Two-step login process:
  - First click on the login button fills in fake credentials
  - Second click completes the login and enters the app
- Visual design consistent with the overall app theme
- "Remember me" option (visual only)
- "Forgot password" link (visual only)
- Option to navigate to registration

### 2. Registration Flow
- Two-step registration process:
  - Step 1: Basic user information (name, email, password)
  - Step 2: User type selection (Farmer or Retailer)
- Visual feedback during the process
- Option to go back to login screen
- Form validation (visual only)

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
2. Fill in the registration form (or leave it blank for demo purposes)
3. Click "Continue" to proceed to step 2
4. Select either "Farmer / Grower" or "Retailer / Consultant"
5. Click "Complete Registration"
6. You'll be logged in with the details you provided

### Logout
- On desktop: Click "Log Out" in the sidebar
- On mobile: Navigate to the "More" tab and click "Log Out"
- Either action will return you to the login screen

## Implementation Details

This implementation uses a simple state-based approach with the following components:

1. **LoginScreen.js**: Displays the login form and handles login logic
2. **RegisterScreen.js**: Handles the two-step registration process
3. **App.js**: Updated to manage authentication state and conditional rendering
4. **Sidebar.js & MoreScreen.js**: Updated to handle logout and display user information

The authentication flow is purely client-side with no actual backend integration. User data is stored in React state and is lost on page refresh.

## Future Improvements

In a production environment, this could be enhanced with:

1. Real API integration for authentication
2. Proper form validation
3. Error handling for failed login attempts
4. Password reset functionality
5. User registration with email verification
6. Token-based authentication with refresh tokens
7. Persistent session management with storage APIs
