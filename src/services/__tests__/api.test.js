import { authAPI, assessmentsAPI, reportsAPI } from '../api';

describe('authAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('login succeeds with correct credentials', async () => {
    const email = 'maria.rodriguez@example.com';
    const promise = authAPI.login(email, 'password');
    jest.runAllTimers();
    const user = await promise;
    expect(user).toMatchObject({ email });
  });

  test('login fails with wrong password', async () => {
    const promise = authAPI.login('maria.rodriguez@example.com', 'wrong');
    jest.runAllTimers();
    await expect(promise).rejects.toThrow('Invalid credentials');
  });

  test('magic link login is single use', async () => {
    // Use real timers for this async flow
    jest.useRealTimers();

    const result = await authAPI.generateMagicLink('maria.rodriguez@example.com');
    const token = new URL(result.magicLink).searchParams.get('token');

    const user = await authAPI.loginWithMagicLink(token);
    expect(user.email).toBe('maria.rodriguez@example.com');

    await expect(authAPI.loginWithMagicLink(token)).rejects.toThrow('Invalid or expired token');
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
