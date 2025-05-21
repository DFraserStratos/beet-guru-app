import React, { useEffect, useState } from 'react';
import { ArrowLeft, Share } from 'lucide-react';
import { useApi } from '../../hooks';
import enhancedApi from '../../services/enhancedApi';
import { FormButton } from '../ui/form';
import ReportMetadata from './ReportMetadata';
import ReportSummary from './ReportSummary';
import CropInfo from './CropInfo';
import FieldMeasurements from './FieldMeasurements';
import ResultsSection from './ResultsSection';
import RecommendationsSection from './RecommendationsSection';
import NotesSection from './NotesSection';

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
          onClick={handleShareReport}
        >
          Share Report
        </FormButton>
      </div>

      {/* Single Report Document Card */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <ReportMetadata data={assessmentData} formatDate={formatDate} />

        <ReportSummary data={assessmentData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <CropInfo data={assessmentData} formatDate={formatDate} />
          <FieldMeasurements data={assessmentData} />
        </div>

        <ResultsSection data={assessmentData} />

        <RecommendationsSection recommendations={assessmentData.recommendations} />
        <NotesSection data={assessmentData} formatDate={formatDate} />
      </div>
    </div>
  );
};

export default ReportViewerScreen;
