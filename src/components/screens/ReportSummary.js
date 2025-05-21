/**
 * Executive summary section for report viewer
 */
const ReportSummary = ({ data }) => (
  <div className="p-6 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Executive Summary</h2>
    <p className="text-gray-600">
      This assessment of {data.location} shows a crop yield estimate of {data.estimatedYield}.
      Based on current dry matter content of {data.dryMatter}, this crop can feed {data.stockCount} animals
      for approximately {data.feedingCapacity}.
    </p>
  </div>
);

export default ReportSummary;
