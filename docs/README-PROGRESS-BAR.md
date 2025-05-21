# Progress Bar Implementation

## Overview

The progress bar component provides a visual indicator of the user's progress through the multi-step assessment wizard. It includes numbered step indicators, text labels, a gray track showing the full path, and a green progress indicator showing completion.

## Features

- Clear visual indication of current step and progress
- Step numbers with appropriate color coding for current/completed/upcoming steps
- Text labels for each step
- Gray track showing the full path from start to finish
- Green progress indicator that advances as steps are completed
- Responsive design that adapts to different screen sizes

## Technical Implementation

The progress bar uses CSS Grid for consistent spacing and a simple percentage calculation for progress. No DOM measurements are required.

### Key Components

1. **Step Numbers & Labels**:
   - Numbered circles with color coding based on status
   - Text labels below each step
   - CSS Grid layout for consistent spacing

2. **Track & Progress**:
   - Gray track spanning from first to last dot
   - Green progress indicator showing completion
   - Dots positioned on top of track for visual continuity

### Positioning Logic

Spacing between dots is handled by CSS Grid. The progress width is calculated from the current step index and the total number of steps:

```
progress = ((currentStep - 1) / (steps.length - 1)) * 100;
```

This percentage directly controls the width of the green indicator.

3. **Layering with Z-Index**:
   - Dots (z-index: 20) appear on top of the track
   - Track and progress (z-index: 10) appear below the dots
   - This creates the visual effect of dots "sitting on" the track

## Usage

```jsx
<StepProgress 
  currentStep={2} 
  steps={['Crop Details', 'Field Setup', 'Measurements', 'Review']} 
/>
```

### Props

- `currentStep` (number): The current step (1-based index)
- `steps` (string[]): Array of step labels

## Accessibility

- The track includes `aria-hidden="true"` as it's decorative
- Color is not the only means of indicating progress
- Visual states clearly indicate current and completed steps

## Browser Compatibility

- Uses standard DOM APIs that work across modern browsers
- Responsive design adapts to different screen sizes
- Transitions provide smooth visual updates

## Technical Notes

- Relies on CSS Grid and flex utilities for spacing
- Progress percentage is computed with simple math
- Maintains visual consistency through all steps and screen sizes