/**
 * Enhanced API service for the Beet Guru application
 * This extends the mock API with more detailed report data
 */

// Import the original API
import api from '../../services/api';

// Add more detailed report data functionality
const enhancedReportsAPI = {
  ...api.reports,
  
  // Override getById to include more detailed information
  getById: async (id) => {
    // Call the original getById method
    const report = await api.reports.getById(id);
    
    // Add additional detailed data
    return {
      ...report,
      detailed: true,
      executive_summary: `This report provides a comprehensive analysis of the ${report.cultivar} fodder beet crop at the specified location. The assessment shows promising results with excellent growth potential.`,
      recommendations: [
        'Begin transitioning animals to fodder beet gradually over a 10-14 day period',
        'Use electric fencing to implement strip grazing for optimal utilization',
        'Provide fiber supplementation (hay or straw) during the transition period',
        'Monitor animal health closely, especially during the first 3 weeks',
        'Consider mineral supplementation to balance the low phosphorus and sodium content of fodder beet',
        'Schedule a follow-up assessment in 4-6 weeks to monitor crop development'
      ],
      notes: `This assessment was conducted using industry standard methods and calculations. The ${report.cultivar} cultivar is performing well in the current conditions. The crop shows good uniformity across the field with minimal signs of disease or pest damage.`
    };
  }
};

// Enhanced assessment data 
const enhancedAssessmentsAPI = {
  ...api.assessments,
  
  // Override getById to include yield breakdown
  getById: async (id) => {
    // Call the original getById method
    const assessment = await api.assessments.getById(id);
    
    // Parse the estimatedYield to extract the number
    const yieldMatch = assessment.estimatedYield ? assessment.estimatedYield.match(/(\d+(\.\d+)?)/g) : null;
    const estimatedYieldNumber = yieldMatch ? parseFloat(yieldMatch[0]) : 0;
    
    // Calculate leaf and bulb components
    const leafYield = (estimatedYieldNumber * 0.3).toFixed(1); // 30% of total yield
    const bulbYield = (estimatedYieldNumber * 0.7).toFixed(1); // 70% of total yield
    
    // Add additional detailed data
    return {
      ...assessment,
      detailed: true,
      yieldBreakdown: {
        leafYield: `${leafYield} t/ha`,
        bulbYield: `${bulbYield} t/ha`,
        totalYield: assessment.estimatedYield
      }
    };
  }
};

// Create enhanced API
const enhancedAPI = {
  ...api,
  reports: enhancedReportsAPI,
  assessments: enhancedAssessmentsAPI
};

export default enhancedAPI;