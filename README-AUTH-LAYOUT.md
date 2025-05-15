# Authentication Layout Refactoring

This refactoring improves code maintainability and consistency by introducing a reusable `AuthLayout` component for all authentication-related screens.

## Problem

Previously, all authentication screens (EmailScreen, MagicLinkSentScreen, MagicLinkVerifyScreen, LoginScreen, RegisterScreen) had duplicated layout code for:
- Logo at the top
- White card in the middle with content
- Footer with version and copyright at the bottom
- Back button in some screens

This duplication created maintenance challenges:
- Changes to the authentication UI required updates in multiple files
- Inconsistencies could easily be introduced
- Code bloat with repeated layout structure

## Solution

The refactoring introduces an `AuthLayout` component that encapsulates the common layout patterns, accepting props to customize the content for each specific screen.

### The AuthLayout Component

The `AuthLayout` component:
- Provides a consistent structure for all authentication screens
- Handles the positioning of logos, cards, and footers
- Manages back button display with consistent styling
- Ensures all authentication screens maintain visual consistency

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `title` | String | Title displayed in the card header | - |
| `backButton` | Object | Configuration for the back button (optional) | - |
| `backButton.onClick` | Function | Callback when back button is clicked | - |
| `backButton.text` | String | Text for the back button | "Back" |
| `backButton.ariaLabel` | String | Accessibility label for the back button | "Go back" |
| `children` | ReactNode | Main content to display within the card | - |
| `footerVersion` | String | Version to display in the footer | "v1.1.0" |
| `footerCopyright` | String | Copyright text to display in the footer | "© 2025 Beet Guru Ltd." |

### Usage Examples

#### Basic Usage (Without Back Button)

```jsx
import { AuthLayout } from '../auth';

const SomeAuthScreen = () => {
  return (
    <AuthLayout title="Your Title">
      {/* Your content here */}
    </AuthLayout>
  );
};
```

#### With Back Button

```jsx
import { AuthLayout } from '../auth';

const SomeAuthScreen = ({ onBack }) => {
  return (
    <AuthLayout 
      title="Your Title"
      backButton={{
        onClick: onBack,
        text: 'Back',
        ariaLabel: 'Go back to previous screen'
      }}
    >
      {/* Your content here */}
    </AuthLayout>
  );
};
```

## Benefits

1. **Reduced Code Duplication**: Removes approximately 40 lines of layout code from each authentication screen.

2. **Improved Maintainability**: Changes to the authentication UI structure can be made in a single location.

3. **Consistent UX**: Ensures all authentication screens have identical spacing, sizing, and visual behavior.

4. **Simplified Screen Components**: Authentication screens can now focus solely on their specific functionality rather than layout concerns.

5. **Better Accessibility**: Consistent handling of accessibility attributes like aria-labels.

6. **Easier Testing**: Focusing tests on the specific functionality of screens rather than layout structure.

## Files Modified

The following files have been refactored to use the new `AuthLayout` component:

- `src/components/screens/EmailScreen.js`
- `src/components/screens/MagicLinkSentScreen.js`
- `src/components/screens/MagicLinkVerifyScreen.js`
- `src/components/screens/LoginScreen.js`
- `src/components/screens/RegisterScreen.js`

## Files Created

- `src/components/auth/AuthLayout.js` - The new reusable layout component
- `src/components/auth/index.js` - Index file for the auth components

## Future Improvements

1. **Theme Customization**: Add theming support to allow different visual styles for different authentication flows.

2. **Animated Transitions**: Add consistent animations between authentication screens.

3. **Error Handling**: Add standardized error display within the authentication layout.

4. **Accessibility Improvements**: Further enhancements to ensure all authentication screens are fully accessible.

5. **Responsive Behavior Refinement**: Additional responsive variants for different device sizes.
