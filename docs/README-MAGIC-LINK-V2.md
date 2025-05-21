# Beet Guru App - Magic Link Authentication (v2)

This branch adds a new magic link authentication flow to the Beet Guru app, replacing the traditional email/password login system with a more secure and user-friendly approach.

## What's New

- **Email-first Authentication**: Users enter their email address as the first step
- **Automatic Path Selection**: The system checks if the email exists to determine login vs. registration flow
- **Magic Link Flow**: Simulated email magic link process for passwordless authentication
- **Improved User Experience**: Cleaner, more modern authentication approach
- **Consistent Demo Process**: Maintains the familiar two-step demo process on the email screen

## Authentication Flow

### 1. Email Input Screen
- User enters their email address
- Two-step demo process:
  - First click on "Continue" fills in sample email
  - Second click on "Continue with Email" proceeds to the magic link sent screen
- System checks if the email exists
- Known emails proceed to magic link flow; unknown emails go to registration

### 2. Magic Link Sent Screen
- Shows confirmation that a magic link has been sent to the provided email
- "Demo: Click Magic Link" button simulates receiving and clicking the link in a single step

### 3. Magic Link Verify Screen
- Simulates successful verification of the magic link
- Provides two direct options:
  - "Demo: Existing User Login" - Immediately logs in as a returning user
  - "Demo: New User Registration" - Immediately redirects to registration form with email pre-filled

### 4. Registration Screen (for new users)
- Pre-fills the email from the verification step
- Collects additional user information (name, password, user type)
- Maintains the "Continue" and "Complete Registration" flow for consistency

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

1. On the email screen:
   - Click "Continue" to fill in sample email (`john.doe@example.com`)
   - Click "Continue with Email" to proceed to the magic link sent screen
2. On the magic link sent screen, click "Demo: Click Magic Link"
3. On the verification screen, click "Demo: Existing User Login"
4. You'll be logged in as John Doe

### Demo Flow 2: New User Registration

1. On the email screen:
   - Click "Continue" to fill in sample email (`john.doe@example.com`)
   - Click "Continue with Email" to proceed to the magic link sent screen
2. On the magic link sent screen, click "Demo: Click Magic Link"
3. On the verification screen, click "Demo: New User Registration"
4. Complete the registration form (click "Continue" to fill with sample data)
5. Click "Complete Registration" to finish and log in

## Technical Notes

- The app still retains existing login/register screens for backward compatibility
- Token management is simulated with an in-memory array in the API service
- Email confirmation is simulated with demo buttons
- The email screen maintains the two-step process for consistency with existing screens
- Subsequent screens use single-click actions for better usability

## Future Improvements

In a production environment, these features could be enhanced with:

1. Real email sending capabilities
2. Secure token generation and storage
3. Token expiration and single-use enforcement
4. Integration with authentication services
5. Account recovery options
6. Security monitoring and rate limiting
7. Proper handling of edge cases (invalid emails, etc.)
