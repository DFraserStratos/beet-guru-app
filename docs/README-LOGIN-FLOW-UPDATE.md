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

### 2. Updated Personas System
- Added `hasPassword` field to distinguish authentication methods
- Mix of password-enabled and magic-link-only personas
- Realistic passwords for demo accounts
- Personas: Li Wei Chen, Ahmed Al-Farsi, Isabella Rossi, and Miguel Hernandez are magic-link only

### 3. API Service Enhancement
- New `loginWithPassword` method in authAPI
- Proper error handling for authentication attempts
- Returns user data without password field for security

### 4. User Experience Flow

#### Step 1: Email Entry
- User enters email address
- Form validates email format
- "Continue" button to proceed

#### Step 2: Authentication Options (After Email Entry)
The form expands with animation to show:
- Password field (auto-focused)
- "Sign in" button for password authentication
- "Use Magic Link" button for passwordless login
- "Forgot password?" link for future implementation

#### Authentication Paths:
1. **Password Login**: Direct authentication if credentials match
2. **Magic Link**: Redirects to existing magic link flow
3. **New User**: Redirects to registration if email not found

### 5. Demo Functionality
- "Fill with demo account" button for easy testing
- Randomly selects a persona on component mount
- Shows hint if selected persona doesn't have password
- Smooth transitions between states

## Technical Implementation

### State Management
- `isExpanded`: Controls form expansion animation
- `authMethod`: Tracks selected authentication method ('password' | 'magic-link')
- `selectedPersona`: Maintains demo persona throughout flow

### Animation
- CSS transitions with 300ms duration
- `max-height` and `opacity` for smooth expansion
- Password field auto-focus after expansion

### Security Considerations
- Always shows same UI regardless of email existence
- Generic error messages to prevent user enumeration
- Password field supports autofill/password managers
- Cancels pending operations if user types quickly

## Testing the Implementation

### Test Cases:
1. **Password-enabled persona** (e.g., Maria Rodriguez):
   - Fill demo → Expand form → Enter password → Sign in

2. **Magic-link-only persona** (e.g., Li Wei Chen):
   - Fill demo → Expand form → See hint → Use Magic Link

3. **Quick typing/Autofill**:
   - Start typing email → Quickly type password → Should cancel email check

4. **Unknown email**:
   - Enter non-existent email → Either method redirects appropriately

## Future Enhancements
- Implement "Forgot password?" functionality
- Add password strength requirements
- Consider adding "Remember me" option
- Add password visibility toggle
- Implement proper password reset flow for magic-link users

## Files Modified
- `src/components/screens/EmailScreen.js` - Enhanced with password support
- `src/services/personas.js` - Added password fields and hasPassword flag
- `src/services/api.js` - Added loginWithPassword method
- `src/App.js` - Added onLogin prop to EmailScreen