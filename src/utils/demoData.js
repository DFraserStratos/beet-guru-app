export const demoPersonas = [
  { name: 'John Doe', email: 'john.doe@example.com', userType: 'farmer' },
  { name: 'Maria Garcia', email: 'maria.garcia@example.com', userType: 'retailer' },
  { name: 'Ahmed Khan', email: 'ahmed.khan@example.com', userType: 'farmer' },
  { name: 'Chen Wei', email: 'chen.wei@example.com', userType: 'farmer' },
  { name: 'Emily Davis', email: 'emily.davis@example.com', userType: 'retailer' },
  { name: 'Priya Patel', email: 'priya.patel@example.com', userType: 'farmer' },
  { name: 'Hiro Tanaka', email: 'hiro.tanaka@example.com', userType: 'retailer' },
  { name: 'Sara Johansson', email: 'sara.johansson@example.com', userType: 'farmer' },
  { name: 'Kwame Nkrumah', email: 'kwame.nkrumah@example.com', userType: 'farmer' },
  { name: 'Ana Silva', email: 'ana.silva@example.com', userType: 'retailer' },
  { name: "Liam O'Connor", email: 'liam.oconnor@example.com', userType: 'farmer' },
  { name: 'Sofia Rossi', email: 'sofia.rossi@example.com', userType: 'retailer' }
];

export const getRandomDemoPersona = () => {
  const index = Math.floor(Math.random() * demoPersonas.length);
  return demoPersonas[index];
};

export const getDemoCredentials = (persona) => ({
  email: persona.email,
  password: 'password',
  rememberMe: false
});

export const getDemoEmail = (persona) => ({
  email: persona.email
});

export const getDemoRegistrationData = (persona) => ({
  name: persona.name,
  email: persona.email,
  password: 'password',
  confirmPassword: 'password',
  userType: persona.userType,
  subscribeToNews: true,
  agreeToTerms: true
});
