import { FormField } from '../ui/form';

/**
 * Farm details settings section
 */
const FarmSection = ({ values, errors, touched, handleChange, handleBlur }) => (
  <form>
    <h2 className="text-xl font-semibold mb-4">Farm Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <FormField
        label="Farm Name"
        name="farmName"
        type="text"
        value={values.farmName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.farmName}
        touched={touched.farmName}
        placeholder="Your farm name"
        required
      />
      <FormField
        label="Farm Address"
        name="farmAddress"
        type="text"
        value={values.farmAddress}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.farmAddress}
        touched={touched.farmAddress}
        placeholder="Street address"
        required
      />
      <FormField
        label="City/Town"
        name="city"
        type="text"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.city}
        touched={touched.city}
        placeholder="City or town"
        required
      />
      <FormField
        label="Postal Code"
        name="postalCode"
        type="text"
        value={values.postalCode}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.postalCode}
        touched={touched.postalCode}
        placeholder="Postal code"
      />
      <FormField
        label="Region"
        name="region"
        type="text"
        value={values.region}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.region}
        touched={touched.region}
        placeholder="Region/State/Province"
        required
      />
      <FormField
        label="Country"
        name="country"
        type="text"
        value={values.country}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.country}
        touched={touched.country}
        placeholder="Country"
        required
      />
    </div>
    <div className="border-t border-gray-200 pt-4">
      <p className="text-sm text-gray-500 mb-4">
        Farm details will be used on reports and for weather information
      </p>
    </div>
  </form>
);

export default FarmSection;
