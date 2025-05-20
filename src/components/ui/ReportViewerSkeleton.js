import PageContainer from '../layout/PageContainer';
import Skeleton from './Skeleton';

const ReportViewerSkeleton = () => (
  <PageContainer>
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b border-gray-100 min-h-[120.667px]">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      <div className="p-6 border-b border-gray-100 space-y-2 min-h-[140.667px]">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[436.667px]">
        <div className="p-6 border-b md:border-r border-gray-100 space-y-2">
          <Skeleton className="h-6 w-48 mb-4" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-3/4" />
          ))}
        </div>
        <div className="p-6 border-b border-gray-100 space-y-2">
          <Skeleton className="h-6 w-48 mb-4" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-3/4" />
          ))}
        </div>
      </div>
      <div className="p-6 bg-green-50 border-b border-gray-100 min-h-[644.667px]">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm space-y-2">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="bg-white rounded-lg p-6 shadow-sm h-64" />
        </div>
      </div>
      <div className="p-6 border-b border-gray-100">
        <Skeleton className="h-6 w-48 mb-4" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-2" />
        ))}
      </div>
      <div className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-2" />
        ))}
      </div>
    </div>
  </PageContainer>
);

export default ReportViewerSkeleton;
