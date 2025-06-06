import React from 'react';
import { FormButtonNav } from '../ui/form';
import api from '../../services/api';
import { useApi } from '../../hooks';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';

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
    // Simplified calculation for demonstration
    const validSamples = formData.sampleAreas?.filter(
      area => area.sampleLength && area.weight && area.dryMatter
    ) || [];
    
    if (validSamples.length === 0) {
      return { 
        yield: 'N/A', 
        totalYield: 'N/A', 
        feedingDays: 'N/A' 
      };
    }
    
    // Average dry matter percentage
    const avgDryMatter = validSamples.reduce(
      (sum, area) => sum + Number(area.dryMatter), 0
    ) / validSamples.length;
    
    // Average weight per sample length
    const avgWeightPerMeter = validSamples.reduce(
      (sum, area) => sum + (Number(area.weight) / Number(area.sampleLength)), 0
    ) / validSamples.length;
    
    // Estimate yield based on row spacing and calculated weight
    const rowSpacing = Number(formData.rowSpacing) || 0.5;
    const yieldPerHa = avgWeightPerMeter * (10000 / (rowSpacing * 100)) * (avgDryMatter / 100);
    
    // Calculate total yield (assuming 3.5 ha as default)
    const assumedFieldArea = 3.5;
    const totalYield = yieldPerHa * assumedFieldArea;
    
    // Calculate feeding days (50 cows as default)
    const cowCount = 50;
    const kgPerCowPerDay = 8;
    const feedingDays = Math.floor(totalYield * 1000 / (cowCount * kgPerCowPerDay));
    
    return {
      yield: yieldPerHa.toFixed(1) + ' t/ha',
      totalYield: totalYield.toFixed(1) + ' tonnes',
      feedingDays: feedingDays + ' days',
      cowCount,
      fieldArea: assumedFieldArea + ' ha'
    };
  };
  
  const results = calculateResults();
  
  // Fixed data for YieldRangeVisualization - represents demo yield analysis
  const getYieldVisualizationData = () => {
    const currentData = {
      mean: 22.4,
      upperLimit: 29.1,
      lowerLimit: 15.7,
      bulbYield: 15.7,
      leafYield: 6.7
    };

    const additionalData = {
      mean: 23.5,
      upperLimit: 28.2,
      lowerLimit: 18.8,
      bulbYield: 16.5,
      leafYield: 6.7
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
                      ? (formData.sampleAreas.reduce((sum, area) => sum + Number(area.weight || 0), 0) / formData.sampleAreas.length).toFixed(1) 
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
        
        {/* Yield Range Visualization - placed below the yield and feed estimates */}
        <YieldRangeVisualization 
          currentData={currentData}
          additionalData={additionalData}
        />
        
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
