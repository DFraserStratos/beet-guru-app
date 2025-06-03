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

// TODO: Add retailer personas here when implementing retailer accounts
// Example structure for future retailer users:
// const retailerPersona = {
//   id: '2',
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