# Card Component System

This document describes the card component system implemented in the Beet Guru app for creating consistent, reusable card UI elements.

## Overview

The card component system provides a set of reusable components for creating card-based UI elements throughout the application. Cards are used extensively in the app to contain content, provide visual separation, and establish a consistent design language.

## Components

### BaseCard

The foundation of all card components, providing basic card styling.

```jsx
import { BaseCard } from '../ui/card';

<BaseCard className="p-4">
  Card content goes here
</BaseCard>
```

**Props:**
- `children`: Card content
- `className`: Additional CSS classes
- `onClick`: Optional click handler
- `noPadding`: Whether to remove padding
- `as`: HTML element to render as (default: div)

### HeaderCard

Card with a title and optional description.

```jsx
import { HeaderCard } from '../ui/card';

<HeaderCard 
  title="Card Title" 
  description="Optional description text"
>
  Card content goes here
</HeaderCard>
```

**Props:**
- All BaseCard props
- `title`: Card title
- `description`: Optional card description
- `titleClassName`: Additional CSS classes for title
- `descriptionClassName`: Additional CSS classes for description
- `headerClassName`: Additional CSS classes for header section
- `contentClassName`: Additional CSS classes for content section
- `divider`: Whether to show a divider between header and content

### ActionCard

Card with header and action buttons.

```jsx
import { ActionCard } from '../ui/card';

<ActionCard 
  title="Card Title" 
  description="Optional description text"
  actions={<Button>Action</Button>}
  actionsPosition="top-right"
>
  Card content goes here
</ActionCard>
```

**Props:**
- All HeaderCard props
- `actions`: Action buttons/components to display
- `actionsPosition`: Position of actions ('top-right', 'bottom', 'bottom-right')

### StatusCard

Card with status indicator.

```jsx
import { StatusCard } from '../ui/card';

<StatusCard 
  title="Card Title" 
  description="Optional description text"
  status="draft"
>
  Card content goes here
</StatusCard>
```

**Props:**
- All HeaderCard props
- `status`: Status value ('draft', 'completed', 'not-started', etc.)
- `statusConfig`: Configuration for status colors and labels
- `statusPosition`: Position of status badge ('top-right', 'title-right', 'bottom-right')

> **Note**: When using the StatusCard for location items, consider directly using BaseCard with custom status styling to ensure visual consistency with the existing design.

### IconCard

Card with icon and content.

```jsx
import { IconCard } from '../ui/card';
import { Calendar } from 'lucide-react';

<IconCard 
  icon={<Calendar size={20} />}
  title="Card Title" 
  description="Optional description text"
  iconPosition="left"
>
  Card content goes here
</IconCard>
```

**Props:**
- All BaseCard props
- `icon`: Icon component to display
- `iconClassName`: Additional CSS classes for icon container
- `iconSize`: Size of the icon container ('sm', 'md', 'lg')
- `iconPosition`: Position of the icon ('left', 'top')
- `title`: Card title
- `description`: Optional card description

### PageHeaderCard

Specialized card for page headers.

```jsx
import { PageHeaderCard } from '../ui/card';
import { Button } from '../ui/Button';

<PageHeaderCard 
  title="Page Title" 
  description="Page description"
  actions={<Button>Action</Button>}
>
  Additional content (optional)
</PageHeaderCard>
```

**Props:**
- All ActionCard props
- Additional styling for page headers

## Usage Guidelines

- Use **BaseCard** when you need a simple container with card styling
- Use **HeaderCard** when your card needs a title and description
- Use **ActionCard** when your card has action buttons or links
- Use **StatusCard** to show the status of an item (draft, completed, etc.)
- Use **IconCard** when you want to include an icon with your card content
- Use **PageHeaderCard** for the main header at the top of each screen

## Component Customization

For specialized components like LocationCard that require specific styling to match existing designs, consider:

1. Using BaseCard directly and implementing custom styling 
2. Creating a component-specific implementation that preserves the exact visual details
3. Combining multiple card components as needed

## Examples

### Page Header

```jsx
<PageHeaderCard
  title="Assessments"
  description="Manage crop assessments for your locations"
  actions={<Button onClick={handleNewAssessment}>New Assessment</Button>}
/>
```

### Custom Location Card

```jsx
<BaseCard className="p-0 shadow-none">
  <div className="p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <MapPin size={20} className="text-green-600" />
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="text-base font-medium text-gray-800">North Paddock</h3>
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Draft
            </span>
          </div>
          <p className="text-sm text-gray-500">3.5 hectares</p>
        </div>
      </div>
      <button className="p-2 rounded-full text-green-600 hover:bg-green-50">
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
</BaseCard>
```

### Icon Card for Weather

```jsx
<IconCard
  icon={<Cloud size={24} />}
  title="Weather"
  description="Current conditions in Oxford, Canterbury"
  iconPosition="top"
  iconClassName="bg-blue-100 text-blue-600"
>
  <p>18°C, Partly Cloudy</p>
</IconCard>
```

## Benefits

- **Consistency**: Creates a unified visual language across the app
- **Reusability**: Reduces duplicate code and styling
- **Maintainability**: Makes global style changes easier
- **Flexibility**: Provides options for different card types while maintaining a consistent look

## Implementation Notes

- Complex UI components with very specific styling requirements (like LocationCard) may need direct implementation rather than composition, to maintain exact visual fidelity
- Always prioritize visual consistency with existing designs over component abstraction
- Use the most appropriate card component for each use case, but don't hesitate to go back to basics when needed
