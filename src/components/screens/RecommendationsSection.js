import { Check } from 'lucide-react';

/**
 * Recommendations list section
 */
const RecommendationsSection = ({ recommendations }) => (
  <div className="p-6 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
    <ul className="space-y-2 text-gray-600">
      {recommendations ? (
        recommendations.map((recommendation, index) => (
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
);

export default RecommendationsSection;
