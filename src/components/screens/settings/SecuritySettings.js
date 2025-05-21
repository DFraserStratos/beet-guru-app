import { FormField, FormButton } from '../../ui/form';

const SecuritySettings = ({ onPasswordUpdate }) => (
  <form>
    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
    <div className="space-y-4 mb-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="font-medium mb-2">Change Password</h3>
        <div className="grid grid-cols-1 gap-4">
          <FormField
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Your current password"
          />
          <FormField
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="New password"
          />
          <FormField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
          />
          <div>
            <FormButton
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                if (onPasswordUpdate) {
                  onPasswordUpdate();
                } else {
                  alert('Password change functionality would be implemented here');
                }
              }}
            >
              Update Password
            </FormButton>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-200 pt-4">
      <p className="text-sm text-gray-500 mb-4">
        Keeping your account secure helps protect your farm data
      </p>
    </div>
  </form>
);

export default SecuritySettings;
