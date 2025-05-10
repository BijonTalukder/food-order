const SkeletonLoader = () => {
  return (
    <div className='animate-pulse space-y-4'>
      {/* Header Skeleton */}
      <div className='w-full border border-blue-300 shadow rounded-md p-4   mx-auto'>
        <div className='space-y-3'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-200 rounded'></div>
          <div className='h-2 bg-slate-200 rounded'></div>
        </div>
      </div>

      {/* Table Row Skeletons */}
      <div className='shadow-md'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className='flex  m-2 p-2 flex-col gap-4'>
            <div className='skeleton h-8 w-full bg-slate-200 rounded'></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SkeletonLoader;
