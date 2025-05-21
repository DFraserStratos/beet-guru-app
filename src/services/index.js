import authAPI from './authAPI';
import assessmentsAPI from './assessmentsAPI';
import reportsAPI from './reportsAPI';
import referencesAPI from './referencesAPI';

export { authAPI, assessmentsAPI, reportsAPI, referencesAPI };

export default {
  auth: authAPI,
  assessments: assessmentsAPI,
  reports: reportsAPI,
  references: referencesAPI
};
