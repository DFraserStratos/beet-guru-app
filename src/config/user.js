/**
 * User configuration for Beet Guru app
 * Currently supports Fred the farmer as the default demo user
 * Ready for future expansion to support retailer personas
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
// Example structure:
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
//   location: 'City, Country'
// };

export default fredTheFarmer; 