export const demoPersonas = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Maria Hernandez', email: 'maria.hernandez@example.com' },
  { name: 'Priya Singh', email: 'priya.singh@example.com' },
  { name: 'Wei Zhang', email: 'wei.zhang@example.com' },
  { name: 'Aroha Patel', email: 'aroha.patel@example.com' },
  { name: 'Ibrahim Khan', email: 'ibrahim.khan@example.com' },
  { name: 'Lucia Rossi', email: 'lucia.rossi@example.com' },
  { name: 'Omar Farouk', email: 'omar.farouk@example.com' },
  { name: 'Sarah O\'Neill', email: 'sarah.oneill@example.com' },
  { name: 'Miguel Santos', email: 'miguel.santos@example.com' },
  { name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com' },
  { name: 'David Kim', email: 'david.kim@example.com' }
];

export const getRandomDemoPersona = () =>
  demoPersonas[Math.floor(Math.random() * demoPersonas.length)];

export const getDemoCredentials = (persona = getRandomDemoPersona()) => ({
  email: persona.email,
  password: 'password',
  rememberMe: false,
  name: persona.name
});

export const getDemoEmail = (persona = getRandomDemoPersona()) => ({
  email: persona.email,
  name: persona.name
});

export const getDemoRegistrationData = (
  prefillEmail = '',
  persona = getRandomDemoPersona()
) => ({
  name: persona.name,
  email: prefillEmail || persona.email,
  password: 'password',
  confirmPassword: 'password',
  userType: 'farmer',
  subscribeToNews: true,
  agreeToTerms: true
});
