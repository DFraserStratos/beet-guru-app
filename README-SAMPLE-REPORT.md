# Beet Guru App Sample Report Feature

This branch adds a sample report feature to the Beet Guru application. When users click on a report in the Reports screen, they'll be shown a detailed report with information about their beet crop assessment.

## Getting Started

To get this project running locally:

1. Clone the repository:
```
git clone https://github.com/DFraserStratos/beet-guru-app.git
cd beet-guru-app
```

2. Install dependencies:
```
npm install
```

3. Make sure to install all required packages:
```
npm install react react-dom lucide-react
```

4. Start the development server:
```
npm start
```

## Troubleshooting

If you encounter errors about missing modules:

1. Make sure you have all the required hooks and components in the correct directories:
   - `src/hooks/useApi.js`
   - `src/hooks/useDeviceDetection.js`
   - `src/hooks/useForm.js`
   - `src/hooks/useLocalStorage.js`
   - `src/hooks/index.js`
   - `src/components/utility/ErrorBoundary.js`

2. Ensure you have the Lucide React package installed:
```
npm install lucide-react
```

3. If you still encounter issues, create a stub file for any missing component with basic content to get past the initial errors.

## Features

The sample report feature includes:

- Detailed report layout with sections for:
  - Executive summary
  - Crop information
  - Field measurements
  - Results with yield estimate and feeding capacity
  - Recommendations
  - Notes

- Integration with the mock API to fetch report and assessment data
- Back navigation to return to the reports list
- Responsive design that works on both mobile and desktop

## Implementation Details

- `ReportViewerScreen.js`: The main component for displaying report details
- Updates to `ReportsScreen.js`: Modified to show the report viewer when a report is clicked
- Enhanced `AssessmentTable`: Added hover states and cursor styles for better UX