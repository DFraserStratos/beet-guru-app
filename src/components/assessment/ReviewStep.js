import React, { useState } from 'react';
import { FormButton } from '../ui/form';
import api from '../../services/api';
import { useApi } from '../../hooks';
import { X } from 'lucide-react';

/**
 * Fourth and final step of assessment creation - review and submit
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReviewStep = ({ formData, onBack, onComplete, onCancel }) => {
  const [reportType, setReportType] = useState('basic');
  
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
    
    // Total yield based on field area
    const fieldArea = Number(formData.fieldArea) || 0;
    const totalYield = yieldPerHa * fieldArea;
    
    // Calculate feeding days (50 cows as default)
    const cowCount = 50;
    const kgPerCowPerDay = 8;
    const feedingDays = Math.floor(totalYield * 1000 / (cowCount * kgPerCowPerDay));
    
    return {
      yield: yieldPerHa.toFixed(1) + ' t/ha',
      totalYield: totalYield.toFixed(1) + ' tonnes',
      feedingDays: feedingDays + ' days',
      cowCount
    };
  };
  
  const results = calculateResults();
  
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
        dryMatter: formData.sampleAreas?.[0]?.dryMatter || formData.dryMatterPercentage,
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
                  
                  <div className="text-gray-500">Cultivar:</div>
                  <div className="text-gray-900">Brigadier</div>
                  
                  <div className="text-gray-500">Planting Date:</div>
                  <div className="text-gray-900">{formatDate(formData.plantingDate)}</div>
                  
                  <div className="text-gray-500">Water Type:</div>
                  <div className="text-gray-900">{formData.waterType === 'irrigated' ? 'Irrigated' : 'Dryland'}</div>
                  
                  <div className="text-gray-500">Est. Growing Cost:</div>
                  <div className="text-gray-900">${formData.estimatedGrowingCost || '0'}/ha</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Field Setup & Measurements</h4>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-500">Dry Matter %:</div>
                  <div className="text-gray-900">{formData.sampleAreas?.[0]?.dryMatter || formData.dryMatterPercentage || '0'}%</div>
                  
                  <div className="text-gray-500">Row Spacing:</div>
                  <div className="text-gray-900">{formData.rowSpacing || '0.5'} m</div>
                  
                  <div className="text-gray-500">Row Count:</div>
                  <div className="text-gray-900">{formData.rowCount || '0'}</div>
                  
                  <div className="text-gray-500">Field Area:</div>
                  <div className="text-gray-900">{formData.fieldArea || '0'} ha</div>
                  
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
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Feeding Capacity</div>
                    <div className="text-3xl font-bold text-green-600">{results.feedingDays}</div>
                    <div className="text-sm text-gray-500 mt-1">For {results.cowCount} cows</div>
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
        
        <div className="pt-4 flex justify-between">
          <div className="flex space-x-4">
            <FormButton 
              onClick={onCancel}
              variant="outline"
              icon={<X size={16} />}
            >
              Cancel
            </FormButton>
            <FormButton 
              onClick={onBack}
              variant="secondary"
            >
              Back
            </FormButton>
          </div>
          <div className="flex gap-3">
            <FormButton
              onClick={handleSaveAsDraft}
              variant="outline"
              isLoading={saveAssessmentApi.loading}
            >
              Save as Draft
            </FormButton>
            <FormButton
              onClick={handleSaveAndGenerateReport}
              variant="primary"
              isLoading={saveAssessmentApi.loading || generateReportApi.loading}
            >
              Generate Report
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;