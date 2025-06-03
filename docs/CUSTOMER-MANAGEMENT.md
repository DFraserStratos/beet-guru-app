# Customer Management System Documentation

## Overview

The Customer Management System allows retailer users to manage and view their farmer customers. This system consists of two main screens and supporting API infrastructure that enables retailers to track customer information, paddocks, assessments, and reports. The system is optimized for both desktop and mobile viewing with responsive table designs.

## User Roles

### Retailer Users
- **Primary Role**: Retail Consultant  
- **Access**: Customer management screens instead of paddock screens
- **Example User**: Roland Reed (roland@beetguru.com) from Oxford Agricultural Supplies
- **Navigation**: Shows "Customers" in sidebar instead of "Paddocks"

### Farmer Users  
- **Primary Role**: Farmer
- **Access**: Standard paddock/location screens
- **Example User**: Fred Forger (fred@beetguru.com) from Fred's Farm
- **Navigation**: Shows "Paddocks" in sidebar

## Screen Architecture

### 1. CustomersScreen (`src/components/screens/CustomersScreen.js`)

**Purpose**: Table view for retailers to manage their farmer customers

**Key Features**:
- **Search Functionality**: Search customers by name or email
- **Filtering System**: 
  - Status (Active/Inactive)
  - Region (Canterbury, Auckland, Waikato, Otago)
  - Sort options (Name A-Z/Z-A, Location, Recently Added, Last Assessment)
- **Responsive Table Columns**:
  - **Desktop**: Customer Name, Email, Location, Paddocks, Last Assessment, Status, Actions
  - **Mobile**: Customer Name, Actions (View Details only)
- **Mobile Optimizations**:
  - Simplified table with essential columns only
  - Removed "New Assessment" button (available in detail screen)
  - Horizontal scrollable table format maintained
- **Actions**: 
  - View Details (blue button) - available on all devices
  - New Assessment (green button) - desktop only

**UI Components Used**:
- `DataTable` with responsive column filtering
- `PageHeader` with title and Add Customer button
- Filter inputs with icons (Search, User, MapPin, ArrowDownUp)
- Status pills with conditional styling

### 2. CustomerDetailScreen (`src/components/screens/CustomerDetailScreen.js`)

**Purpose**: Detailed view of a specific customer for retailers

**Layout Structure**:
- **Header**: Customer name, email, back button, "Create New Assessment" button
- **Info Cards** (3-column grid):
  - Customer Info: Farm name, role, customer since date, **Edit button**
  - Location: Location, total paddocks, total area
  - Activity: Total reports, last assessment, status with toggle button
- **Split View Layout**:
  - **Left Column**: Draft Assessments + Paddocks
  - **Right Column**: Reports

**Key Features**:
- **Status Management**: Toggle customer between Active/Inactive with button in Activity card
- **Customer Editing**: Edit button in Customer Info card for customer details modification
- **Responsive Tables**: All tables maintain table format on mobile with simplified columns
  - **Draft Assessments**: 
    - Desktop: Started, Location, Crop, Arrow
    - Mobile: Started, Location, Arrow
  - **Paddocks**: Started, Location, Area, Actions (same on all devices)
  - **Reports**:
    - Desktop: Date, Title, Location, View Action
    - Mobile: Date, Title, View Action
- **Mobile Responsive**: Single column layout on mobile

**Action Handlers**:
- `handleToggleStatus()` - Change customer status
- `handleEditCustomer()` - Edit customer details
- `handleEditPaddock()` - Edit paddock details
- `handleDeletePaddock()` - Delete paddock
- `handleAddPaddock()` - Add new paddock
- `handleExportReports()` - Export customer reports

## Data Structure

### API Endpoints (`src/services/api.js`)

#### Customer Relationships
```javascript
customerRelationships: [
  {
    id: '1',
    retailerId: '2', // Roland's ID
    customerId: '1', // Fred's ID  
    customerType: 'farmer',
    relationshipStart: '2024-01-15',
    status: 'active' // or 'inactive'
  }
]
```

#### Customer API Methods
- `api.customers.getByRetailerId(retailerId)` - Get all customers for a retailer
- `api.customers.getById(customerId)` - Get specific customer details
- `api.customers.createRelationship(retailerData)` - Create new customer relationship

#### Supporting API Methods
- `api.locations.getByUserId(customerId)` - Get customer's paddocks
- `api.reports.getByUserId(customerId)` - Get customer's reports  
- `api.assessments.getDraftAssessments()` - Get draft assessments (filtered by customer)

### Data Flow
1. Retailer logs in → Sidebar shows "Customers" instead of "Paddocks"
2. CustomersScreen fetches customers via `getByRetailerId(user.id)`
3. Customer selection → Navigate to CustomerDetailScreen
4. CustomerDetailScreen fetches customer, locations, reports, and drafts in parallel
5. Status changes trigger `handleToggleStatus()` for future API integration

## UI Patterns & Components

