/**
 * Collection of diverse user personas for demo purposes
 * Each persona is randomly selected when entering the login flow
 */

const personas = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@example.com',
    password: 'password123',
    hasPassword: true,
    role: 'Farm Manager',
    initials: 'MR',
    gender: 'female',
    farmName: 'Sunnydale Organics',
    location: 'California'
  },
  {
    id: '2',
    name: 'Li Wei Chen',
    email: 'liwei.chen@example.com',
    password: null,  // Magic link only user
    hasPassword: false,
    role: 'Agricultural Consultant',
    initials: 'LC',
    gender: 'male',
    farmName: 'Eastern Horizons Farm',
    location: 'Oregon'
  },
  {
    id: '3',
    name: 'Jamal Washington',
    email: 'jamal.washington@example.com',
    password: 'farmlife2024',
    hasPassword: true,
    role: 'Farm Owner',
    initials: 'JW',
    gender: 'male',
    farmName: 'Washington Family Farms',
    location: 'Georgia'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    password: 'dairyfarm',
    hasPassword: true,
    role: 'Farm Manager',
    initials: 'SJ',
    gender: 'female',
    farmName: 'Johnson Dairy',
    location: 'Wisconsin'
  },
  {
    id: '5',
    name: 'Ahmed Al-Farsi',
    email: 'ahmed.alfarsi@example.com',
    password: null,  // Magic link only user
    hasPassword: false,
    role: 'Farm Tech Specialist',
    initials: 'AA',
    gender: 'male',
    farmName: 'Innovation Agriculture',
    location: 'Arizona'
  },
  {
    id: '6',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    password: 'research123',
    hasPassword: true,
    role: 'Agricultural Scientist',
    initials: 'PP',
    gender: 'female',
    farmName: 'Green Solutions Research',
    location: 'Illinois'
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.kim@example.com',
    password: 'orchard2024',
    hasPassword: true,
    role: 'Farm Manager',
    initials: 'DK',
    gender: 'male',
    farmName: 'Kim Family Orchards',
    location: 'Washington'
  },
  {
    id: '8',
    name: 'Isabella Rossi',
    email: 'isabella.rossi@example.com',
    password: null,  // Magic link only user
    hasPassword: false,
    role: 'Organic Farm Owner',
    initials: 'IR',
    gender: 'female',
    farmName: 'Bella Terra Organics',
    location: 'California'
  },
  {
    id: '9',
    name: 'Kwame Osei',
    email: 'kwame.osei@example.com',
    password: 'harvest2024',
    hasPassword: true,
    role: 'Agricultural Engineer',
    initials: 'KO',
    gender: 'male',
    farmName: 'Sustainable Harvest',
    location: 'Texas'
  },
  {
    id: '10',
    name: 'Emma Thompson',
    email: 'emma.thompson@example.com',
    password: 'ranchlife',
    hasPassword: true,
    role: 'Livestock Specialist',
    initials: 'ET',
    gender: 'female',
    farmName: 'Thompson Ranch',
    location: 'Montana'
  },
  {
    id: '11',
    name: 'Miguel Hernandez',
    email: 'miguel.hernandez@example.com',
    password: null,  // Magic link only user
    hasPassword: false,
    role: 'Farm Operations Manager',
    initials: 'MH',
    gender: 'male',
    farmName: 'Hernandez Family Farms',
    location: 'New Mexico'
  },
  {
    id: '12',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    password: 'future2024',
    hasPassword: true,
    role: 'Agricultural Researcher',
    initials: 'AK',
    gender: 'female',
    farmName: 'Future Farming Institute',
    location: 'Michigan'
  }
];

export default personas;