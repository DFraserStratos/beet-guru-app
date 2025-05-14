import React from 'react';
import { FormButtonNav } from '../ui/form';
import api from '../../services/api';
import { useApi } from '../../hooks';

/**
 * Fourth and final step of assessment creation - review and submit
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReviewStep = ({ formData, onBack, onComplete, onCancel, isMobile }) => {
  const [reportType, setReportType] = React.useState('basic');
  
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
    // Handle the new measurements format
    if (formData.measurements && formData.measurements.length > 0) {
      // Calculate average leaf and bulb weights from the new format
      const validMeasurements = formData.measurements.filter(
        m => parseFloat(m.leaf) > 0 || parseFloat(m.bulb) > 0
      );
      
      if (validMeasurements.length === 0) {
        return { 
          yield: 'N/A', 
          totalYield: 'N/A', 
          feedingDays: 'N/A' 
        };
      }
      
      // Calculate average weights
      const avgLeafWeight = validMeasurements.reduce(
        (sum, m) => sum + parseFloat(m.leaf || 0), 0
      ) / validMeasurements.length;
      
      const avgBulbWeight = validMeasurements.reduce(
        (sum, m) => sum + parseFloat(m.bulb || 0), 0
      ) / validMeasurements.length;
      
      // Calculate total weight and apply dry matter percentages
      const totalWeight = avgLeafWeight + avgBulbWeight;
      const leafDm = parseFloat(formData.leafEstimate || 3) / 100;
      const bulbDm = parseFloat(formData.bulbEstimate || 2) / 100;
      
      // Weighted DM calculation
      const weightedDm = (avgLeafWeight * leafDm + avgBulbWeight * bulbDm) / totalWeight;
      
      // Calculate yield based on row spacing and measurement length
      const rowSpacing = parseFloat(formData.rowSpacing) || 0.5;
      const measurementLength = parseFloat(formData.measurementLength) || 4;
      const areaPerSample = rowSpacing * measurementLength;
      
      // Calculate yield per hectare
      const totalDmWeight = totalWeight * weightedDm;
      const yieldPerHa = (totalDmWeight / areaPerSample) * 10000; // kg/ha
      const yieldTonnesPerHa = yieldPerHa / 1000; // tonnes/ha
      
      // Calculate total yield (assuming 3.5 ha as default)
      const assumedFieldArea = 3.5;
      const totalYield = yieldTonnesPerHa * assumedFieldArea;
      
      // Calculate feeding days (50 cows as default)
      const cowCount = 50;
      const kgPerCowPerDay = 8;
      const feedingDays = Math.floor(totalYield * 1000 / (cowCount * kgPerCowPerDay));
      
      return {
        yield: yieldTonnesPerHa.toFixed(1) + ' t/ha',
        totalYield: totalYield.toFixed(1) + ' tonnes',
        feedingDays: feedingDays + ' days',
        cowCount,
        fieldArea: assumedFieldArea + ' ha',
        avgLeafWeight: avgLeafWeight.toFixed(1) + ' kg',
        avgBulbWeight: avgBulbWeight.toFixed(1) + ' kg',
        totalSampleWeight: totalWeight.toFixed(1) + ' kg',
        dryMatterPercentage: (weightedDm * 100).toFixed(1) + '%'
      };
    }
    // Fallback to the old calculation method if new format isn't available
    else if (formData.sampleAreas && formData.sampleAreas.length > 0) {
      // Simplified calculation for demonstration
      const validSamples = formData.sampleAreas.filter(
        area => area.sampleLength && area.weight && area.dryMatter
      );
      
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
        fieldArea: assumedFieldArea + ' ha',
        dryMatterPercentage: avgDryMatter.toFixed(1) + '%'
      };
    }
    
    // Default empty results
    return { 
      yield: 'N/A', 
      totalYield: 'N/A', 
      feedingDays: 'N/A' 
    };
  };
  
  const results = calculateResults();
  
  // API hooks for saving assessment
  const saveAssessmentApi = useApi(api.assessments.create);
  const generateReportApi = useApi(api.reports.generate);
  
  // Handle save and generate report
  const handleSaveAndGenerateReport = async () => {
    try {
      // Calculate dry matter from either new or old format
      let dryMatter;
      if (formData.measurements && formData.measurements.length > 0) {
        // Use weighted average from the results
        dryMatter = results.dryMatterPercentage ? parseFloat(results.dryMatterPercentage) : null;
      } else {
        // Fall back to old format or estimates
        dryMatter = formData.sampleAreas?.[0]?.dryMatter || formData.bulbEstimate;
      }
      
      // Save assessment
      const assessment = await saveAssessmentApi.execute({
        ...formData,
        status: 'completed',
        dryMatter: dryMatter,
        estimatedYield: results.yield,
        totalYield: results.totalYield,
        feedingCapacity: results.feedingDays,
        stockCount: results.cowCount
      });
      
      // Generate report
      if (assessment) {
        await generateReportApi.execute(assessment.id, reportType);
      }
      
      // Complete the process
      onComplete(assessment);
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
                  <div className="text-gray-900">
                    {formData.measurements?.length || formData.sampleAreas?.length || '0'} samples
                  </div>
                  
                  {formData.measurements && (
                    <>
                      <div className="text-gray-500">Average Leaf Weight:</div>
                      <div className="text-gray-900">{results.avgLeafWeight || 'N/A'}</div>
                      
                      <div className="text-gray-500">Average Bulb Weight:</div>
                      <div className="text-gray-900">{results.avgBulbWeight || 'N/A'}</div>
                    </>
                  )}
                  
                  <div className="text-gray-500">Dry Matter:</div>
                  <div className="text-gray-900">{results.dryMatterPercentage || 'N/A'}</div>
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
        
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <h4 className="font-medium text-gray-900 mb-3">Report Options</h4>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="report-type"
                value="basic"
                checked={reportType === 'basic'}
                onChange={() => setReportType('basic')}
                className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700">Basic Report</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="report-type"
                value="advanced"
                checked={reportType === 'advanced'}
                onChange={() => setReportType('advanced')}
                className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700">Advanced Report</span>
            </label>
          </div>
        </div>
        
        {/* Button Navigation - Using the new FormButtonNav component */}
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