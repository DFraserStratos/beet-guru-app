export const demoPersonas = [
  { name: 'John Doe', email: 'john.doe@example.com', role: 'Farm Manager' },
  { name: 'Maria Gonzalez', email: 'maria.gonzalez@example.com', role: 'Agronomist' },
  { name: 'Chen Wei', email: 'chen.wei@example.com', role: 'Field Technician' },
  { name: 'Aroha Ngata', email: 'aroha.ngata@example.com', role: 'Farm Hand' },
  { name: "Liam O'Connor", email: 'liam.oconnor@example.com', role: 'Researcher' },
  { name: 'Amara Singh', email: 'amara.singh@example.com', role: 'Farm Analyst' },
  { name: 'Omar Farouk', email: 'omar.farouk@example.com', role: 'Farm Manager' },
  { name: 'Sofia Rossi', email: 'sofia.rossi@example.com', role: 'Operations Manager' },
  { name: 'Mateo Alvarez', email: 'mateo.alvarez@example.com', role: 'Agronomist' },
  { name: 'Keiko Tanaka', email: 'keiko.tanaka@example.com', role: 'Consultant' },
  { name: 'Hana Ali', email: 'hana.ali@example.com', role: 'Field Specialist' },
  { name: 'Lucas Martins', email: 'lucas.martins@example.com', role: 'Field Technician' }
];

export const getRandomDemoPersona = () =>
  demoPersonas[Math.floor(Math.random() * demoPersonas.length)];

export const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export const getDemoEmail = (persona) => ({
  email: persona.email
});

export const getDemoCredentials = (persona) => ({
  email: persona.email,
  password: 'password',
  rememberMe: false
});

export const getDemoRegistrationData = (persona, prefillEmail = '') => ({
  name: persona.name.split(' ')[0],
  email: prefillEmail || persona.email,
  password: 'password',
  confirmPassword: 'password',
  userType: 'farmer',
  subscribeToNews: true,
  agreeToTerms: true
});
