/**
 * Field measurements section
 */
const FieldMeasurements = ({ data }) => (
  <div className="p-6 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Field Measurements</h2>
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Row Spacing</h3>
        <p className="text-gray-800">{data.rowSpacing} m</p>
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
        <p className="text-gray-800">{data.dryMatter}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Samples Taken</h3>
        <p className="text-gray-800">1</p>
      </div>
    </div>
  </div>
);

export default FieldMeasurements;
