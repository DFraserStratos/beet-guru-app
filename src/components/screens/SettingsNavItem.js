/**
 * Navigation item for the settings sidebar
 */
const SettingsNavItem = ({ label, icon, isActive, onClick }) => (
  <li>
    <button
      className={`w-full p-4 flex items-center text-left ${
        isActive ? 'bg-green-50 text-green-600 font-medium' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className={`mr-3 ${isActive ? 'text-green-600' : 'text-gray-500'}`}>{icon}</div>
      <span>{label}</span>
    </button>
  </li>
);

export default SettingsNavItem;
