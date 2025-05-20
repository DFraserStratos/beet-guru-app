import Skeleton from './Skeleton';

const LocationCardSkeleton = () => (
  <li className="hover:bg-gray-50">
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <Skeleton className="h-10 w-10 rounded-full mr-3 flex-shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  </li>
);

export default LocationCardSkeleton;
