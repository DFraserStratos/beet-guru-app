# YieldRangeVisualization Component

## Overview

The `YieldRangeVisualization` component is a specialized chart component designed for the Beet Guru app to display crop yield estimates with confidence intervals. It shows a comparison between current sample data and projected data with additional samples, helping farmers understand how taking more samples might improve estimate precision.

## Features

- **Dual Bar Visualization**: Shows two horizontal bars representing current and additional sample scenarios
- **Confidence Intervals**: Each bar displays the range from lower to upper limit
- **Mean Value Display**: Shows the mean value positioned above each bar
- **Grid Lines**: Vertical grid lines at key values (11, 17, 23) for easy reading
- **Statistics Table**: Detailed statistics displayed below the chart in a two-column layout
- **Responsive Design**: Works seamlessly on both mobile and desktop devices
- **Color Coding**: Green for current data, blue for additional samples data
- **Tailwind CSS Integration**: Uses Tailwind utilities for consistent styling

## Usage

```jsx
import YieldRangeVisualization from './components/ui/YieldRangeVisualization';

const MyComponent = () => {
  const currentData = {
    mean: 17.2,
    upperLimit: 22.6,
    lowerLimit: 11.8,
    bulbYield: 14.3,
    leafYield: 2.9
  };

  const additionalData = {
    mean: 18.0,
    upperLimit: 21.4,
    lowerLimit: 14.7,
    bulbYield: 15.1,
    leafYield: 2.9
  };

  return (
    <YieldRangeVisualization 
      currentData={currentData}
      additionalData={additionalData}
      className="my-custom-class"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentData` | Object | See below | Data for the current sample scenario |
| `additionalData` | Object | See below | Data for the additional samples scenario |
| `className` | String | - | Optional additional CSS classes |

### Data Object Structure

Both `currentData` and `additionalData` props expect objects with the following structure:

```javascript
{
  mean: 17.2,        // Mean yield value
  upperLimit: 22.6,  // Upper confidence limit
  lowerLimit: 11.8,  // Lower confidence limit
  bulbYield: 14.3,   // Bulb yield component
  leafYield: 2.9     // Leaf yield component
}
```

## Default Values

The component includes sensible default values based on typical beet crop yields:

**Current Data Defaults:**
- Mean: 17.2 t DM/ha
- Upper Limit: 22.6 t DM/ha
- Lower Limit: 11.8 t DM/ha
- Bulb Yield: 14.3 t DM/ha
- Leaf Yield: 2.9 t DM/ha

**Additional Data Defaults:**
- Mean: 18.0 t DM/ha
- Upper Limit: 21.4 t DM/ha
- Lower Limit: 14.7 t DM/ha
- Bulb Yield: 15.1 t DM/ha
- Leaf Yield: 2.9 t DM/ha

## Styling

The component uses Tailwind CSS classes and follows the Beet Guru app's design system:

- **Container**: Light green background (`bg-green-50`) with rounded corners
- **Card**: White background with shadow
- **Current Bar**: Green color (`bg-green-500`)
- **Additional Samples Bar**: Blue color (`bg-blue-400`)
- **Headers**: Color-coded to match their respective bars

## Integration Examples

### In Report Viewer

```jsx
<ReportViewerScreen>
  <YieldRangeVisualization 
    currentData={assessmentData.current}
    additionalData={assessmentData.projected}
  />
</ReportViewerScreen>
```

### In Assessment Form

```jsx
<NewAssessmentScreen>
  {/* Other form fields */}
  
  <YieldRangeVisualization 
    currentData={calculateCurrentYield(formData)}
    additionalData={projectAdditionalSamples(formData)}
  />
</NewAssessmentScreen>
```

## Responsiveness

The component automatically adjusts its layout for different screen sizes:
- On mobile devices, the component maintains proper proportions and readability
- On desktop, it expands to utilize available space while maintaining visual balance

## Testing

The component includes comprehensive unit tests covering:
- Rendering without props
- Correct display of data values
- Statistics table accuracy
- Custom className application

Run tests with:
```bash
npm test YieldRangeVisualization
```

## Browser Support

The component uses standard CSS and JavaScript features supported by all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Future Enhancements

Potential improvements for future versions:
- Animation when data updates
- Interactive tooltips on hover
- Export functionality for the chart
- Additional visualization options (e.g., error bars, trend lines)
- Dark mode support
