import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Share, 
  Calendar, 
  MapPin,
  Sprout,
  Calendar as CalendarIcon,
  Check,
  Droplets
} from 'lucide-react';
import { useApi } from '../../hooks';
import enhancedApi from '../../services/enhancedApi';
import { FormButton } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import ReportViewerSkeleton from '../ui/ReportViewerSkeleton';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';

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
  
  // Use API hooks to fetch report and assessment data with the enhanced API
  const { 
    data: report, 
    loading: loadingReport, 
    error: reportError, 
    execute: fetchReport 
  } = useApi(enhancedApi.reports.getById);
  
  const { 
    data: assessment, 
    loading: loadingAssessment, 
    error: assessmentError, 
    execute: fetchAssessment 
  } = useApi(enhancedApi.assessments.getById);

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
        reportSeason: report.season,
        executiveSummary: report.executive_summary,
        recommendations: report.recommendations,
        notes: report.notes,
        yieldBreakdown: assessment.yieldBreakdown
      });
    }
  }, [report, assessment]);

  // Handle the send report action
  const handleSendReport = () => {
    alert('Send functionality would send this report via email');
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

  // Prepare data for YieldRangeVisualization - using the exact values from the screenshot
  const getYieldVisualizationData = () => {
    // Data from the screenshot
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

  // Loading state
  if (loadingReport || loadingAssessment) {
    return <ReportViewerSkeleton />;
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

  const { currentData, additionalData } = getYieldVisualizationData();

  return (
    <PageContainer>
      {/* Navigation Header - Standalone buttons, no card */}
      <div className="flex justify-between items-center">
        <FormButton
          variant="outline"
          icon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Back to Reports
        </FormButton>
        <FormButton
          variant="outline"
          icon={<Share size={16} />}
          onClick={handleSendReport}
        >
          Send Report
        </FormButton>
      </div>

      {/* Single Report Document Card */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Report Title and Metadata */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {assessmentData.reportTitle}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2 text-green-600" />
              <span>Report Date: {formatDate(assessmentData.reportCreated)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2 text-green-600" />
              <span>Location: {assessmentData.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Sprout size={18} className="mr-2 text-green-600" />
              <span>Cultivar: {assessmentData.reportCultivar}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <CalendarIcon size={18} className="mr-2 text-green-600" />
              <span>Season: {assessmentData.reportSeason}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Executive Summary</h2>
          <p className="text-gray-600">
            This assessment of {assessmentData.location} shows a crop yield estimate of {assessmentData.estimatedYield}. 
            Based on current dry matter content of {assessmentData.dryMatter}, this crop can feed {assessmentData.stockCount} animals 
            for approximately {assessmentData.feedingCapacity}.
          </p>
        </div>

        {/* Two-column layout for crop and field info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Crop Information */}
          <div className="p-6 border-b md:border-r border-gray-100">
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
                <h3 className="text-sm font-medium text-gray-500">Sowing Date</h3>
                <p className="text-gray-800">{formatDate(assessmentData.date)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assessment Date</h3>
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
                <h3 className="text-sm font-medium text-gray-500">Est. Growing Cost</h3>
                <p className="text-gray-800">$2500/ha</p>
              </div>
            </div>
          </div>

          {/* Field Measurements */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Field Measurements</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Row Spacing</h3>
                <p className="text-gray-800">{assessmentData.rowSpacing} m</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Measurement Length</h3>
                <p className="text-gray-800">4 m</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Field Area</h3>
                <p className="text-gray-800">3.5 ha</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dry Matter %</h3>
                <p className="text-gray-800">{assessmentData.dryMatter}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Samples Taken</h3>
                <p className="text-gray-800">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - With pale green background */}
        <div className="p-6 bg-green-50 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yield Estimate Box */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <Check size={14} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Yield Estimate</h3>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {assessmentData.estimatedYield}
              </div>
              <p className="text-gray-600 mb-1">
                Total: {assessmentData.totalYield}
              </p>
              <p className="text-xs text-gray-400">
                Based on 3.5 ha field
              </p>
            </div>
            
            {/* Feeding Capacity Box */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <Calendar size={14} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Feeding Capacity</h3>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {assessmentData.feedingCapacity}
              </div>
              <p className="text-gray-600 mb-1">
                For {assessmentData.stockCount} animals
              </p>
              <p className="text-xs text-gray-400">
                Based on 8kg DM/animal/day
              </p>
            </div>
          </div>
          
          {/* Yield Range Visualization */}
          <div className="mt-6">
            <YieldRangeVisualization 
              currentData={currentData}
              additionalData={additionalData}
              className="bg-transparent p-0"
            />
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
          
          <ul className="space-y-2 text-gray-600">
            {assessmentData.recommendations ? (
              assessmentData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span>Consider strip grazing to maximize feed utilization efficiency.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span>Introduce animals to this crop gradually over a 7-10 day period to avoid digestive issues.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span>Supplement with fiber sources such as hay or straw (minimum 20% of diet).</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span>Monitor animal condition regularly while grazing this crop.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span>Consider follow-up assessment in 4-6 weeks to monitor crop development.</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Notes Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notes</h2>
          
          <p className="text-gray-600">
            This assessment was conducted on {formatDate(assessmentData.date)}. Results are based on field measurements 
            and represent an estimate of crop yield and feeding capacity. Actual yields may vary based on growing conditions, 
            harvesting method, and animal consumption patterns.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default ReportViewerScreen;
