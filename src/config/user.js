/**
 * User configuration for Beet Guru app
 * Currently supports Fred the farmer as the default demo user
 * Ready for future expansion to support retailer personas
 * 
 * IMPORTANT: All paddocks in the system are associated with Fred via userId: '1'
 * This ensures clean data separation when retailer users are added, as they will
 * be able to view multiple farmers and their respective paddocks.
 */

// Default farmer persona - Fred Forger
const fredTheFarmer = {
  id: '1',
  name: 'Fred Forger',
  email: 'fred@beetguru.com',
  password: 'password123',
  hasPassword: true,
  role: 'Farm Manager',
  accountType: 'farmer',
  initials: 'FF',
  farmName: 'Fred\'s Farm',
  location: 'Canterbury, New Zealand'
};

// Additional farmer personas for Roland to manage
const sarahMcKenzie = {
  id: '3',
  name: 'Sarah McKenzie',
  email: 'sarah@goldenfieldsfarm.co.nz',
  password: 'password123',
  hasPassword: true,
  role: 'Farm Owner',
  accountType: 'farmer',
  initials: 'SM',
  farmName: 'Golden Fields Farm',
  location: 'Waikato, New Zealand'
};

const mikePatel = {
  id: '4',
  name: 'Mike Patel',
  email: 'mike@greenhillsagriculture.co.nz',
  password: 'password123',
  hasPassword: true,
  role: 'Farm Manager',
  accountType: 'farmer',
  initials: 'MP',
  farmName: 'Green Hills Agriculture',
  location: 'Auckland, New Zealand'
};

const jessicaThompson = {
  id: '5',
  name: 'Jessica Thompson',
  email: 'jessica@sunnyridgefarm.co.nz',
  password: 'password123',
  hasPassword: true,
  role: 'Farm Owner',
  accountType: 'farmer',
  initials: 'JT',
  farmName: 'Sunny Ridge Farm',
  location: 'Otago, New Zealand'
};

const davidWilson = {
  id: '6',
  name: 'David Wilson',
  email: 'david@valleyviewfarm.co.nz',
  password: 'password123',
  hasPassword: true,
  role: 'Farm Manager',
  accountType: 'farmer',
  initials: 'DW',
  farmName: 'Valley View Farm',
  location: 'Canterbury, New Zealand'
};

const emilyRoberts = {
  id: '7',
  name: 'Emily Roberts',
  email: 'emily@riverbendagriculture.co.nz',
  password: 'password123',
  hasPassword: true,
  role: 'Farm Owner',
  accountType: 'farmer',
  initials: 'ER',
  farmName: 'Riverbend Agriculture',
  location: 'Waikato, New Zealand'
};

// Retailer persona - Roland Reed
const rolandTheRetailer = {
  id: '2',
  name: 'Roland Reed',
  email: 'roland@beetguru.com',
  password: 'password123',
  hasPassword: true,
  role: 'Retail Consultant',
  accountType: 'retailer',
  initials: 'RR',
  companyName: 'Oxford Agricultural Supplies',
  address: '47 High Street, Oxford',
  city: 'Oxford',
  region: 'Canterbury',
  country: 'New Zealand',
  location: 'Oxford, New Zealand',
  accessibleFarmers: ['1', '3', '4', '5', '6', '7'], // Can view all farmer data
};

// TODO: Add more retailer personas here when needed
// Example structure for future retailer users:
// const retailerPersona = {
//   id: '3',
//   name: 'Retailer Name',
//   email: 'retailer@beetguru.com',
//   password: 'password123',
//   hasPassword: true,
//   role: 'Retail Consultant',
//   accountType: 'retailer',
//   initials: 'RN',
//   companyName: 'Retailer Company',
//   location: 'City, Country',
//   accessibleFarmers: ['1'], // Array of farmer IDs they can view
// };

export default fredTheFarmer;
export { rolandTheRetailer, sarahMcKenzie, mikePatel, jessicaThompson, davidWilson, emilyRoberts }; 