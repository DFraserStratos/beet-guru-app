import Skeleton from './Skeleton';

const LocationListItemSkeleton = () => (
  <li className="min-h-[76px] p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <Skeleton className="h-10 w-10 rounded-full mr-3 flex-shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </li>
);

export default LocationListItemSkeleton;
