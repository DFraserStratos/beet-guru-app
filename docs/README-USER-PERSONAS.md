# User Personas Feature

This branch adds a random persona selection system to the Beet Guru app's authentication flow. Each time a user accesses the app, a different user persona is randomly selected and used throughout the authentication process.

## Feature Overview

- 12 diverse user personas with a mix of genders, names, and backgrounds
- Random persona selection at the first login screen (EmailScreen)
- Consistent persona data used throughout the authentication flow
- Works with both login and registration paths
- Maintains compatibility with the existing magic link authentication flow

## Implementation Details

### 1. Persona Collection

The persona data is stored in `src/services/personas.js` as an array of user objects. Each persona includes:

- Personal information (name, email, role, initials)
- Farm information (farmName, location)
- Demographic data (gender)

This format makes it easy to add new personas in the future by simply adding new objects to the array.

### 2. Random Selection

The random selection happens in the API service layer:

- `api.auth.getRandomPersona()` selects a random persona
- Selection avoids repeating the same persona twice in a row
- Selection happens on the first authentication screen (EmailScreen)

### 3. Authentication Flow Integration

The persona data flows through the authentication system:

- **EmailScreen**: Selects a random persona and uses its email for the demo
- **MagicLinkVerifyScreen**: Uses the persona for login or pre-fills registration
- **RegisterScreen**: Pre-fills the form with the persona's information
- **LoginScreen**: Uses the persona for authentication

### 4. State Management

The selected persona is stored in App.js state:

- `selectedPersona` state variable
- `handleSelectPersona` method
- Passed to relevant components via props

## User Experience

1. When a user accesses the login screen, the system randomly selects a persona
2. Clicking "Continue" pre-fills the email field with the persona's email
3. Continuing through the magic link flow, the user can:
   - Login directly as the selected persona
   - Register using the persona's data as pre-filled values

This provides a more engaging demo experience while maintaining the existing authentication flow.

## Technical Changes

1. Added `personas.js` with 12 diverse personas
2. Modified API service to use personas and add random selection
3. Updated authentication components to work with selected persona:
   - EmailScreen.js
   - MagicLinkVerifyScreen.js
   - RegisterScreen.js
   - LoginScreen.js
4. Updated App.js to manage persona state

## How to Test

1. Refresh the app and navigate to the login screen
2. Note which persona is selected (by the email shown after clicking "Continue")
3. Complete the login flow or refresh and try again
4. Verify that a different persona is selected each time
5. Verify that the same persona's data is used consistently through the auth flow
6. Test both login and registration paths

## Future Enhancements

- Add persona photos/avatars
- Allow admins to add new personas via a management interface
- Store persona selection in localStorage for session consistency
- Add more diverse personas with different roles and backgrounds