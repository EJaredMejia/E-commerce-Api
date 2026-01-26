import { Circle } from "lucide-react";

export const PurchasesSkeleton = () => {
  return (
    <section className="relative top-20 mx-auto w-11/12 max-w-[600px] pb-12 md:top-28 md:max-w-[1000px]">
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
        <Circle className="text-gray-200" fill="currentColor" size={8} />
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-wide text-gray-600">
        My purchases
      </h2>
      <ul className="mt-8 grid gap-5">
        {[1, 2, 3].map((i) => (
          <li key={i} className="rounded-lg border border-gray-300">
            <div className="border-b border-gray-300 bg-gray-50 p-3">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mx-auto p-7 text-sm text-gray-600 sm:w-100 md:w-136">
              {[1, 2].map((j) => (
                <div
                  className="my-2 grid grid-cols-3 items-center justify-items-end gap-y-7"
                  key={j}
                >
                  <div className="h-4 w-3/4 animate-pulse justify-self-start rounded bg-gray-200" />
                  <div className="h-8 w-12 animate-pulse border border-gray-300 bg-gray-200" />
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
