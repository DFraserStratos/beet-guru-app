/**
 * API service for handling data fetching and backend communication
 * This is a placeholder that will be replaced with actual API calls
 * when backend integration is implemented
 */

import { logger } from '../utils/logger';
import fredTheFarmer from '../config/user';
import { rolandTheRetailer, amyTheAdmin, sarahMcKenzie, mikePatel, jessicaThompson, davidWilson, emilyRoberts } from '../config/user';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || '';
const API_TIMEOUT = 8000; // 8 seconds timeout

/**
 * Generic API request handler with timeout
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data or error
 */
const apiRequest = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
};

// Mock data store (will be replaced by actual API calls)
const mockData = {
  // Users - Fred the farmer (id: '1') and Roland the retailer (id: '2')
  // All locations below are associated with Fred via userId: '1'
  // This design supports retailer users who will access multiple farmers' data
  users: [fredTheFarmer, rolandTheRetailer, amyTheAdmin, sarahMcKenzie, mikePatel, jessicaThompson, davidWilson, emilyRoberts],
  
  // Customer relationships - which farmers each retailer can access
  customerRelationships: [
    {
      id: '1',
      retailerId: '2', // Roland
      customerId: '1', // Fred
      customerType: 'farmer',
      relationshipStart: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      retailerId: '2', // Roland
      customerId: '3', // Sarah
      customerType: 'farmer',
      relationshipStart: '2024-02-20',
      status: 'active'
    },
    {
      id: '3',
      retailerId: '2', // Roland
      customerId: '4', // Mike
      customerType: 'farmer',
      relationshipStart: '2024-03-10',
      status: 'active'
    },
    {
      id: '4',
      retailerId: '2', // Roland
      customerId: '5', // Jessica
      customerType: 'farmer',
      relationshipStart: '2024-01-30',
      status: 'active'
    },
    {
      id: '5',
      retailerId: '2', // Roland
      customerId: '6', // David
      customerType: 'farmer',
      relationshipStart: '2024-04-05',
      status: 'active'
    },
    {
      id: '6',
      retailerId: '2', // Roland
      customerId: '7', // Emily
      customerType: 'farmer',
      relationshipStart: '2024-02-14',
      status: 'active'
    },
    // Add the same customer relationships for Amy (admin user)
    {
      id: '7',
      retailerId: '8', // Amy (admin)
      customerId: '1', // Fred
      customerType: 'farmer',
      relationshipStart: '2024-01-15',
      status: 'active'
    },
    {
      id: '8',
      retailerId: '8', // Amy (admin)
      customerId: '3', // Sarah
      customerType: 'farmer',
      relationshipStart: '2024-02-20',
      status: 'active'
    },
    {
      id: '9',
      retailerId: '8', // Amy (admin)
      customerId: '4', // Mike
      customerType: 'farmer',
      relationshipStart: '2024-03-10',
      status: 'active'
    },
    {
      id: '10',
      retailerId: '8', // Amy (admin)
      customerId: '5', // Jessica
      customerType: 'farmer',
      relationshipStart: '2024-01-30',
      status: 'active'
    },
    {
      id: '11',
      retailerId: '8', // Amy (admin)
      customerId: '6', // David
      customerType: 'farmer',
      relationshipStart: '2024-04-05',
      status: 'active'
    },
    {
      id: '12',
      retailerId: '8', // Amy (admin)
      customerId: '7', // Emily
      customerType: 'farmer',
      relationshipStart: '2024-02-14',
      status: 'active'
    }
  ],
  
  // All paddocks belong to Fred (userId: '1') for clean data separation
  // When retailer users are added, they will query paddocks by userId to see specific farmers' data
  locations: [
    // Fred's paddocks (userId: '1')
    { 
      id: '1', 
      name: 'North Paddock', 
      userId: '1', // Fred's ID - ensures proper ownership
      area: 3.5,
      status: 'draft', // New status field: 'draft' or 'not-started'
      assessmentId: '4' // Reference to draft assessment
    },
    { 
      id: '2', 
      name: 'Mid Paddock', 
      userId: '1', // Fred's ID - ensures proper ownership
      area: 2.2,
      status: 'draft'
    },
    { 
      id: '3', 
      name: 'South Paddock', 
      userId: '1', // Fred's ID - ensures proper ownership
      area: 4.1,
      status: 'draft'
    },
    { 
      id: '4', 
      name: 'East Block', 
      userId: '1', // Fred's ID - ensures proper ownership
      area: 3.8,
      status: 'not-started'
    },
    { 
      id: '5', 
      name: 'West Block', 
      userId: '1', // Fred's ID - ensures proper ownership
      area: 2.7,
      status: 'not-started'
    },

    // Sarah's paddocks (userId: '3') - Golden Fields Farm
    { 
      id: '6', 
      name: 'Golden Meadow', 
      userId: '3',
      area: 4.2,
      status: 'draft',
      assessmentId: '12'
    },
    { 
      id: '7', 
      name: 'Upper Field', 
      userId: '3',
      area: 3.1,
      status: 'not-started'
    },
    { 
      id: '8', 
      name: 'Lower Field', 
      userId: '3',
      area: 2.8,
      status: 'draft'
    },
    { 
      id: '9', 
      name: 'Riverside Block', 
      userId: '3',
      area: 5.2,
      status: 'not-started'
    },

    // Mike's paddocks (userId: '4') - Green Hills Agriculture
    { 
      id: '10', 
      name: 'Hill Top Paddock', 
      userId: '4',
      area: 3.6,
      status: 'not-started'
    },
    { 
      id: '11', 
      name: 'Valley Floor', 
      userId: '4',
      area: 4.8,
      status: 'not-started'
    },
    { 
      id: '12', 
      name: 'North Slope', 
      userId: '4',
      area: 2.5,
      status: 'draft'
    },

    // Jessica's paddocks (userId: '5') - Sunny Ridge Farm
    { 
      id: '13', 
      name: 'Sunny Slope', 
      userId: '5',
      area: 3.9,
      status: 'draft',
      assessmentId: '14'
    },
    { 
      id: '14', 
      name: 'Ridge Top', 
      userId: '5',
      area: 2.6,
      status: 'not-started'
    },
    { 
      id: '15', 
      name: 'South Face', 
      userId: '5',
      area: 4.5,
      status: 'draft'
    },
    { 
      id: '16', 
      name: 'Back Paddock', 
      userId: '5',
      area: 3.2,
      status: 'not-started'
    },

    // David's paddocks (userId: '6') - Valley View Farm
    { 
      id: '17', 
      name: 'Valley Floor East', 
      userId: '6',
      area: 5.1,
      status: 'draft',
      assessmentId: '15'
    },
    { 
      id: '18', 
      name: 'Valley Floor West', 
      userId: '6',
      area: 4.7,
      status: 'not-started'
    },
    { 
      id: '19', 
      name: 'Terraced Field', 
      userId: '6',
      area: 2.9,
      status: 'draft'
    },

    // Emily's paddocks (userId: '7') - Riverbend Agriculture
    { 
      id: '20', 
      name: 'River Flats', 
      userId: '7',
      area: 4.3,
      status: 'draft',
      assessmentId: '16'
    },
    { 
      id: '21', 
      name: 'Bend Block', 
      userId: '7',
      area: 3.7,
      status: 'not-started'
    },
    { 
      id: '22', 
      name: 'High Ground', 
      userId: '7',
      area: 2.4,
      status: 'draft'
    },
    { 
      id: '23', 
      name: 'Creek Side', 
      userId: '7',
      area: 3.8,
      status: 'not-started'
    }
  ],
  cropTypes: [
    { id: '1', name: 'Fodder Beet' },
    { id: '2', name: 'Sugar Beet' },
    { id: '3', name: 'Mangels' }
  ],
  cultivars: [
    { id: '1', name: 'Brigadier', cropTypeId: '1', dryMatter: '12-15%', yield: '20-30 t/acre', growingTime: '24-28 weeks', description: 'Low dry matter content, high sugar content. Suitable for all stock types. World\'s number one for strip grazing.', isPggCultivar: true },
    { id: '2', name: 'Feldherr', cropTypeId: '1', dryMatter: '19-21%', yield: '16-20 t/ha', growingTime: '190-210 days', isPggCultivar: true },
    { id: '3', name: 'Kyros', cropTypeId: '1', dryMatter: '17-19%', yield: '17-22 t/ha', growingTime: '185-205 days', isPggCultivar: false },
    { id: '4', name: 'Blizzard', cropTypeId: '1', dryMatter: '13-15%', yield: '15-19 t/ha', growingTime: '170-190 days', isPggCultivar: true },
    { id: '5', name: 'Blaze', cropTypeId: '1', dryMatter: '16-18%', yield: '18-24 t/ha', growingTime: '180-200 days', isPggCultivar: false }
  ],
  assessments: [
    { 
      id: '1', 
      locationId: '1', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '21.8%', 
      date: '2025-05-08', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '22.4 t/ha',
      totalYield: '78.4 tonnes',
      feedingCapacity: '186 days',
      stockCount: 50
    },
    { 
      id: '2', 
      locationId: '2', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '19.0%', 
      date: '2025-05-07', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '17.2 t/ha',
      totalYield: '60.2 tonnes',
      feedingCapacity: '142 days',
      stockCount: 50
    },
    { 
      id: '3', 
      locationId: '3', 
      cropTypeId: '3', 
      cultivarId: '4', 
      dryMatter: '20.4%', 
      date: '2025-05-06', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.45,
      estimatedYield: '18.6 t/ha',
      totalYield: '55.8 tonnes',
      feedingCapacity: '115 days',
      stockCount: 60
    },
    { 
      // Draft assessment
      id: '4', 
      locationId: '1', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '18.2%', 
      date: '2025-05-12', 
      status: 'draft',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 45,
      sampleAreas: [
        { id: 1, sampleLength: '2', weight: '26.1', dryMatter: '18.2', notes: 'Edge of field' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      // Draft assessment for Mid Paddock
      id: '10', 
      locationId: '2', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '19.5%', 
      date: '2025-05-10', 
      status: 'draft',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 50,
      sampleAreas: [
        { id: 1, sampleLength: '1.8', weight: '22.3', dryMatter: '19.5', notes: 'Center area' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      // Draft assessment for South Paddock
      id: '11', 
      locationId: '3', 
      cropTypeId: '3', 
      cultivarId: '4', 
      dryMatter: '20.8%', 
      date: '2025-05-09', 
      status: 'draft',
      waterType: 'irrigated',
      rowSpacing: 0.45,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 60,
      sampleAreas: [
        { id: 1, sampleLength: '2.2', weight: '28.7', dryMatter: '20.8', notes: 'Good growth area' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      id: '5', 
      locationId: '4', 
      cropTypeId: '1', 
      cultivarId: '2', 
      dryMatter: '19.5%', 
      date: '2024-11-12', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.55,
      estimatedYield: '20.1 t/ha',
      totalYield: '76.4 tonnes',
      feedingCapacity: '155 days',
      stockCount: 55
    },
    { 
      id: '6', 
      locationId: '5', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '17.8%', 
      date: '2024-09-22', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '16.8 t/ha',
      totalYield: '45.4 tonnes',
      feedingCapacity: '98 days',
      stockCount: 50
    },
    { 
      id: '7', 
      locationId: '3', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '22.3%', 
      date: '2023-11-15', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '23.1 t/ha',
      totalYield: '94.7 tonnes',
      feedingCapacity: '196 days',
      stockCount: 58
    },
    { 
      id: '8', 
      locationId: '2', 
      cropTypeId: '3', 
      cultivarId: '4', 
      dryMatter: '18.5%', 
      date: '2023-10-08', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.45,
      estimatedYield: '19.2 t/ha',
      totalYield: '42.2 tonnes',
      feedingCapacity: '84 days',
      stockCount: 60
    },
    { 
      id: '9', 
      locationId: '1', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '20.1%', 
      date: '2022-10-25', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '18.7 t/ha',
      totalYield: '65.5 tonnes',
      feedingCapacity: '145 days',
      stockCount: 52
    },

    // Sarah's assessments (Golden Fields Farm - userId: '3')
    { 
      // Draft assessment for Golden Meadow
      id: '12', 
      locationId: '6', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '19.2%', 
      date: '2025-05-11', 
      status: 'draft',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 55,
      sampleAreas: [
        { id: 1, sampleLength: '2.1', weight: '25.8', dryMatter: '19.2', notes: 'Good coverage' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      id: '17', 
      locationId: '8', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '18.6%', 
      date: '2024-12-15', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '19.3 t/ha',
      totalYield: '54.0 tonnes',
      feedingCapacity: '132 days',
      stockCount: 48
    },
    { 
      id: '18', 
      locationId: '7', 
      cropTypeId: '1', 
      cultivarId: '2', 
      dryMatter: '20.8%', 
      date: '2024-03-20', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.55,
      estimatedYield: '21.2 t/ha',
      totalYield: '65.7 tonnes',
      feedingCapacity: '168 days',
      stockCount: 52
    },

    // Mike's assessments (Green Hills Agriculture - userId: '4') - no draft assessments
    { 
      id: '19', 
      locationId: '12', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '17.9%', 
      date: '2024-11-28', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '18.4 t/ha',
      totalYield: '46.0 tonnes',
      feedingCapacity: '126 days',
      stockCount: 45
    },
    { 
      id: '20', 
      locationId: '11', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '19.7%', 
      date: '2023-09-14', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '20.6 t/ha',
      totalYield: '98.9 tonnes',
      feedingCapacity: '198 days',
      stockCount: 60
    },

    // Jessica's assessments (Sunny Ridge Farm - userId: '5')
    { 
      // Draft assessment for Sunny Slope
      id: '14', 
      locationId: '13', 
      cropTypeId: '1', 
      cultivarId: '5', 
      dryMatter: '18.3%', 
      date: '2025-05-14', 
      status: 'draft',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 42,
      sampleAreas: [
        { id: 1, sampleLength: '2.3', weight: '24.6', dryMatter: '18.3', notes: 'Sunny exposure' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      id: '21', 
      locationId: '15', 
      cropTypeId: '3', 
      cultivarId: '4', 
      dryMatter: '22.1%', 
      date: '2024-10-05', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.45,
      estimatedYield: '22.8 t/ha',
      totalYield: '102.6 tonnes',
      feedingCapacity: '215 days',
      stockCount: 58
    },
    { 
      id: '22', 
      locationId: '14', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '19.4%', 
      date: '2024-01-18', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '17.8 t/ha',
      totalYield: '46.3 tonnes',
      feedingCapacity: '118 days',
      stockCount: 48
    },

    // David's assessments (Valley View Farm - userId: '6')
    { 
      // Draft assessment for Valley Floor East
      id: '15', 
      locationId: '17', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '20.6%', 
      date: '2025-05-15', 
      status: 'draft',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 75,
      sampleAreas: [
        { id: 1, sampleLength: '2.0', weight: '29.2', dryMatter: '20.6', notes: 'Valley floor quality' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      id: '23', 
      locationId: '19', 
      cropTypeId: '1', 
      cultivarId: '2', 
      dryMatter: '21.3%', 
      date: '2024-12-02', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.55,
      estimatedYield: '20.7 t/ha',
      totalYield: '60.0 tonnes',
      feedingCapacity: '158 days',
      stockCount: 55
    },
    { 
      id: '24', 
      locationId: '18', 
      cropTypeId: '3', 
      cultivarId: '4', 
      dryMatter: '18.8%', 
      date: '2023-08-22', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.45,
      estimatedYield: '19.1 t/ha',
      totalYield: '89.8 tonnes',
      feedingCapacity: '176 days',
      stockCount: 62
    },

    // Emily's assessments (Riverbend Agriculture - userId: '7')
    { 
      // Draft assessment for River Flats
      id: '16', 
      locationId: '20', 
      cropTypeId: '1', 
      cultivarId: '1', 
      dryMatter: '19.8%', 
      date: '2025-05-16', 
      status: 'draft',
      waterType: 'irrigated',
      rowSpacing: 0.5,
      estimatedYield: '',
      totalYield: '',
      feedingCapacity: '',
      stockCount: 68,
      sampleAreas: [
        { id: 1, sampleLength: '2.2', weight: '26.9', dryMatter: '19.8', notes: 'River flat soil' },
        { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' }
      ]
    },
    { 
      id: '25', 
      locationId: '22', 
      cropTypeId: '2', 
      cultivarId: '3', 
      dryMatter: '20.9%', 
      date: '2024-11-07', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '21.5 t/ha',
      totalYield: '51.6 tonnes',
      feedingCapacity: '142 days',
      stockCount: 52
    },
    { 
      id: '26', 
      locationId: '21', 
      cropTypeId: '3', 
      cultivarId: '4', 
      dryMatter: '19.1%', 
      date: '2024-02-29', 
      status: 'completed',
      waterType: 'irrigated',
      rowSpacing: 0.45,
      estimatedYield: '18.9 t/ha',
      totalYield: '69.9 tonnes',
      feedingCapacity: '154 days',
      stockCount: 58
    },
    { 
      id: '27', 
      locationId: '23', 
      cropTypeId: '1', 
      cultivarId: '5', 
      dryMatter: '17.6%', 
      date: '2023-07-11', 
      status: 'completed',
      waterType: 'dryland',
      rowSpacing: 0.5,
      estimatedYield: '16.9 t/ha',
      totalYield: '64.2 tonnes',
      feedingCapacity: '128 days',
      stockCount: 46
    }
  ],
  reports: [
    {
      id: '1',
      assessmentId: '1',
      title: 'North Paddock Assessment',
      type: 'basic',
      created: '2025-05-08',
      status: 'sent',
      pages: 3,
      recipients: 1,
      cultivar: 'Brigadier',
      season: '2024/2025'
    },
    {
      id: '2',
      assessmentId: '2',
      title: 'Mid Paddock Overview',
      type: 'advanced',
      created: '2025-05-07',
      status: 'sent',
      pages: 4,
      recipients: 2,
      cultivar: 'Kyros',
      season: '2024/2025'
    },
    {
      id: '3',
      assessmentId: '3',
      title: 'South Paddock Analysis',
      type: 'basic',
      created: '2025-05-06',
      status: 'sent',
      pages: 5,
      recipients: 3,
      cultivar: 'Blizzard',
      season: '2024/2025'
    },
    {
      id: '4',
      assessmentId: '5',
      title: 'East Block November Report',
      type: 'basic',
      created: '2024-11-12',
      status: 'sent',
      pages: 3,
      recipients: 2,
      cultivar: 'Feldherr',
      season: '2024/2025'
    },
    {
      id: '5',
      assessmentId: '6',
      title: 'West Block Harvest Summary',
      type: 'advanced',
      created: '2024-09-22',
      status: 'sent',
      pages: 5,
      recipients: 4,
      cultivar: 'Kyros',
      season: '2024/2025'
    },
    {
      id: '6',
      assessmentId: '7',
      title: 'South Paddock 2023 Analysis',
      type: 'basic',
      created: '2023-11-15',
      status: 'sent',
      pages: 4,
      recipients: 2,
      cultivar: 'Brigadier',
      season: '2023/2024'
    },
    {
      id: '7',
      assessmentId: '8',
      title: 'Mid Paddock October Evaluation',
      type: 'advanced',
      created: '2023-10-08',
      status: 'sent',
      pages: 4,
      recipients: 3,
      cultivar: 'Blizzard',
      season: '2023/2024'
    },
    {
      id: '8',
      assessmentId: '9',
      title: 'North Paddock 2022 Assessment',
      type: 'basic',
      created: '2022-10-25',
      status: 'sent',
      pages: 3,
      recipients: 2,
      cultivar: 'Kyros',
      season: '2022/2023'
    },

    // Sarah's reports removed - she has completed assessments but no reports generated yet

    // Mike's reports (Green Hills Agriculture)
    {
      id: '9',
      assessmentId: '19',
      title: 'North Slope Harvest Summary',
      type: 'basic',
      created: '2024-11-28',
      status: 'sent',
      pages: 3,
      recipients: 2,
      cultivar: 'Brigadier',
      season: '2024/2025'
    },
    {
      id: '10',
      assessmentId: '20',
      title: 'Valley Floor Assessment 2023',
      type: 'advanced',
      created: '2023-09-14',
      status: 'sent',
      pages: 5,
      recipients: 3,
      cultivar: 'Kyros',
      season: '2023/2024'
    },

    // Jessica's reports (Sunny Ridge Farm)
    {
      id: '11',
      assessmentId: '21',
      title: 'South Face October Evaluation',
      type: 'advanced',
      created: '2024-10-05',
      status: 'sent',
      pages: 6,
      recipients: 4,
      cultivar: 'Blizzard',
      season: '2024/2025'
    },
    {
      id: '12',
      assessmentId: '22',
      title: 'Ridge Top January Report',
      type: 'basic',
      created: '2024-01-18',
      status: 'sent',
      pages: 3,
      recipients: 2,
      cultivar: 'Brigadier',
      season: '2023/2024'
    },

    // David's reports (Valley View Farm)
    {
      id: '13',
      assessmentId: '23',
      title: 'Terraced Field December Summary',
      type: 'basic',
      created: '2024-12-02',
      status: 'sent',
      pages: 4,
      recipients: 2,
      cultivar: 'Feldherr',
      season: '2024/2025'
    },
    {
      id: '14',
      assessmentId: '24',
      title: 'Valley Floor West 2023 Analysis',
      type: 'advanced',
      created: '2023-08-22',
      status: 'sent',
      pages: 5,
      recipients: 3,
      cultivar: 'Blizzard',
      season: '2023/2024'
    },

    // Emily's reports (Riverbend Agriculture)
    {
      id: '15',
      assessmentId: '25',
      title: 'High Ground November Report',
      type: 'basic',
      created: '2024-11-07',
      status: 'sent',
      pages: 3,
      recipients: 2,
      cultivar: 'Kyros',
      season: '2024/2025'
    },
    {
      id: '16',
      assessmentId: '26',
      title: 'Bend Block February Assessment',
      type: 'advanced',
      created: '2024-02-29',
      status: 'sent',
      pages: 4,
      recipients: 2,
      cultivar: 'Blizzard',
      season: '2023/2024'
    },
    {
      id: '17',
      assessmentId: '27',
      title: 'Creek Side July Summary',
      type: 'basic',
      created: '2023-07-11',
      status: 'sent',
      pages: 3,
      recipients: 1,
      cultivar: 'Blaze',
      season: '2023/2024'
    }
  ],
  // Mock storage for verification codes
  verificationCodes: []
};

// Helper function to simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate a random 4-digit code
 * @returns {string} 4-digit code
 */
const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Auth API
 */
export const authAPI = {
  // Get Fred the farmer user details
  getUser: async () => {
    await delay();
    return fredTheFarmer;
  },
  
  login: async (email, password) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    if (!user || password !== user.password) {
      throw new Error('Invalid credentials');
    }
    return user;
  },
  
  // Password authentication
  loginWithPassword: async (email, password) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Check if user has a password
    if (!user.hasPassword || !user.password) {
      throw new Error('This account uses verification code authentication only');
    }
    
    // Verify password
    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
  
  register: async (userData) => {
    await delay();
    const newUser = {
      id: String(mockData.users.length + 1),
      ...userData
    };
    mockData.users.push(newUser);
    return newUser;
  },
  
  resetPassword: async (email) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return { success: true };
  },
  
  // Check if email exists (will always return true for Fred's email)
  checkEmailExists: async (email) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    return { exists: Boolean(user) };
  },
  
  // New method to generate and send verification code
  generateVerificationCode: async (email) => {
    await delay(800); // Slightly longer delay to simulate email sending
    
    // Remove any existing codes for this email
    mockData.verificationCodes = mockData.verificationCodes.filter(
      c => c.email !== email
    );
    
    const code = generateCode();
    
    // Store code with email, expiration, and attempt count
    mockData.verificationCodes.push({
      code,
      email,
      expiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attempts: 0,
      createdAt: new Date()
    });
    
    // In a real implementation, this would send an email
    console.log(`[Demo] Verification code for ${email}: ${code}`);
    
    return { 
      success: true,
      message: 'Verification code sent'
    };
  },
  
  // New method to verify code
  verifyCode: async (email, code) => {
    await delay();
    
    const codeData = mockData.verificationCodes.find(
      c => c.email === email
    );
    
    if (!codeData) {
      throw new Error('No verification code found. Please request a new one.');
    }
    
    // Check if code has expired
    if (new Date() > new Date(codeData.expiry)) {
      // Remove expired code
      mockData.verificationCodes = mockData.verificationCodes.filter(
        c => c.email !== email
      );
      throw new Error('Verification code has expired. Please request a new one.');
    }
    
    // Increment attempts
    codeData.attempts++;
    
    // Check if too many attempts
    if (codeData.attempts > 5) {
      // Remove code after too many attempts
      mockData.verificationCodes = mockData.verificationCodes.filter(
        c => c.email !== email
      );
      throw new Error('Too many failed attempts. Please request a new code.');
    }
    
    // Verify the code
    if (codeData.code !== code) {
      const remainingAttempts = 5 - codeData.attempts;
      throw new Error(`Invalid code. ${remainingAttempts} attempts remaining.`);
    }
    
    // Code is valid - remove it (single use)
    mockData.verificationCodes = mockData.verificationCodes.filter(
      c => c.email !== email
    );
    
    // Check if user exists
    const user = mockData.users.find(u => u.email === email);
    
    return {
      success: true,
      email: email,
      isExistingUser: Boolean(user),
      user: user || null
    };
  },
  
  // Method to complete login with verified email
  loginWithVerifiedEmail: async (email) => {
    await delay();
    
    const user = mockData.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
};

/**
 * Assessments API
 */
export const assessmentsAPI = {
  // Helper function to filter assessments by user
  _filterAssessmentsByUser: (assessments, userId = null) => {
    if (!userId) {
      return assessments; // Return all if no user specified (for retailers)
    }
    
    // Get user's locations
    const userLocations = mockData.locations.filter(l => l.userId === userId);
    const userLocationIds = userLocations.map(l => l.id);
    
    // Filter assessments to only include those for user's locations
    return assessments.filter(a => userLocationIds.includes(a.locationId));
  },

  getAll: async (userId = null) => {
    await delay();
    const filteredAssessments = assessmentsAPI._filterAssessmentsByUser(mockData.assessments, userId);
    
    return filteredAssessments.map(assessment => {
      const location = mockData.locations.find(l => l.id === assessment.locationId);
      const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
      return {
        ...assessment,
        location: location?.name,
        cropType: cropType?.name
      };
    });
  },
  
  getCompletedAssessments: async (userId = null) => {
    await delay();
    const filteredAssessments = assessmentsAPI._filterAssessmentsByUser(
      mockData.assessments.filter(a => a.status === 'completed'),
      userId
    );
    
    return filteredAssessments.map(assessment => {
      const location = mockData.locations.find(l => l.id === assessment.locationId);
      const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
      return {
        ...assessment,
        location: location?.name,
        cropType: cropType?.name
      };
    });
  },
  
  getDraftAssessments: async (userId = null) => {
    await delay();
    const filteredAssessments = assessmentsAPI._filterAssessmentsByUser(
      mockData.assessments.filter(a => a.status === 'draft'),
      userId
    );
    
    return filteredAssessments.map(assessment => {
      const location = mockData.locations.find(l => l.id === assessment.locationId);
      const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
      return {
        ...assessment,
        location: location?.name,
        cropType: cropType?.name
      };
    });
  },
  
  getById: async (id) => {
    await delay();
    const assessment = mockData.assessments.find(a => a.id === id);
    if (!assessment) {
      throw new Error('Assessment not found');
    }
    
    const location = mockData.locations.find(l => l.id === assessment.locationId);
    const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
    const cultivar = mockData.cultivars.find(c => c.id === assessment.cultivarId);
    
    return {
      ...assessment,
      location: location?.name,
      cropType: cropType?.name,
      cultivar: cultivar?.name
    };
  },
  
  create: async (assessmentData) => {
    await delay();
    const newAssessment = {
      id: String(mockData.assessments.length + 1),
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      ...assessmentData
    };
    mockData.assessments.push(newAssessment);
    return newAssessment;
  },
  
  update: async (id, assessmentData) => {
    await delay();
    const index = mockData.assessments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Assessment not found');
    }
    
    const updatedAssessment = {
      ...mockData.assessments[index],
      ...assessmentData
    };
    
    mockData.assessments[index] = updatedAssessment;
    return updatedAssessment;
  },
  
  delete: async (id) => {
    await delay();
    const index = mockData.assessments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Assessment not found');
    }
    
    mockData.assessments.splice(index, 1);
    return { success: true };
  }
};

/**
 * Reports API
 */
export const reportsAPI = {
  // Helper function to filter reports by user
  _filterReportsByUser: (reports, userId = null) => {
    if (!userId) {
      return reports; // Return all if no user specified (for retailers)
    }
    
    // Get user's locations
    const userLocations = mockData.locations.filter(l => l.userId === userId);
    const userLocationIds = userLocations.map(l => l.id);
    
    // Get user's assessments (assessments for user's locations)
    const userAssessments = mockData.assessments.filter(a => 
      userLocationIds.includes(a.locationId)
    );
    const userAssessmentIds = userAssessments.map(a => a.id);
    
    // Filter reports to only include those for user's assessments
    return reports.filter(r => userAssessmentIds.includes(r.assessmentId));
  },

  getAll: async (userId = null) => {
    await delay();
    const filteredReports = reportsAPI._filterReportsByUser(mockData.reports, userId);
    
    return filteredReports.map(report => {
      const assessment = mockData.assessments.find(a => a.id === report.assessmentId);
      const location = assessment 
        ? mockData.locations.find(l => l.id === assessment.locationId)
        : null;
      
      return {
        ...report,
        location: location?.name || ''
      };
    });
  },
  
  getById: async (id) => {
    await delay();
    const report = mockData.reports.find(r => r.id === id);
    if (!report) {
      throw new Error('Report not found');
    }
    return report;
  },
  
  generate: async (assessmentId, type = 'basic') => {
    await delay();
    const assessment = mockData.assessments.find(a => a.id === assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }
    
    const location = mockData.locations.find(l => l.id === assessment.locationId);
    const cultivar = mockData.cultivars.find(c => c.id === assessment.cultivarId);
    
    // Determine season based on assessment date
    const assessmentDate = new Date(assessment.date);
    const year = assessmentDate.getFullYear();
    const month = assessmentDate.getMonth() + 1; // January is 0
    
    // If month is after June, season is current/next year, otherwise previous/current year
    const season = month > 6 
      ? `${year}/${year + 1}` 
      : `${year - 1}/${year}`;
    
    const newReport = {
      id: String(mockData.reports.length + 1),
      assessmentId,
      title: `${location.name} ${type === 'basic' ? 'Assessment' : 'Overview'}`,
      type,
      created: new Date().toISOString().split('T')[0],
      status: 'draft',
      pages: type === 'basic' ? 3 : 5,
      recipients: 0,
      cultivar: cultivar?.name || '',
      season
    };
    
    mockData.reports.push(newReport);
    return newReport;
  },
  
  send: async (id, recipients) => {
    await delay();
    const index = mockData.reports.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Report not found');
    }
    
    mockData.reports[index] = {
      ...mockData.reports[index],
      status: 'sent',
      recipients: recipients.length
    };
    
    return mockData.reports[index];
  }
};

/**
 * References API (locations, crop types, cultivars, etc.)
 */
export const referencesAPI = {
  getLocations: async (withStatus = false, userId = null) => {
    await delay();
    
    // Filter locations by user if userId is provided
    let locations = userId 
      ? mockData.locations.filter(l => l.userId === userId)
      : mockData.locations;
    
    if (withStatus) {
      // Return locations with their status and draft assessment if exists
      return Promise.all(locations.map(async location => {
        // If the location has a draft assessment, include it
        if (location.status === 'draft' && location.assessmentId) {
          try {
            const assessment = await assessmentsAPI.getById(location.assessmentId);
            return {
              ...location,
              draftAssessment: assessment
            };
          } catch (error) {
            return location;
          }
        }
        return location;
      }));
    }
    
    return locations;
  },
  
  getLocationById: async (id) => {
    await delay();
    const location = mockData.locations.find(l => l.id === id);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  },
  
  // Get locations for a specific user (for retailers viewing customer paddocks)
  getByUserId: async (userId) => {
    await delay();
    return mockData.locations.filter(l => l.userId === userId);
  },
  
  createLocation: async (locationData) => {
    await delay(800); // Slightly longer delay to simulate server processing
    const newLocation = {
      id: String(mockData.locations.length + 1),
      status: 'not-started',
      ...locationData
    };
    mockData.locations.push(newLocation);
    return newLocation;
  },
  
  updateLocation: async (id, locationData) => {
    await delay(800);
    const index = mockData.locations.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('Location not found');
    }
    
    const updatedLocation = {
      ...mockData.locations[index],
      ...locationData
    };
    
    mockData.locations[index] = updatedLocation;
    return updatedLocation;
  },
  
  deleteLocation: async (id) => {
    await delay(800);
    const index = mockData.locations.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('Location not found');
    }
    
    // Check if location is used in any assessments
    const isUsed = mockData.assessments.some(a => a.locationId === id);
    if (isUsed) {
      throw new Error('Cannot delete location that is used in assessments');
    }
    
    mockData.locations.splice(index, 1);
    return { success: true };
  },
  
  getCropTypes: async () => {
    await delay();
    return mockData.cropTypes;
  },
  
  getCultivars: async (cropTypeId = null) => {
    await delay();
    if (cropTypeId) {
      return mockData.cultivars.filter(c => c.cropTypeId === cropTypeId);
    }
    return mockData.cultivars;
  },
  
  createCultivar: async (cultivarData) => {
    await delay();
    const newCultivar = {
      id: String(mockData.cultivars.length + 1),
      ...cultivarData
    };
    mockData.cultivars.push(newCultivar);
    return newCultivar;
  }
};

/**
 * Customers API - for retailers to manage their farmer customers
 */
export const customersAPI = {
  // Get all customers for a specific retailer
  getByRetailerId: async (retailerId) => {
    await delay();
    
    // Find all customer relationships for this retailer
    const relationships = mockData.customerRelationships.filter(
      rel => rel.retailerId === retailerId && rel.status === 'active'
    );
    
    // Get customer details for each relationship
    const customers = relationships.map(rel => {
      const customer = mockData.users.find(u => u.id === rel.customerId);
      if (!customer) return null;
      
      // Get customer's locations for paddock count
      const customerLocations = mockData.locations.filter(l => l.userId === customer.id);
      
      // Get customer's last assessment date
      const customerAssessments = mockData.assessments.filter(a => {
        const location = mockData.locations.find(l => l.id === a.locationId);
        return location && location.userId === customer.id && a.status === 'completed';
      });
      
      const lastAssessment = customerAssessments.length > 0
        ? customerAssessments.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
        : null;
      
      return {
        ...customer,
        paddockCount: customerLocations.length,
        lastAssessment,
        relationshipStart: rel.relationshipStart,
        status: rel.status
      };
    }).filter(Boolean);
    
    return customers;
  },
  
  // Get a specific customer by ID (for retailers)
  getById: async (customerId) => {
    await delay();
    const customer = mockData.users.find(u => u.id === customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    
    // Find the relationship to get additional info
    const relationship = mockData.customerRelationships.find(
      rel => rel.customerId === customerId
    );
    
    // Get customer's locations for paddock count
    const customerLocations = mockData.locations.filter(l => l.userId === customer.id);
    
    // Get customer's last assessment date
    const customerAssessments = mockData.assessments.filter(a => {
      const location = mockData.locations.find(l => l.id === a.locationId);
      return location && location.userId === customer.id && a.status === 'completed';
    });
    
    const lastAssessment = customerAssessments.length > 0
      ? customerAssessments.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
      : null;
    
    return {
      ...customer,
      paddockCount: customerLocations.length,
      lastAssessment,
      relationshipStart: relationship?.relationshipStart,
      status: relationship?.status || 'active'
    };
  },
  
  // Create a new customer relationship
  createRelationship: async (retailerId, customerData) => {
    await delay();
    
    // Create new customer user
    const newCustomer = {
      id: String(mockData.users.length + 1),
      ...customerData,
      accountType: 'farmer'
    };
    
    // Create relationship
    const newRelationship = {
      id: String(mockData.customerRelationships.length + 1),
      retailerId,
      customerId: newCustomer.id,
      customerType: 'farmer',
      relationshipStart: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    mockData.users.push(newCustomer);
    mockData.customerRelationships.push(newRelationship);
    
    return {
      ...newCustomer,
      relationshipStart: newRelationship.relationshipStart,
      status: newRelationship.status
    };
  }
};

/**
 * Enhanced Reports API to support retailer access to customer reports
 */
const enhancedReportsAPI = {
  ...reportsAPI,
  
  // Get reports for a specific user (customer) - for retailers
  getByUserId: async (userId) => {
    await delay();
    
    // Get all assessments for this user's locations
    const userLocations = mockData.locations.filter(l => l.userId === userId);
    const userLocationIds = userLocations.map(l => l.id);
    
    const userAssessments = mockData.assessments.filter(a => 
      userLocationIds.includes(a.locationId) && a.status === 'completed'
    );
    
    // Get reports for these assessments
    const userReports = mockData.reports.filter(r => 
      userAssessments.some(a => a.id === r.assessmentId)
    );
    
    return userReports.map(report => {
      const assessment = mockData.assessments.find(a => a.id === report.assessmentId);
      const location = assessment 
        ? mockData.locations.find(l => l.id === assessment.locationId)
        : null;
      const cropType = assessment
        ? mockData.cropTypes.find(c => c.id === assessment.cropTypeId)
        : null;
      
      return {
        ...report,
        location: location?.name || '',
        cropType: cropType?.name || ''
      };
    });
  }
};

// Updated main API export with enhanced functionality
const api = {
  auth: authAPI,
  locations: referencesAPI,
  assessments: assessmentsAPI,
  reports: enhancedReportsAPI,
  customers: customersAPI, // New customers API
  references: referencesAPI, // Keep references for backward compatibility
  cropTypes: referencesAPI,
  cultivars: referencesAPI
};

// Export all APIs together
export default api;