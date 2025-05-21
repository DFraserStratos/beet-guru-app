export const getDemoCredentials = () => ({
  email: 'john.doe@example.com',
  password: 'password',
  rememberMe: false
});

export const getDemoEmail = () => ({
  email: 'john.doe@example.com'
});

export const getDemoRegistrationData = (prefillEmail = '') => ({
  name: 'Donald',
  email: prefillEmail || 'donald@stp.co.nz',
  password: 'password',
  confirmPassword: 'password',
  userType: 'farmer',
  subscribeToNews: true,
  agreeToTerms: true
});
