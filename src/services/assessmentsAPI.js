import { mockData, delay } from './apiUtils';

export const assessmentsAPI = {
  getAll: async () => {
    await delay();
    return mockData.assessments.map(assessment => {
      const location = mockData.locations.find(l => l.id === assessment.locationId);
      const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
      return {
        ...assessment,
        location: location?.name,
        cropType: cropType?.name
      };
    });
  },

  getCompletedAssessments: async () => {
    await delay();
    return mockData.assessments
      .filter(a => a.status === 'completed')
      .map(assessment => {
        const location = mockData.locations.find(l => l.id === assessment.locationId);
        const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
        return {
          ...assessment,
          location: location?.name,
          cropType: cropType?.name
        };
      });
  },

  getDraftAssessments: async () => {
    await delay();
    return mockData.assessments
      .filter(a => a.status === 'draft')
      .map(assessment => {
        const location = mockData.locations.find(l => l.id === assessment.locationId);
        const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
        return {
          ...assessment,
          location: location?.name,
          cropType: cropType?.name
        };
      });
  },

  getById: async (id) => {
    await delay();
    const assessment = mockData.assessments.find(a => a.id === id);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    const location = mockData.locations.find(l => l.id === assessment.locationId);
    const cropType = mockData.cropTypes.find(c => c.id === assessment.cropTypeId);
    const cultivar = mockData.cultivars.find(c => c.id === assessment.cultivarId);

    return {
      ...assessment,
      location: location?.name,
      cropType: cropType?.name,
      cultivar: cultivar?.name
    };
  },

  create: async (assessmentData) => {
    await delay();
    const newAssessment = {
      id: String(mockData.assessments.length + 1),
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      ...assessmentData
    };
    mockData.assessments.push(newAssessment);
    return newAssessment;
  },

  update: async (id, assessmentData) => {
    await delay();
    const index = mockData.assessments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Assessment not found');
    }

    const updatedAssessment = {
      ...mockData.assessments[index],
      ...assessmentData
    };

    mockData.assessments[index] = updatedAssessment;
    return updatedAssessment;
  },

  delete: async (id) => {
    await delay();
    const index = mockData.assessments.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error('Assessment not found');
    }

    mockData.assessments.splice(index, 1);
    return { success: true };
  }
};

export default assessmentsAPI;
