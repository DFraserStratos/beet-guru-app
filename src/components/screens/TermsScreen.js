import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FormButton } from '../ui/form';
import { useNavigation } from '../../context/NavigationContext';
import PageContainer from '../layout/PageContainer';


/**
 * Screen for displaying the Terms & Conditions
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const TermsScreen = ({ isMobile = false }) => {
  const { navigate } = useNavigation();
  return (
    <PageContainer>
      {/* Header with back button - only shown on mobile */}
      {isMobile && (
        <div className="flex items-center mb-4">
          <FormButton
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('more')}
            size="sm"
          >
            Back
          </FormButton>
        </div>
      )}
      
      {/* Main content */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
        
        <div className="text-gray-600 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Beet Guru application ("App"), you acknowledge that you have read, 
              understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of 
              these terms, you must not use the App.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. App License</h2>
            <p>
              Subject to these Terms & Conditions, we grant you a limited, non-exclusive, non-transferable license 
              to use the App for your personal or business farming activities. This license does not allow you to 
              modify, distribute, or create derivative works based on the App.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
            <p>
              To use certain features of the App, you may need to create a user account. You are responsible for 
              maintaining the confidentiality of your account information and for all activities that occur under your 
              account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data and Privacy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal information. Our collection 
              and use of your data is governed by our Privacy Policy, which is incorporated into these Terms & Conditions 
              by reference.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. App Content and Calculations</h2>
            <p>
              The App provides tools for estimating crop yields, dry matter content, and feeding schedules. These 
              calculations are based on algorithms and models that, while designed to be accurate, may not account for all 
              variables affecting actual crop performance. You should use the App's outputs as guidance only and combine 
              them with your professional judgment and experience.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The App is provided "as is" and "as available" without warranties of any kind, either express or implied. 
              We do not guarantee that the App will be error-free, uninterrupted, or that it will meet your specific 
              requirements.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including lost profits, arising out of or relating to your use or 
              inability to use the App.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms & Conditions at any time. We will provide notice of significant 
              changes through the App or by other means. Your continued use of the App after such modifications constitutes 
              your acceptance of the updated terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Governing Law</h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of New Zealand, 
              without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at legal@beetguru.co.nz.
            </p>
          </section>
          
          <section className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: May 14, 2025
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
};

export default TermsScreen;
