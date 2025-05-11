import { useState, useEffect } from 'react';
import { ChevronDown, PlusCircle, BarChart3 } from 'lucide-react';

const NewAssessmentScreen = ({ isMobile = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cultivarExpanded, setCultivarExpanded] = useState(!isMobile); // Default to expanded on desktop
  const [selectedCultivar, setSelectedCultivar] = useState('');
  
  // Update expansion state when device type changes
  useEffect(() => {
    setCultivarExpanded(!isMobile);
  }, [isMobile]);
  
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const toggleCultivarInfo = () => {
    setCultivarExpanded(!cultivarExpanded);
  };
  
  // Log for debugging
  useEffect(() => {
    console.log('isMobile:', isMobile);
    console.log('cultivarExpanded:', cultivarExpanded);
  }, [isMobile, cultivarExpanded]);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === currentStep 
                    ? 'bg-green-600 text-white' 
                    : step < currentStep 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              <div className="text-sm mt-2 font-medium text-gray-600">
                {step === 1 && 'Crop Details'}
                {step === 2 && 'Field Setup'}
                {step === 3 && 'Measurements'}
                {step === 4 && 'Review'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-0.5 ${
                  step <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`}
                style={{ width: step === 4 ? '0%' : '33.3%' }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Crop Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                      <option value="">Select a Location</option>
                      <option value="north">North Field</option>
                      <option value="west">West Paddock</option>
                      <option value="east">East Field</option>
                      <option value="south">South Block</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <button className="mt-1 text-sm text-green-600 hover:text-green-800">+ Add New Location</button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grower</label>
                  <div className="relative">
                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                      <option value="">Select a Grower</option>
                      <option value="self">Self</option>
                      <option value="contractor">Contractor A</option>
                      <option value="other">Other Grower</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <button className="mt-1 text-sm text-green-600 hover:text-green-800">+ Add New Grower</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                  <div className="relative">
                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                      <option value="">Select Crop Type</option>
                      <option value="fodder">Fodder Beet</option>
                      <option value="sugar">Sugar Beet</option>
                      <option value="mangels">Mangels</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cultivar</label>
                    {isMobile && (
                      <button 
                        onClick={toggleCultivarInfo} 
                        className="text-xs text-green-600 hover:text-green-800 mb-1"
                      >
                        {cultivarExpanded ? 'Hide Details' : 'Show Details'}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <select 
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                      value={selectedCultivar}
                      onChange={(e) => setSelectedCultivar(e.target.value)}
                    >
                      <option value="">Select Cultivar</option>
                      <option value="brigadier">Brigadier</option>
                      <option value="feldherr">Feldherr</option>
                      <option value="kyros">Kyros</option>
                      <option value="blizzard">Blizzard</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <button className="mt-1 text-sm text-green-600 hover:text-green-800">+ Add New Cultivar</button>
                </div>
              </div>
              
              {/* Cultivar Information Section - Expanded by default on desktop */}
              {cultivarExpanded && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-100 mt-2">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Cultivar Information</h3>
                  
                  {selectedCultivar ? (
                    <div className="space-y-3">
                      {selectedCultivar === 'brigadier' && (
                        <>
                          <p className="text-sm text-green-700">
                            <strong>Brigadier</strong> - A high-yielding yellow-fleshed fodder beet variety with medium dry matter content (15-17%).
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                            <div>
                              <span className="font-medium">Yield Potential:</span> 18-24 t DM/ha
                            </div>
                            <div>
                              <span className="font-medium">Growth Habit:</span> 35% bulb above ground
                            </div>
                            <div>
                              <span className="font-medium">Best For:</span> Grazing in situ
                            </div>
                            <div>
                              <span className="font-medium">Days to Maturity:</span> 180-200 days
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedCultivar === 'feldherr' && (
                        <>
                          <p className="text-sm text-green-700">
                            <strong>Feldherr</strong> - A high dry matter content variety (19-21%) with exceptional storage properties.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                            <div>
                              <span className="font-medium">Yield Potential:</span> 16-20 t DM/ha
                            </div>
                            <div>
                              <span className="font-medium">Growth Habit:</span> 15% bulb above ground
                            </div>
                            <div>
                              <span className="font-medium">Best For:</span> Lifting and storage
                            </div>
                            <div>
                              <span className="font-medium">Days to Maturity:</span> 190-210 days
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedCultivar === 'kyros' && (
                        <>
                          <p className="text-sm text-green-700">
                            <strong>Kyros</strong> - A versatile medium dry matter cultivar (17-19%) suitable for both grazing and lifting.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                            <div>
                              <span className="font-medium">Yield Potential:</span> 17-22 t DM/ha
                            </div>
                            <div>
                              <span className="font-medium">Growth Habit:</span> 25% bulb above ground
                            </div>
                            <div>
                              <span className="font-medium">Best For:</span> Versatile use
                            </div>
                            <div>
                              <span className="font-medium">Days to Maturity:</span> 185-205 days
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedCultivar === 'blizzard' && (
                        <>
                          <p className="text-sm text-green-700">
                            <strong>Blizzard</strong> - A white-fleshed variety with low dry matter content (13-15%) ideal for transitioning stock.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                            <div>
                              <span className="font-medium">Yield Potential:</span> 15-19 t DM/ha
                            </div>
                            <div>
                              <span className="font-medium">Growth Habit:</span> 45% bulb above ground
                            </div>
                            <div>
                              <span className="font-medium">Best For:</span> Transitioning stock
                            </div>
                            <div>
                              <span className="font-medium">Days to Maturity:</span> 170-190 days
                            </div>
                          </div>
                        </>
                      )}
                      
                      {!['brigadier', 'feldherr', 'kyros', 'blizzard'].includes(selectedCultivar) && (
                        <p className="text-sm text-green-700">
                          Select a cultivar to view detailed information.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-green-700">
                      Select a cultivar to view detailed information about its characteristics, yield potential, and best uses.
                    </p>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                  <input
                    type="date"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                    defaultValue="2024-10-20"
                  />
                  <p className="mt-1 text-xs text-gray-500">Default: October 20 of previous year</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Type</label>
                  <div className="relative">
                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                      <option value="irrigated">Irrigated</option>
                      <option value="dryland">Dryland</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Growing Cost ($/ha)</label>
                <input
                  type="number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                  placeholder="Enter cost per hectare"
                  defaultValue="2500"
                />
                <p className="mt-1 text-xs text-gray-500">This covers ALL costs associated with growing</p>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={nextStep}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Field Setup</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Please enter accurate row spacing and default dry matter percentage for best results.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dry Matter Percentage (%)</label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                    defaultValue="14"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <p className="mt-1 text-xs text-gray-500">Default value - will be updated with measurements</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Row Spacing (m)</label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                    defaultValue="0.5"
                    step="0.01"
                    min="0.1"
                  />
                  <p className="mt-1 text-xs text-gray-500">Distance between rows</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Row Count</label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                    defaultValue="0"
                    min="0"
                  />
                  <p className="mt-1 text-xs text-gray-500">Number of rows carved into the ground</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Area (ha)</label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                    placeholder="Enter field area"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button 
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={nextStep}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Field Measurements</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Take at least 3 representative samples from different areas of your field for accurate results.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-medium">Sample Measurements</h3>
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                    <PlusCircle size={16} className="mr-1" />
                    Add Area
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="space-y-6">
                    {[1, 2, 3].map((area) => (
                      <div key={area} className="rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                          <h4 className="font-medium">Area {area}</h4>
                          {area > 1 && (
                            <button className="text-sm text-red-600 hover:text-red-800">
                              Remove
                            </button>
                          )}
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Length (m)</label>
                              <input
                                type="number"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                                defaultValue={area === 1 ? "2" : ""}
                                step="0.01"
                                min="0"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                              <input
                                type="number"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                                defaultValue={area === 1 ? "25.4" : ""}
                                step="0.1"
                                min="0"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Dry Matter (%)</label>
                              <input
                                type="number"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                                defaultValue={area === 1 ? "14.2" : ""}
                                step="0.1"
                                min="0"
                                max="100"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 border"
                              rows="2"
                              placeholder="Optional notes about this sample"
                              defaultValue={area === 1 ? "Northern edge of field, good plant density" : ""}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Preview Graph */}
              <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium">Yield Preview</h3>
                </div>
                
                <div className="p-4 flex justify-center">
                  <div className="h-64 w-full max-w-lg flex items-center justify-center bg-gray-100 rounded">
                    <div className="text-center text-gray-500">
                      <BarChart3 size={40} className="mx-auto mb-2 text-gray-400" />
                      <p>Preview graph will appear here after measurements are calculated</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button 
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={nextStep}
                >
                  Review Assessment
                </button>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
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
                        
                        <div className="text-gray-500">Crop Type:</div>
                        <div className="text-gray-900">Fodder Beet</div>
                        
                        <div className="text-gray-500">Cultivar:</div>
                        <div className="text-gray-900">Brigadier</div>
                        
                        <div className="text-gray-500">Planting Date:</div>
                        <div className="text-gray-900">Oct 20, 2024</div>
                        
                        <div className="text-gray-500">Water Type:</div>
                        <div className="text-gray-900">Irrigated</div>
                        
                        <div className="text-gray-500">Est. Growing Cost:</div>
                        <div className="text-gray-900">$2,500/ha</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Field Setup & Measurements</h4>
                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div className="text-gray-500">Dry Matter %:</div>
                        <div className="text-gray-900">14.2%</div>
                        
                        <div className="text-gray-500">Row Spacing:</div>
                        <div className="text-gray-900">0.5 m</div>
                        
                        <div className="text-gray-500">Row Count:</div>
                        <div className="text-gray-900">0</div>
                        
                        <div className="text-gray-500">Field Area:</div>
                        <div className="text-gray-900">3.5 ha</div>
                        
                        <div className="text-gray-500">Samples:</div>
                        <div className="text-gray-900">3 areas</div>
                        
                        <div className="text-gray-500">Average Weight:</div>
                        <div className="text-gray-900">25.4 kg</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50">
                    <h4 className="font-medium text-gray-900 mb-3">Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-green-100">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Estimated Yield</div>
                          <div className="text-3xl font-bold text-green-600">22.4 t/ha</div>
                          <div className="text-sm text-gray-500 mt-1">Total: 78.4 tonnes</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-green-100">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Feeding Capacity</div>
                          <div className="text-3xl font-bold text-green-600">186 days</div>
                          <div className="text-sm text-gray-500 mt-1">For 50 cows</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center text-sm">
                      <p className="text-gray-500">These results are based on your measurements and can be refined with additional samples.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button 
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={prevStep}
                >
                  Back
                </button>
                <div className="flex gap-3">
                  <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
                    Save as Draft
                  </button>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAssessmentScreen;