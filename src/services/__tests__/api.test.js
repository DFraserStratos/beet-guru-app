import { authAPI, assessmentsAPI, reportsAPI } from '../api';

describe('authAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('login succeeds with correct credentials', async () => {
    const promise = authAPI.login('john.doe@example.com', 'password');
    jest.runAllTimers();
    const user = await promise;
    expect(user).toMatchObject({ id: '1', email: 'john.doe@example.com' });
  });

  test('login fails with wrong password', async () => {
    const promise = authAPI.login('john.doe@example.com', 'wrong');
    jest.runAllTimers();
    await expect(promise).rejects.toThrow('Invalid credentials');
  });

  test('magic link login is single use', async () => {
    const result = await authAPI.generateMagicLink('john.doe@example.com');
    jest.runAllTimers();
    const token = new URL(result.magicLink).searchParams.get('token');

    const first = authAPI.loginWithMagicLink(token);
    jest.runAllTimers();
    const user = await first;
    expect(user.email).toBe('john.doe@example.com');

    const second = authAPI.loginWithMagicLink(token);
    jest.runAllTimers();
    await expect(second).rejects.toThrow('Invalid or expired token');
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
