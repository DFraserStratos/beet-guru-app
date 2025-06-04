import React from 'react';
import { PlusCircle } from 'lucide-react';
import { logger } from '../../utils/logger';
import ActionItemsWidget from '../ui/ActionItemsWidget';
import { FormButton } from '../ui/form';
import PageHeader from '../ui/PageHeader';
import PageContainer from '../layout/PageContainer';


/**
 * Home screen component with dashboard widgets
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const HomeScreen = ({ onNavigate, isMobile = false, user = { name: 'John Doe' } }) => {
  const handleNewAssessment = () => {
    onNavigate('new-assessment');
  };

  const headerSubtitle = (
    <>
      <p className="mb-2">
        Beet Guru simplifies estimating beet dry matter yield by calculating an accurate average from fresh weight samples. It provides a clear, reliable yield range, making your farm planning more effective and data-driven.
      </p>
      <p>
        Easy-to-use and intuitive, Beet Guru securely stores your grower and paddock details directly within each assessment. At the end of the process, you'll receive a comprehensive and easy-to-read report via email, streamlining your record-keeping and decision-making.
      </p>
    </>
  );

  return (
    <PageContainer>
      {/* Header Card */}
      <PageHeader
        title={`Welcome, ${user.name}`}
        subtitle={headerSubtitle}
        actions={!user?.isAdmin && (
          <FormButton variant="primary" icon={<PlusCircle size={16} />} onClick={handleNewAssessment}>
            {isMobile ? 'New' : 'New Assessment'}
          </FormButton>
        )}
      />

      {/* Action Items Widget - Full Width */}
      <ActionItemsWidget onNavigate={onNavigate} user={user} />
    </PageContainer>
  );
};

export default HomeScreen;