### Responsive Table Design
- **Desktop**: Full table with all columns and complete feature set
- **Mobile**: Simplified tables with essential columns only
  - CustomersScreen: Name + Actions only
  - Draft Assessments: Started + Location + Arrow
  - Reports: Date + Title + View Action
  - Paddocks: Unchanged (already minimal)
- **No Card Layouts**: All tables maintain table format for consistent UX
- **Horizontal Scrolling**: Users can scroll tables horizontally if needed
- Status pills with conditional colors (green for active, gray for inactive)
- Consistent date formatting (NZ locale)

### Action Button Patterns
- **Primary Actions**: Green buttons (Add Customer, Create Assessment, Export Reports)
- **Secondary Actions**: Blue buttons (View Details)
- **Edit Actions**: Edit/Delete icons in table rows, Edit button in info cards
- **Status Actions**: Small toggle buttons with conditional styling
- **Mobile Considerations**: Reduced button text ("Add" vs "Add Customer")

## Technical Implementation

### Mobile Column Filtering
```javascript
// Column definition with mobile visibility control
const columns = [
  { key: 'name', label: 'Customer Name' },
  { key: 'email', label: 'Email', hideOnMobile: true },
  { key: 'location', label: 'Location', hideOnMobile: true },
  // ...
];

// Filter columns based on device
const visibleColumns = isMobile 
  ? columns.filter(column => !column.hideOnMobile)
  : columns;
```

### State Management
```javascript
// CustomersScreen filters
const [filters, setFilters] = useState({
  search: '',
  status: 'all',
  region: 'all', 
  sortBy: 'name'
});

// CustomerDetailScreen API hooks with mobile-optimized tables
const { data: customer } = useApi(api.customers.getById);
const { data: locations } = useApi(api.locations.getByUserId);
const { data: reports } = useApi(api.reports.getByUserId);
const { data: draftAssessments } = useApi(api.assessments.getDraftAssessments);
```

### Navigation Integration
```javascript
// App.js routing logic
{user?.role === 'retail-consultant' ? (
  showCustomerDetail ? (
    <CustomerDetailScreen customerId={selectedCustomerId} onBack={handleBackToCustomers} />
  ) : (
    <CustomersScreen onViewCustomer={handleViewCustomer} user={user} />
  )
) : (
  // Farmer screens...
)}
```

## Future Development Areas

### Immediate Implementation Needs
1. **Search Functionality**: Implement actual filtering logic for search input
2. **Status Toggle**: Connect `handleToggleStatus()` to backend API
3. **Customer Editing**: Connect `handleEditCustomer()` to customer edit modal/screen
4. **Paddock Management**: Implement edit/delete/add paddock functionality
5. **Report Export**: Implement `handleExportReports()` with file download
6. **Assessment Creation**: Connect "New Assessment" buttons to assessment flow

### API Enhancements Needed
1. **Customer Status Updates**: `api.customers.updateStatus(customerId, status)`
2. **Search Implementation**: Backend filtering for customer search
3. **Paddock Management**: CRUD operations for customer paddocks
4. **Report Export**: Generate and download customer reports

### UI/UX Improvements
1. **Confirmation Dialogs**: Add modals for delete actions and status changes
2. **Loading States**: Improve loading indicators for better UX
3. **Error Handling**: Enhanced error messages and recovery options
4. **Bulk Actions**: Multi-select for batch operations

### Mobile UX Improvements
1. **Touch Optimization**: Ensure all buttons meet minimum touch target sizes
2. **Table Performance**: Optimize table rendering for large customer lists on mobile
3. **Gesture Support**: Consider swipe gestures for common actions
4. **Accessibility**: Improve screen reader support for table navigation

## Testing Considerations

### Current Test Data
- **Retailer**: Roland Reed (ID: 2, oxford@beetguru.com)
- **Customer**: Fred Forger (ID: 1, fred@beetguru.com)  
- **Relationship**: Active since 2024-01-15
- **Paddocks**: 5 paddocks with varying areas and statuses
- **Assessments**: 3 draft assessments, 8 completed reports

### Key Test Scenarios
1. Retailer login → Customer list display (desktop vs mobile columns)
2. Customer search and filtering functionality
3. Customer detail view with responsive table layouts
4. Status toggle between active/inactive
5. **Mobile responsive behavior** for all table formats
6. Column visibility changes on device rotation
7. Touch interaction testing on mobile devices
8. Error states (no customers, API failures)

## File Structure
```
src/components/screens/
├── CustomersScreen.js          # Main customer list with mobile-optimized table
├── CustomerDetailScreen.js     # Customer details with responsive tables
└── __tests__/
    ├── CustomersScreen.test.js
    └── CustomerDetailScreen.test.js

src/services/
└── api.js                      # Customer API endpoints and mock data
```

This documentation provides complete context for the mobile-optimized customer management system, including responsive table implementations, simplified mobile columns, and consistent user experience across devices. 