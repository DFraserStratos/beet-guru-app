const Skeleton = ({ className = '' }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}> 
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer" />
  </div>
);

export default Skeleton;
