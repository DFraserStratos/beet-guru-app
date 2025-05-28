# Verification Code Authentication Update

This branch replaces the magic link authentication system with a more user-friendly 6-digit verification code system.

## Overview

Instead of sending magic links via email that users need to click, the system now sends a 6-digit verification code that users can type directly into the application. This approach is particularly beneficial for farmers using mobile devices in the field, as it eliminates the need to switch between apps or deal with email clients.

## Key Changes

### 1. New Components
- **VerificationCodeScreen.js** - A dedicated screen for entering the 6-digit verification code
  - 6 individual input boxes for better mobile UX
  - Auto-advance between digits
  - Auto-submit when complete
  - Paste support for copying from emails
  - Resend functionality with countdown timer
  - Clear visual feedback for errors

### 2. Updated Components
- **EmailScreen.js** - Modified to trigger verification code flow instead of magic links
- **App.js** - Simplified authentication flow with new states

### 3. API Changes
- Replaced `generateMagicLink` with `generateVerificationCode`
- Replaced `verifyMagicLink` with `verifyCode`
- Added rate limiting and attempt tracking
- Shorter expiry time (10 minutes vs 30 minutes for magic links)

### 4. Removed Components
The following magic link components are no longer needed:
- MagicLinkSentScreen.js
- MagicLinkVerifyScreen.js

## User Flow

### New User Registration
1. Enter email on EmailScreen
2. Receive 6-digit code via email
3. Enter code on VerificationCodeScreen
4. Redirect to RegisterScreen to complete profile

### Existing User Login
1. Enter email on EmailScreen
2. Option to use password or verification code
3. If verification code chosen, enter 6-digit code
4. Direct login to application

## Security Features

- **Rate Limiting**: Maximum 5 attempts per code
- **Expiry Time**: Codes expire after 10 minutes
- **Single Use**: Codes are invalidated after successful use
- **Resend Cooldown**: 60-second cooldown between code requests

## Benefits

1. **Better Mobile UX**: No app switching required
2. **Easier Input**: Typing 6 digits is simpler than clicking links
3. **Spam Filter Friendly**: Plain text emails less likely to be filtered
4. **Familiar Pattern**: Similar to banking OTPs that users know
5. **Offline Friendly**: Code can be viewed even without internet

## Demo Mode

For testing, the demo accepts these codes:
- `123456` - Universal demo code
- `111111` - Alternative demo code

## Migration Notes

This is a breaking change from the magic link system. Any existing magic link tokens will no longer work. Users will need to use the new verification code system for authentication.

## Testing

1. Run the app locally
2. Enter an email address
3. Check console for the generated 6-digit code (in production, this would be sent via email)
4. Enter the code in the verification screen
5. Complete registration or login