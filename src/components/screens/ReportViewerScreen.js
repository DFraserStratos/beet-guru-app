import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Droplets, Seedling, Scale, FileText, Share2 } from 'lucide-react';
import { FormButton } from '../ui/form';
import api from '../../services/api';
import { useApi } from '../../hooks';

/**
 * Screen for displaying detailed report information
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReportViewerScreen = ({ reportId, onBack, isMobile }) => {
  const { data: report, loading: reportLoading, error: reportError, execute: fetchReport } = useApi(api.reports.getById);
  const { data: assessment, loading: assessmentLoading, error: assessmentError, execute: fetchAssessment } = useApi(api.assessments.getById);
  const [location, setLocation] = useState(null);

  // Fetch report data
  useEffect(() => {
    if (reportId) {
      fetchReport(reportId);
    }
  }, [reportId, fetchReport]);

  // Fetch assessment data
  useEffect(() => {
    if (report?.assessmentId) {
      fetchAssessment(report.assessmentId);
    }
  }, [report, fetchAssessment]);

  // Fetch location data
  useEffect(() => {
    const getLocation = async () => {
      if (assessment?.locationId) {
        try {
          const locationData = await api.references.getLocationById(assessment.locationId);
          setLocation(locationData);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    };

    getLocation();
  }, [assessment]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (reportLoading || assessmentLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center mb-4">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={onBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Reports
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Loading report data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (reportError || assessmentError) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center mb-4">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={onBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Reports
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-500">Error loading report: {reportError?.message || assessmentError?.message}</p>
        </div>
      </div>
    );
  }

  // If report or assessment not found
  if (!report || !assessment) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center mb-4">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={onBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Reports
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Report not found</p>
        </div>
      </div>
    );
  }

  // Handle share report
  const handleShareReport = () => {
    alert('Share functionality would open an email form in a real application.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={onBack}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Reports
        </button>

        <FormButton
          variant="outline"
          size="sm"
          icon={<Share2 size={16} />}
          onClick={handleShareReport}
        >
          Share Report
        </FormButton>
      </div>

      {/* Report Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{report.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-1" />
              <span>Report Date: {formatDate(report.created)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>Location: {location?.name || assessment.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Seedling size={16} className="mr-1" />
              <span>Cultivar: {report.cultivar || assessment.cultivar}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-1" />
              <span>Season: {report.season}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Executive Summary</h2>
          <p className="text-gray-700">
            This assessment of {location?.name || assessment.location} shows a crop yield estimate of {assessment.estimatedYield}. 
            Based on current dry matter content of {assessment.dryMatter}, this crop can feed {assessment.stockCount} animals for approximately {assessment.feedingCapacity}.
          </p>
        </div>

        {/* Crop Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3 border-b pb-2">Crop Information</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-gray-600">Crop Type:</div>
              <div className="text-gray-900">{assessment.cropType}</div>
              
              <div className="text-gray-600">Cultivar:</div>
              <div className="text-gray-900">{assessment.cultivar}</div>
              
              <div className="text-gray-600">Sowing Date:</div>
              <div className="text-gray-900">{formatDate(assessment.sowingDate || assessment.date)}</div>
              
              <div className="text-gray-600">Assessment Date:</div>
              <div className="text-gray-900">{formatDate(assessment.assessmentDate || assessment.date)}</div>
              
              <div className="text-gray-600">Water Type:</div>
              <div className="text-gray-900 flex items-center">
                <Droplets size={14} className="mr-1 text-blue-500" />
                {assessment.waterType === 'irrigated' ? 'Irrigated' : 'Dryland'}
              </div>
              
              <div className="text-gray-600">Est. Growing Cost:</div>
              <div className="text-gray-900">${assessment.estimatedGrowingCost || '2500'}/ha</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3 border-b pb-2">Field Measurements</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-gray-600">Row Spacing:</div>
              <div className="text-gray-900">{assessment.rowSpacing} m</div>
              
              <div className="text-gray-600">Measurement Length:</div>
              <div className="text-gray-900">{assessment.measurementLength || '4'} m</div>
              
              <div className="text-gray-600">Field Area:</div>
              <div className="text-gray-900">{location?.area || '3.5'} ha</div>
              
              <div className="text-gray-600">Dry Matter %:</div>
              <div className="text-gray-900">{assessment.dryMatter}</div>

              <div className="text-gray-600">Samples Taken:</div>
              <div className="text-gray-900">{assessment.sampleAreas?.length || 1}</div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-green-50 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-gray-800 mb-4 border-b border-green-100 pb-2">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg border border-green-100 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <Scale size={18} className="mr-2 text-green-600" />
                Yield Estimate
              </h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">{assessment.estimatedYield}</div>
                <div className="text-gray-500">Total: {assessment.totalYield}</div>
                <div className="text-xs text-gray-400 mt-1">Based on {location?.area || '3.5'} ha field</div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-green-100 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                <Calendar size={18} className="mr-2 text-green-600" />
                Feeding Capacity
              </h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">{assessment.feedingCapacity}</div>
                <div className="text-gray-500">For {assessment.stockCount} animals</div>
                <div className="text-xs text-gray-400 mt-1">Based on 8kg DM/animal/day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Yield Visualization */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Yield Visualization</h3>
          <div className="bg-white border rounded-lg p-4 h-64 flex items-center justify-center">
            <div className="w-full h-full max-w-xl">
              <div className="flex space-x-8 items-end h-full w-full justify-center">
                <div className="flex flex-col items-center">
                  <div className="bg-green-200 w-20 rounded-t h-3/5"></div>
                  <p className="mt-2 text-sm font-medium">Leaf</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 w-20 rounded-t h-4/5"></div>
                  <p className="mt-2 text-sm font-medium">Bulb</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-700 w-20 rounded-t h-5/6"></div>
                  <p className="mt-2 text-sm font-medium">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Recommendations</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Consider strip grazing to maximize feed utilization efficiency.</li>
              <li>Introduce animals to this crop gradually over a 7-10 day period to avoid digestive issues.</li>
              <li>Supplement with fiber sources such as hay or straw (minimum 20% of diet).</li>
              <li>Monitor animal condition regularly while grazing this crop.</li>
              <li>Consider follow-up assessment in 4-6 weeks to monitor crop development.</li>
            </ul>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Notes</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">
              This assessment was conducted on {formatDate(assessment.date)}. Results are based on field measurements and represent
              an estimate of crop yield and feeding capacity. Actual yields may vary based on growing conditions, harvesting method,
              and animal consumption patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Report Footer */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-600">
          <FileText size={16} className="mr-1" />
          <span>Report #{report.id} • Generated {formatDate(report.created)}</span>
        </div>
        
        <FormButton
          variant="outline"
          size="sm"
          icon={<Share2 size={16} />}
          onClick={handleShareReport}
        >
          Share Report
        </FormButton>
      </div>
    </div>
  );
};

export default ReportViewerScreen;