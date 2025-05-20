import enhancedApi from '../enhancedApi';

describe('enhancedApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('reports.getById returns detailed report info', async () => {
    const promise = enhancedApi.reports.getById('1');
    jest.runAllTimers();
    const report = await promise;
    expect(report.detailed).toBe(true);
    expect(report).toHaveProperty('executive_summary');
    expect(report).toHaveProperty('recommendations');
  });

  test('assessments.getById includes yield breakdown', async () => {
    const promise = enhancedApi.assessments.getById('1');
    jest.runAllTimers();
    const assessment = await promise;
    expect(assessment.detailed).toBe(true);
    expect(assessment.yieldBreakdown).toEqual({
      leafYield: '6.7 t/ha',
      bulbYield: '15.7 t/ha',
      totalYield: '22.4 t/ha'
    });
  });
});
