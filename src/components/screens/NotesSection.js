/**
 * Notes section for report viewer
 */
const NotesSection = ({ data, formatDate }) => (
  <div className="p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Notes</h2>
    <p className="text-gray-600">
      This assessment was conducted on {formatDate(data.date)}. Results are based on field measurements
      and represent an estimate of crop yield and feeding capacity. Actual yields may vary based on growing conditions,
      harvesting method, and animal consumption patterns.
    </p>
  </div>
);

export default NotesSection;
