import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Share, 
  Calendar, 
  MapPin, 
  Sprout, 
  FileText, 
  Calendar as CalendarIcon,
  Check,
  Droplets
} from 'lucide-react';
import { useApi } from '../../hooks';
import api from '../../services/api';
import { FormButton } from '../ui/form';

/**
 * Detailed report viewer component that displays a single report
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReportViewerScreen = ({ 
  reportId, 
  onBack, 
  isMobile = false 
}) => {
  const [assessmentData, setAssessmentData] = useState(null);
  
  // Use API hooks to fetch report and assessment data
  const { 
    data: report, 
    loading: loadingReport, 
    error: reportError, 
    execute: fetchReport 
  } = useApi(api.reports.getById);
  
  const { 
    data: assessment, 
    loading: loadingAssessment, 
    error: assessmentError, 
    execute: fetchAssessment 
  } = useApi(api.assessments.getById);

  // Fetch report data on component mount
  useEffect(() => {
    if (reportId) {
      fetchReport(reportId);
    }
  }, [reportId, fetchReport]);

  // Fetch associated assessment data when report is loaded
  useEffect(() => {
    if (report?.assessmentId) {
      fetchAssessment(report.assessmentId);
    }
  }, [report, fetchAssessment]);

  // Combine data for the view
  useEffect(() => {
    if (report && assessment) {
      setAssessmentData({
        ...assessment,
        reportTitle: report.title,
        reportType: report.type,
        reportCreated: report.created,
        reportStatus: report.status,
        reportCultivar: report.cultivar,
        reportSeason: report.season
      });
    }
  }, [report, assessment]);

  // Handle the share report action
  const handleShareReport = () => {
    alert('Share functionality would send this report via email');
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-NZ', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  // Loading state
  if (loadingReport || loadingAssessment) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500">Loading report...</p>
      </div>
    );
  }

  // Error state
  if (reportError || assessmentError) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-red-500">Error loading report: {reportError?.message || assessmentError?.message}</p>
        <button 
          className="mt-4 text-blue-600 hover:text-blue-800" 
          onClick={onBack}
        >
          Back to Reports
        </button>
      </div>
    );
  }

  // If no data yet
  if (!assessmentData) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500">Report not found</p>
        <button 
          className="mt-4 text-blue-600 hover:text-blue-800" 
          onClick={onBack}
        >
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-800" 
          onClick={onBack}
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Reports</span>
        </button>
        <FormButton
          variant="outline"
          icon={<Share size={16} />}
          onClick={handleShareReport}
        >
          Share Report
        </FormButton>
      </div>

      {/* Report Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {assessmentData.reportTitle}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2 text-green-600" />
            <span>{formatDate(assessmentData.reportCreated)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-green-600" />
            <span>{assessmentData.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Sprout size={18} className="mr-2 text-green-600" />
            <span>{assessmentData.reportCultivar}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <CalendarIcon size={18} className="mr-2 text-green-600" />
            <span>{assessmentData.reportSeason}</span>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Executive Summary</h2>
        <p className="text-gray-600">
          This report provides a comprehensive analysis of the {assessmentData.reportCultivar} fodder beet crop 
          at {assessmentData.location}. The assessment was conducted on {formatDate(assessmentData.date)} 
          and shows an estimated yield of {assessmentData.estimatedYield} with a total production of {assessmentData.totalYield} 
          for the field. The crop has a dry matter content of {assessmentData.dryMatter} and is suitable for 
          feeding {assessmentData.stockCount} animals for approximately {assessmentData.feedingCapacity}.
        </p>
      </div>

      {/* Two-column layout for crop and field info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crop Information */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Crop Type</h3>
              <p className="text-gray-800">{assessmentData.cropType}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cultivar</h3>
              <p className="text-gray-800">{assessmentData.reportCultivar}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Planting Date</h3>
              <p className="text-gray-800">{formatDate(assessmentData.date)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Water Type</h3>
              <div className="flex items-center">
                <Droplets size={16} className="mr-1 text-blue-500" />
                <span className="capitalize">{assessmentData.waterType}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Growing Season</h3>
              <p className="text-gray-800">{assessmentData.reportSeason}</p>
            </div>
          </div>
        </div>

        {/* Field Measurements */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Field Measurements</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="text-gray-800">{assessmentData.location}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Row Spacing</h3>
              <p className="text-gray-800">{assessmentData.rowSpacing} m</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dry Matter Content</h3>
              <p className="text-gray-800">{assessmentData.dryMatter}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Sample Date</h3>
              <p className="text-gray-800">{formatDate(assessmentData.date)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Assessment Method</h3>
              <p className="text-gray-800">Multiple sample quadrat method</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section - Cards for Yield and Feeding */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Yield Estimate Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Yield Estimate</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {assessmentData.estimatedYield}
            </div>
            <p className="text-gray-600 mb-4">
              Total field yield estimated at {assessmentData.totalYield}
            </p>
            <div className="text-sm text-gray-500">
              Based on field measurements and calculated dry matter content
            </div>
          </div>
          
          {/* Feeding Capacity Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Feeding Capacity</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {assessmentData.feedingCapacity}
            </div>
            <p className="text-gray-600 mb-4">
              For {assessmentData.stockCount} animals at standard consumption rate
            </p>
            <div className="text-sm text-gray-500">
              Assumes 10kg dry matter per animal per day
            </div>
          </div>
        </div>
        
        {/* Yield Visualization */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Yield Breakdown</h3>
          
          <div className="flex justify-center">
            <div className="h-64 w-full max-w-lg flex items-center justify-center bg-gray-100 rounded p-4">
              <div className="flex space-x-12 items-end h-full w-full max-w-md">
                <div className="flex flex-col items-center">
                  <div className="bg-green-200 w-20 rounded-t" style={{ height: '30%' }}></div>
                  <p className="mt-2 text-sm font-medium">Leaf</p>
                  <p className="text-xs text-gray-500">6.7 t/ha</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 w-20 rounded-t" style={{ height: '70%' }}></div>
                  <p className="mt-2 text-sm font-medium">Bulb</p>
                  <p className="text-xs text-gray-500">15.7 t/ha</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-700 w-20 rounded-t" style={{ height: '100%' }}></div>
                  <p className="mt-2 text-sm font-medium">Total</p>
                  <p className="text-xs text-gray-500">22.4 t/ha</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
        
        <ul className="space-y-2 text-gray-600 list-disc list-inside">
          <li>Begin transitioning animals to fodder beet gradually over a 10-14 day period</li>
          <li>Use electric fencing to implement strip grazing for optimal utilization</li>
          <li>Provide fiber supplementation (hay or straw) during the transition period</li>
          <li>Monitor animal health closely, especially during the first 3 weeks</li>
          <li>Consider mineral supplementation to balance the low phosphorus and sodium content of fodder beet</li>
          <li>Schedule a follow-up assessment in 4-6 weeks to monitor crop development</li>
        </ul>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notes</h2>
        
        <p className="text-gray-600">
          This assessment was conducted using industry standard methods and calculations. The {assessmentData.reportCultivar} cultivar 
          is performing well in the current conditions. The crop shows good uniformity across the field with minimal signs of disease 
          or pest damage. Weather conditions have been favorable with adequate rainfall/irrigation, which has supported optimal growth. 
          The estimated dry matter percentage is within the expected range for this cultivar and growth stage.
        </p>
      </div>
    </div>
  );
};

export default ReportViewerScreen;