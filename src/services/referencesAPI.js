import { mockData, delay } from './apiUtils';
import { assessmentsAPI } from './assessmentsAPI';

export const referencesAPI = {
  getLocations: async (withStatus = false) => {
    await delay();

    if (withStatus) {
      return Promise.all(mockData.locations.map(async location => {
        if (location.status === 'draft' && location.assessmentId) {
          try {
            const assessment = await assessmentsAPI.getById(location.assessmentId);
            return {
              ...location,
              draftAssessment: assessment
            };
          } catch (error) {
            return location;
          }
        }
        return location;
      }));
    }

    return mockData.locations;
  },

  getLocationById: async (id) => {
    await delay();
    const location = mockData.locations.find(l => l.id === id);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  },

  createLocation: async (locationData) => {
    await delay(800);
    const newLocation = {
      id: String(mockData.locations.length + 1),
      status: 'not-started',
      ...locationData
    };
    mockData.locations.push(newLocation);
    return newLocation;
  },

  updateLocation: async (id, locationData) => {
    await delay(800);
    const index = mockData.locations.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('Location not found');
    }

    const updatedLocation = {
      ...mockData.locations[index],
      ...locationData
    };

    mockData.locations[index] = updatedLocation;
    return updatedLocation;
  },

  deleteLocation: async (id) => {
    await delay(800);
    const index = mockData.locations.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('Location not found');
    }

    const isUsed = mockData.assessments.some(a => a.locationId === id);
    if (isUsed) {
      throw new Error('Cannot delete location that is used in assessments');
    }

    mockData.locations.splice(index, 1);
    return { success: true };
  },

  getCropTypes: async () => {
    await delay();
    return mockData.cropTypes;
  },

  getCultivars: async (cropTypeId = null) => {
    await delay();
    if (cropTypeId) {
      return mockData.cultivars.filter(c => c.cropTypeId === cropTypeId);
    }
    return mockData.cultivars;
  },

  createCultivar: async (cultivarData) => {
    await delay();
    const newCultivar = {
      id: String(mockData.cultivars.length + 1),
      ...cultivarData
    };
    mockData.cultivars.push(newCultivar);
    return newCultivar;
  }
};

export default referencesAPI;
