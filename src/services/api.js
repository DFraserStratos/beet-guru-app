/**
 * API service for handling data fetching and backend communication
 * This is a placeholder that will be replaced with actual API calls
 * when backend integration is implemented
 */

import personas from './personas';

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
  // Replace users with personas for authentication
  users: personas,
  
  // Store the last selected persona to avoid selecting the same one twice in a row
  lastSelectedPersonaId: null,
  
  locations: [
    { 
      id: '1', 
      name: 'North Paddock', 
      userId: '1',
      area: 3.5,
      status: 'draft', // New status field: 'draft' or 'not-started'
      assessmentId: '4' // Reference to draft assessment
    },
    { 
      id: '2', 
      name: 'Mid Paddock', 
      userId: '1',
      area: 2.2,
      status: 'draft'
    },
    { 
      id: '3', 
      name: 'South Paddock', 
      userId: '1',
      area: 4.1,
      status: 'draft'
    },
    { 
      id: '4', 
      name: 'East Block', 
      userId: '1',
      area: 3.8,
      status: 'not-started'
    },
    { 
      id: '5', 
      name: 'West Block', 
      userId: '1',
      area: 2.7,
      status: 'not-started'
    }
  ],
  cropTypes: [
    { id: '1', name: 'Fodder Beet' },
    { id: '2', name: 'Sugar Beet' },
    { id: '3', name: 'Mangels' }
  ],
  cultivars: [
    { id: '1', name: 'Brigadier', cropTypeId: '1', dryMatter: '12-15%', yield: '20-30 t/acre', growingTime: '24-28 weeks', description: 'Low dry matter content, high sugar content. Suitable for all stock types. World\'s number one for strip grazing.' },
    { id: '2', name: 'Feldherr', cropTypeId: '1', dryMatter: '19-21%', yield: '16-20 t/ha', growingTime: '190-210 days' },
    { id: '3', name: 'Kyros', cropTypeId: '1', dryMatter: '17-19%', yield: '17-22 t/ha', growingTime: '185-205 days' },
    { id: '4', name: 'Blizzard', cropTypeId: '1', dryMatter: '13-15%', yield: '15-19 t/ha', growingTime: '170-190 days' },
    { id: '5', name: 'Blaze', cropTypeId: '1', dryMatter: '16-18%', yield: '18-24 t/ha', growingTime: '180-200 days' }
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
    }
  ],
  // Mock storage for verification codes
  verificationCodes: []
};

/**
 * Simulate API delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate a random 6-digit code
 * @returns {string} 6-digit code
 */
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Auth API
 */
export const authAPI = {
  // New method to get a random persona
  getRandomPersona: async () => {
    await delay();
    
    // Get a random persona that's different from the last selected one
    const availablePersonas = mockData.lastSelectedPersonaId 
      ? mockData.users.filter(p => p.id !== mockData.lastSelectedPersonaId)
      : mockData.users;
    
    const randomIndex = Math.floor(Math.random() * availablePersonas.length);
    const selectedPersona = availablePersonas[randomIndex];
    
    // Store the selected persona ID to avoid selecting it again next time
    mockData.lastSelectedPersonaId = selectedPersona.id;
    
    return selectedPersona;
  },
  
  login: async (email, password) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials');
    }
    return user;
  },
  
  // New method to support password authentication
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
  
  // Modified to work with personas
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
  getAll: async () => {
    await delay();
    return mockData.assessments.map(assessment => {
      const location = mockData.locations.find(l => l.id === assessment.locationId);
      const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
      return {
        ...assessment,
        location: location?.name,
        cropType: cropType?.name
      };
    });
  },
  
  getCompletedAssessments: async () => {
    await delay();
    return mockData.assessments
      .filter(a => a.status === 'completed')
      .map(assessment => {
        const location = mockData.locations.find(l => l.id === assessment.locationId);
        const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
        return {
          ...assessment,
          location: location?.name,
          cropType: cropType?.name
        };
      });
  },
  
  getDraftAssessments: async () => {
    await delay();
    return mockData.assessments
      .filter(a => a.status === 'draft')
      .map(assessment => {
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
  getAll: async () => {
    await delay();
    return mockData.reports.map(report => {
      const assessment = mockData.assessments.find(a => a.id === report.assessmentId);
      const location = assessment 
        ? mockData.locations.find(l => l.id === assessment.locationId)
        : null;
      const cropType = assessment
        ? mockData.cropTypes.find(c => c.id === assessment.cropTypeId)
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
  getLocations: async (withStatus = false) => {
    await delay();
    
    if (withStatus) {
      // Return locations with their status and draft assessment if exists
      return Promise.all(mockData.locations.map(async location => {
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
    
    return mockData.locations;
  },
  
  getLocationById: async (id) => {
    await delay();
    const location = mockData.locations.find(l => l.id === id);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
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

// Export all APIs together
export default {
  auth: authAPI,
  assessments: assessmentsAPI,
  reports: reportsAPI,
  references: referencesAPI
};