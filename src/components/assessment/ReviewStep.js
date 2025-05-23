import React from 'react';
import { FormButtonNav } from '../ui/form';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';
import api from '../../services/api';
import { useApi } from '../../hooks';

/**
 * Fourth and final step of assessment creation - review and submit
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReviewStep = ({ formData, onBack, onComplete, onCancel, isMobile }) => {
  // Default to basic report type without showing options
  const reportType = 'basic';
  
  // Format data for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get cultivar display name (either selected or custom)
  const getCultivarName = () => {
    if (formData.cultivarId === 'other' && formData.customCultivarName) {
      return formData.customCultivarName + ' (Custom)';
    }
    return 'Brigadier'; // Default mock data
  };
  
  // Get stock type display name
  const getStockTypeDisplay = () => {
    const stockTypes = {
      'dairy': 'Dairy cows',
      'beef': 'Beef cattle',
      'ewes': 'Ewes',
      'lambs': 'Lambs',
      'goats': 'Goats',
      'horses': 'Horses'
    };
    
    return stockTypes[formData.stockType] || 'Not specified';
  };
  
  // Calculate results based on sample measurements
  const calculateResults = () => {
    // Get sample areas from formData
    const sampleAreas = formData.sampleAreas || [];
    
    // Calculate totals from sample measurements
    let totalLeafWeight = 0;
    let totalBulbWeight = 0;
    let validSamples = 0;
    
    sampleAreas.forEach(area => {
      const leafWeight = parseFloat(area.leafWeight) || 0;
      const bulbWeight = parseFloat(area.bulbWeight) || 0;
      
      if (leafWeight > 0 || bulbWeight > 0) {
        totalLeafWeight += leafWeight;
        totalBulbWeight += bulbWeight;
        validSamples++;
      }
    });
    
    if (validSamples === 0) {
      return { 
        yield: 'N/A', 
        totalYield: 'N/A', 
        feedingDays: 'N/A',
        bulbYield: 0,
        leafYield: 0
      };
    }
    
    // Calculate average weights
    const avgLeafWeight = totalLeafWeight / validSamples;
    const avgBulbWeight = totalBulbWeight / validSamples;
    
    // Get field setup data
    const rowSpacing = parseFloat(formData.rowSpacing) || 0.5;
    const measurementLength = parseFloat(formData.measurementLength) || 4;
    const area = rowSpacing * measurementLength;
    
    // Convert weights to yield per hectare
    const bulbYieldPerHa = (avgBulbWeight / area) * 10000;
    const leafYieldPerHa = (avgLeafWeight / area) * 10000;
    const totalYieldPerHa = bulbYieldPerHa + leafYieldPerHa;
    
    // Calculate total yield (assuming 3.5 ha as default)
    const assumedFieldArea = 3.5;
    const totalYield = totalYieldPerHa * assumedFieldArea;
    
    // Calculate feeding days (50 cows as default)
    const cowCount = 50;
    const kgPerCowPerDay = 8;
    const feedingDays = Math.floor(totalYield / (cowCount * kgPerCowPerDay));
    
    return {
      yield: totalYieldPerHa.toFixed(1) + ' t/ha',
      totalYield: totalYield.toFixed(1) + ' tonnes',
      feedingDays: feedingDays + ' days',
      cowCount,
      fieldArea: assumedFieldArea + ' ha',
      bulbYield: bulbYieldPerHa,
      leafYield: leafYieldPerHa,
      meanYield: totalYieldPerHa
    };
  };
  
  const results = calculateResults();
  
  // Get yield visualization data
  const getYieldVisualizationData = () => {
    const hasValidData = results.meanYield && results.meanYield > 0;
    
    if (!hasValidData) {
      // Return default values if no valid data
      return {
        currentData: {
          mean: 17.2,
          upperLimit: 22.6,
          lowerLimit: 11.8,
          bulbYield: 14.3,
          leafYield: 2.9
        },
        additionalData: {
          mean: 18.0,
          upperLimit: 21.4,
          lowerLimit: 14.7,
          bulbYield: 15.1,
          leafYield: 2.9
        }
      };
    }
    
    // Current data based on actual measurements
    const currentData = {
      mean: results.meanYield,
      upperLimit: results.meanYield * 1.3, // ±30% confidence interval
      lowerLimit: results.meanYield * 0.7,
      bulbYield: results.bulbYield,
      leafYield: results.leafYield
    };
    
    // Additional samples data (projected improvement)
    const additionalData = {
      mean: results.meanYield * 1.05, // 5% increase in mean
      upperLimit: results.meanYield * 1.05 * 1.2, // ±20% confidence interval (narrower)
      lowerLimit: results.meanYield * 1.05 * 0.8,
      bulbYield: results.bulbYield * 1.05,
      leafYield: results.leafYield
    };
    
    return { currentData, additionalData };
  };
  
  // API hooks for saving assessment
  const saveAssessmentApi = useApi(api.assessments.create);
  const generateReportApi = useApi(api.reports.generate);
  
  // Handle save and generate report
  const handleSaveAndGenerateReport = async () => {
    try {
      // Save assessment
      const assessment = await saveAssessmentApi.execute({
        ...formData,
        status: 'completed',
        dryMatter: formData.sampleAreas?.[0]?.dryMatter || formData.bulbEstimate,
        estimatedYield: results.yield,
        totalYield: results.totalYield,
        feedingCapacity: results.feedingDays,
        stockCount: results.cowCount
      });
      
      // Generate report
      let reportId = null;
      if (assessment) {
        const report = await generateReportApi.execute(assessment.id, reportType);
        reportId = report?.id || '1'; // Use a default ID if none returned
      }
      
      // Complete the process with report ID included
      onComplete({
        ...assessment,
        reportId
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    try {
      const assessment = await saveAssessmentApi.execute({
        ...formData,
        status: 'draft'
      });
      
      onComplete(assessment);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };
  
  const { currentData, additionalData } = getYieldVisualizationData();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Assessment</h2>
      
      <div className="space-y-6">
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium">Assessment Summary</h3>
          </div>
          
          <div className="divide-y">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Crop Details</h4>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-500">Location:</div>
                  <div className="text-gray-900">North Field</div>
                  
                  <div className="text-gray-500">Stock Type:</div>
                  <div className="text-gray-900">{getStockTypeDisplay()}</div>
                  
                  <div className="text-gray-500">Cultivar:</div>
                  <div className="text-gray-900">{getCultivarName()}</div>
                  
                  <div className="text-gray-500">Sowing Date:</div>
                  <div className="text-gray-900">{formatDate(formData.sowingDate)}</div>
                  
                  <div className="text-gray-500">Assessment Date:</div>
                  <div className="text-gray-900">{formatDate(formData.assessmentDate)}</div>
                  
                  <div className="text-gray-500">Water Type:</div>
                  <div className="text-gray-900">{formData.waterType === 'irrigated' ? 'Irrigated' : 'Dryland'}</div>
                  
                  <div className="text-gray-500">Est. Growing Cost:</div>
                  <div className="text-gray-900">${formData.estimatedGrowingCost || '0'}/ha</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Field Setup & Measurements</h4>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-500">Field Measurements:</div>
                  <div className="text-gray-900"></div>
                  
                  <div className="text-gray-500 pl-2">Row Spacing:</div>
                  <div className="text-gray-900">{formData.rowSpacing || '0.5'} m</div>
                  
                  <div className="text-gray-500 pl-2">Measurement Length:</div>
                  <div className="text-gray-900">{formData.measurementLength || '4'} m</div>
                  
                  <div className="text-gray-500">Dry Matter Estimates:</div>
                  <div className="text-gray-900"></div>
                  
                  <div className="text-gray-500 pl-2">Bulb Estimate:</div>
                  <div className="text-gray-900">{formData.bulbEstimate || '2'}%</div>
                  
                  <div className="text-gray-500 pl-2">Leaf Estimate:</div>
                  <div className="text-gray-900">{formData.leafEstimate || '3'}%</div>
                  
                  <div className="text-gray-500 pl-2">Value Type:</div>
                  <div className="text-gray-900">{formData.valueType === 'estimate' ? 'Estimate' : 'Actual'}</div>
                  
                  <div className="text-gray-500">Samples:</div>
                  <div className="text-gray-900">{formData.sampleAreas?.length || '0'} areas</div>
                  
                  <div className="text-gray-500">Average Weight:</div>
                  <div className="text-gray-900">
                    {formData.sampleAreas?.length > 0 
                      ? (formData.sampleAreas.reduce((sum, area) => 
                          sum + Number(area.leafWeight || 0) + Number(area.bulbWeight || 0), 0
                        ) / formData.sampleAreas.length).toFixed(1) 
                      : '0'} kg
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50">
              <h4 className="font-medium text-gray-900 mb-3">Results</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Estimated Yield</div>
                    <div className="text-3xl font-bold text-green-600">{results.yield}</div>
                    <div className="text-sm text-gray-500 mt-1">Total: {results.totalYield}</div>
                    <div className="text-xs text-gray-400 mt-1">Based on {results.fieldArea} field</div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Feeding Capacity</div>
                    <div className="text-3xl font-bold text-green-600">{results.feedingDays}</div>
                    <div className="text-sm text-gray-500 mt-1">For {results.cowCount} {getStockTypeDisplay()}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm">
                <p className="text-gray-500">These results are based on your measurements and can be refined with additional samples.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Yield Range Visualization */}
        {results.meanYield > 0 && (
          <YieldRangeVisualization 
            currentData={currentData}
            additionalData={additionalData}
            className="bg-transparent p-0"
          />
        )}
        
        {/* Button Navigation - Using the FormButtonNav component */}
        <FormButtonNav
          onNext={handleSaveAndGenerateReport}
          onBack={onBack}
          onCancel={onCancel}
          onSaveAsDraft={handleSaveAsDraft}
          showBack={true}
          nextLabel="Generate Report"
          isGeneratingReport={saveAssessmentApi.loading || generateReportApi.loading}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default ReviewStep;
