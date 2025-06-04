import api from '../api';

describe('customersAPI', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('getByRetailerId returns customers with paddock info', async () => {
    const promise = api.customers.getByRetailerId('2');
    jest.runAllTimers();
    const customers = await promise;
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('paddockCount');
  });

  test('getById returns customer details', async () => {
    const promise = api.customers.getById('1');
    jest.runAllTimers();
    const customer = await promise;
    expect(customer).toMatchObject({ id: '1', name: expect.any(String) });
    expect(customer).toHaveProperty('relationshipStart');
  });

  test('createRelationship adds a new customer', async () => {
    const promise = api.customers.createRelationship('2', {
      name: 'New Farmer',
      email: 'new@farm.com'
    });
    jest.runAllTimers();
    const result = await promise;
    expect(result.name).toBe('New Farmer');
    expect(result.status).toBe('active');
  });
});
