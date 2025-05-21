import { mockData, delay } from './apiUtils';

export const reportsAPI = {
  getAll: async () => {
    await delay();
    return mockData.reports.map(report => {
      const assessment = mockData.assessments.find(a => a.id === report.assessmentId);
      const location = assessment
        ? mockData.locations.find(l => l.id === assessment.locationId)
        : null;
      const cropType = assessment
        ? mockData.cropTypes.find(c => c.id === assessment.cropTypeId)
        : null;

      return {
        ...report,
        location: location?.name || ''
      };
    });
  },

  getById: async (id) => {
    await delay();
    const report = mockData.reports.find(r => r.id === id);
    if (!report) {
      throw new Error('Report not found');
    }
    return report;
  },

  generate: async (assessmentId, type = 'basic') => {
    await delay();
    const assessment = mockData.assessments.find(a => a.id === assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    const location = mockData.locations.find(l => l.id === assessment.locationId);
    const cultivar = mockData.cultivars.find(c => c.id === assessment.cultivarId);

    const assessmentDate = new Date(assessment.date);
    const year = assessmentDate.getFullYear();
    const month = assessmentDate.getMonth() + 1;

    const season = month > 6
      ? `${year}/${year + 1}`
      : `${year - 1}/${year}`;

    const newReport = {
      id: String(mockData.reports.length + 1),
      assessmentId,
      title: `${location.name} ${type === 'basic' ? 'Assessment' : 'Overview'}`,
      type,
      created: new Date().toISOString().split('T')[0],
      status: 'draft',
      pages: type === 'basic' ? 3 : 5,
      recipients: 0,
      cultivar: cultivar?.name || '',
      season
    };

    mockData.reports.push(newReport);
    return newReport;
  },

  send: async (id, recipients) => {
    await delay();
    const index = mockData.reports.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Report not found');
    }

    mockData.reports[index] = {
      ...mockData.reports[index],
      status: 'sent',
      recipients: recipients.length
    };

    return mockData.reports[index];
  }
};

export default reportsAPI;
