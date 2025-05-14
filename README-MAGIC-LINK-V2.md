# Beet Guru App - Magic Link Authentication (v2)

This branch adds a new magic link authentication flow to the Beet Guru app, replacing the traditional email/password login system with a more secure and user-friendly approach.

## What's New

- **Email-first Authentication**: Users enter their email address as the first step
- **Automatic Path Selection**: The system checks if the email exists to determine login vs. registration flow
- **Magic Link Flow**: Simulated email magic link process for passwordless authentication
- **Improved User Experience**: Cleaner, more modern authentication approach
- **Preserved Demo Capabilities**: All screens maintain the ability to demonstrate the flow without actual backend integration

## Authentication Flow

### 1. Email Input Screen
- User enters their email address
- Clicking "Continue" fills in demo email address (`john.doe@example.com`)
- Clicking "Continue with Email" simulates checking if the email exists
- Known emails proceed to magic link flow; unknown emails go to registration

### 2. Magic Link Sent Screen
- Shows confirmation that a magic link has been sent to the provided email
- "Demo: Click Magic Link" button simulates receiving and clicking the link

### 3. Magic Link Verify Screen
- Simulates successful verification of the magic link
- For demo purposes, provides two options:
  - "Demo: Existing User Login" - Simulates returning user login
  - "Demo: New User Registration" - Redirects to registration form with email pre-filled

### 4. Registration Screen (for new users)
- Pre-fills the email from the verification step
- Collects additional user information (name, password, user type)
- Two-step process as before:
  - First click fills form with sample data
  - Second click completes registration

## Implementation Details

### New Components

1. **EmailScreen.js**: Initial screen for email input and path determination
2. **MagicLinkSentScreen.js**: Confirmation screen showing link was sent
3. **MagicLinkVerifyScreen.js**: Screen shown after successful verification

### Modified Components

1. **RegisterScreen.js**: Updated to accept pre-filled email and work with the magic link flow
2. **App.js**: Reconfigured to handle the new authentication states and flow

### API Services

New mock API methods were added to support the magic link flow:

- `checkEmailExists`: Checks if an email is already registered
- `generateMagicLink`: Creates a magic link token and returns it
- `verifyMagicLink`: Verifies the token and returns user info
- `loginWithMagicLink`: Authenticates a user via a valid magic link

## How to Use

### Demo Flow 1: Existing User

1. Enter email or click "Continue" to fill in sample email
2. Click "Continue with Email" to proceed to the magic link sent screen
3. Click "Demo: Click Magic Link" to simulate receiving the email
4. Click "Verify Magic Link" after the button changes
5. On the verification screen, click "Demo: Existing User Login"
6. You'll be logged in as John Doe

### Demo Flow 2: New User Registration

1. Enter email or click "Continue" to fill in sample email
2. Click "Continue with Email" to proceed to the magic link sent screen
3. Click "Demo: Click Magic Link" to simulate receiving the email
4. Click "Verify Magic Link" after the button changes
5. On the verification screen, click "Demo: New User Registration"
6. Complete the registration form (click "Continue" to fill with sample data)
7. Click "Complete Registration" to finish and log in

## Technical Notes

- The app still retains existing login/register screens for backward compatibility
- Token management is simulated with an in-memory array in the API service
- Email confirmation is simulated with demo buttons
- All authentication paths maintain the two-step demo process
  - First click fills forms with sample data
  - Second click submits/continues the flow

## Future Improvements

In a production environment, these features could be enhanced with:

1. Real email sending capabilities
2. Secure token generation and storage
3. Token expiration and single-use enforcement
4. Integration with authentication services
5. Account recovery options
6. Security monitoring and rate limiting
7. Proper handling of edge cases (invalid emails, etc.)
