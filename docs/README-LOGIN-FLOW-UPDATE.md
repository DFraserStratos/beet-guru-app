# Login Flow Update Documentation

## Overview
This update enhances the Beet Guru authentication system to support both password-based login and magic link authentication, providing users with flexible sign-in options.

## Key Changes

### 1. Enhanced Email Screen
The EmailScreen now features progressive disclosure with animated form expansion:
- Initially shows only email field
- After email entry, smoothly expands to reveal password field
- Provides two action buttons: "Sign in" (password) and "Use Magic Link"
- Smart detection of magic-link-only users with appropriate UI hints
- Two demo buttons: "Fill with known account" and "Fill with unknown account"

### 2. Updated Personas System
- Added `hasPassword` field to distinguish authentication methods
- Mix of password-enabled and magic-link-only personas
- Realistic passwords for demo accounts
- Personas: Li Wei Chen, Ahmed Al-Farsi, Isabella Rossi, and Miguel Hernandez are magic-link only

### 3. API Service Enhancement
- New `loginWithPassword` method in authAPI
- Proper error handling for authentication attempts
- Returns user data without password field for security

### 4. Magic Link Flow Restoration
The complete magic link flow has been restored with the following screens:
- **EmailScreen**: Entry point with dual demo buttons
- **MagicLinkSentScreen**: Shows confirmation that magic link was sent
- **MagicLinkVerifyScreen**: Handles verification and routes to login or registration

### 5. User Experience Flow

#### Demo Flow 1: Known Account (Existing User)
1. Click "Fill with known account" to pre-fill with a random persona
2. Form expands showing password field
3. Either:
   - Click "Sign in" for direct password login (if persona has password)
   - Click "Use Magic Link" to go through magic link flow
4. Magic link flow: Email Sent → Click Demo Link → Choose "Existing User Login"

#### Demo Flow 2: Unknown Account (New User)
1. Click "Fill with unknown account" to pre-fill with newuser@example.com
2. Form expands (password field shown but not used for new users)
3. Click "Use Magic Link"
4. Magic link flow: Email Sent → Click Demo Link → Redirected to Registration

#### Authentication Paths:
1. **Password Login**: Direct authentication if credentials match
2. **Magic Link (Existing User)**: Email → Link Sent → Verify → Login
3. **Magic Link (New User)**: Email → Link Sent → Verify → Registration

### 6. Technical Implementation

#### State Management
- `isExpanded`: Controls form expansion animation
- `authMethod`: Tracks selected authentication method ('password' | 'magic-link')
- `selectedPersona`: Maintains demo persona throughout flow
- `isNewUser`: Tracks whether user is new for proper routing

#### Animation
- CSS transitions with 300ms duration
- `max-height` and `opacity` for smooth expansion
- Password field auto-focus after expansion

#### Security Considerations
- Always shows same UI regardless of email existence
- Generic error messages to prevent user enumeration
- Password field supports autofill/password managers
- Cancels pending operations if user types quickly

## Testing the Implementation

### Test Cases:
1. **Password-enabled persona** (e.g., Maria Rodriguez):
   - Fill known account → Expand form → Enter password → Sign in

2. **Magic-link-only persona** (e.g., Li Wei Chen):
   - Fill known account → Expand form → See hint → Use Magic Link

3. **New user flow**:
   - Fill unknown account → Use Magic Link → Complete registration

4. **Quick typing/Autofill**:
   - Start typing email → Quickly type password → Should work seamlessly

## Key Features
- Consistent use of AuthLayout across all authentication screens
- Smooth animations and transitions
- Clear visual feedback for different user types
- Maintains backward compatibility with existing flows
- Demo-friendly with clear helper buttons

## Files Modified
- `src/components/screens/EmailScreen.js` - Enhanced with password support and dual demo buttons
- `src/components/screens/MagicLinkSentScreen.js` - Updated to use AuthLayout
- `src/components/screens/MagicLinkVerifyScreen.js` - Updated to handle new user flow
- `src/components/layout/AuthLayout.js` - Fixed JSX comment syntax
- `src/services/personas.js` - Added password fields and hasPassword flag
- `src/services/api.js` - Added loginWithPassword method
- `src/App.js` - Updated routing logic for proper flow handling