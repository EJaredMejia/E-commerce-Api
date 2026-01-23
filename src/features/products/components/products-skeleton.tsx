export const ProductsSkeleton = () => {
  return (
    <ul className="grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="rounded-xl border border-gray-300 pt-5">
          <div className="flex w-full items-center justify-center border-b border-gray-300 pb-5 sm:h-50">
            <div className="mx-auto h-[200px] w-40 animate-pulse rounded bg-gray-200 sm:h-40 md:h-48" />
          </div>
          <div className="h-42 p-5">
            <div className="mb-4 ml-4 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2 h-4 w-12 animate-pulse rounded bg-gray-200" />
                <div className="ml-4 h-5 w-16 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
