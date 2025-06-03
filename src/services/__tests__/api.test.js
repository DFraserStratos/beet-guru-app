import { authAPI, assessmentsAPI, reportsAPI } from '../api';

describe('authAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('login succeeds with correct credentials', async () => {
    const promise = authAPI.login('fred@beetguru.com', 'password123');
    jest.runAllTimers();
    const user = await promise;
    expect(user.email).toBe('fred@beetguru.com');
  });

  test('login fails with incorrect credentials', async () => {
    const promise = authAPI.login('wrong@email.com', 'wrongpass');
    jest.runAllTimers();
    await expect(promise).rejects.toThrow('Invalid credentials');
  });

  test('getUser returns Fred Forger', async () => {
    const promise = authAPI.getUser();
    jest.runAllTimers();
    const user = await promise;
    expect(user.name).toBe('Fred Forger');
    expect(user.email).toBe('fred@beetguru.com');
  });

  test('checkEmailExists returns true for Fred\'s email', async () => {
    const promise = authAPI.checkEmailExists('fred@beetguru.com');
    jest.runAllTimers();
    const result = await promise;
    expect(result.exists).toBe(true);
  });

  test('checkEmailExists returns false for unknown email', async () => {
    const promise = authAPI.checkEmailExists('unknown@example.com');
    jest.runAllTimers();
    const result = await promise;
    expect(result.exists).toBe(false);
  });
});

describe('assessmentsAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('getById returns assessment with names', async () => {
    const promise = assessmentsAPI.getById('1');
    jest.runAllTimers();
    const assessment = await promise;
    expect(assessment).toMatchObject({
      id: '1',
      location: 'North Paddock',
      cropType: 'Fodder Beet',
    });
  });
});

describe('reportsAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('generate determines season from assessment date', async () => {
    const promise = reportsAPI.generate('1');
    jest.runAllTimers();
    const report = await promise;
    expect(report.season).toBe('2024/2025');
  });
});
