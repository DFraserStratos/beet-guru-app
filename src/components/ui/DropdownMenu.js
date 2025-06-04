import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

/**
 * Reusable dropdown menu component with kebab menu icon
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of menu items with { label, onClick, className, icon } structure
 * @param {string} props.className - Additional CSS classes for the dropdown container
 * @param {boolean} props.disabled - Whether the dropdown is disabled
 * @returns {JSX.Element} Rendered dropdown menu
 */
const DropdownMenu = ({ 
  items = [], 
  className = '', 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item, e) => {
    e.stopPropagation();
    setIsOpen(false);
    if (item.onClick) {
      item.onClick();
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Kebab menu trigger button */}
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`
          p-2 rounded-full text-gray-500 hover:text-green-800 hover:bg-green-50 transition-colors duration-200
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          focus:outline-none
        `}
        title="More actions"
        aria-label="More actions"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreVertical size={16} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[140px]">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={(e) => handleItemClick(item, e)}
              className={`
                w-full text-left px-4 py-2 text-sm hover:bg-green-50 hover:text-green-800 transition-colors duration-150
                flex items-center
                ${item.className || 'text-gray-700'}
              `}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className="mr-2 flex-shrink-0">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu; 