import { FormField } from '../../ui/form';

const ProfileSettings = ({ values, errors, touched, handleChange, handleBlur }) => (
  <form>
    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <FormField
        label="Full Name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        placeholder="Your full name"
        required
      />
      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        placeholder="Your email address"
        required
      />
      <FormField
        label="Role"
        name="role"
        type="text"
        value={values.role}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.role}
        touched={touched.role}
        placeholder="Your role (e.g. Farm Manager)"
      />
      <FormField
        label="Phone Number"
        name="phone"
        type="text"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
        placeholder="Your phone number"
      />
    </div>
    <div className="border-t border-gray-200 pt-4">
      <p className="text-sm text-gray-500 mb-4">
        Profile information will be used for reports and notifications
      </p>
    </div>
  </form>
);

export default ProfileSettings;
