import { Circle, Minus, Plus } from "lucide-react";
import { ProductsSkeleton } from "./products-skeleton";

export const ProductDetailSkeleton = () => {
  return (
    <div className="relative top-20 mx-auto w-11/12 max-w-[540px] pb-12 text-gray-600 md:top-28 md:grid md:max-w-[900px] md:grid-cols-2 md:gap-8 lg:max-w-[1300px]">
      <section>
        <div className="flex items-center gap-3 text-sm">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <Circle className="text-gray-200" fill="currentColor" size={8} />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="relative top-12 flex items-center justify-between gap-1 md:justify-center lg:justify-evenly">
          <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
          <div className="h-52 w-52 animate-pulse bg-gray-200 object-contain contain-layout sm:h-80 sm:w-[20rem]" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="mt-20 hidden items-center justify-center gap-4 lg:flex">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-16 animate-pulse rounded-md bg-gray-200"
            />
          ))}
        </div>
      </section>
      <section className="relative top-20">
        <div className="ml-6 h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 grid grid-cols-2">
          <h6 className="order-1 text-gray-400">Price</h6>
          <div className="order-3 mt-2 ml-6 h-6 w-24 animate-pulse rounded bg-gray-200" />
          <h6 className="order-2 text-gray-400">Quantity</h6>
          <div className="order-4 mt-2 grid w-32 grid-cols-3 items-center justify-items-center border border-gray-300 text-base">
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <Minus size={16} />
            </div>
            <div className="w-full text-center">1</div>
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <Plus size={16} />
            </div>
          </div>
        </div>
        <div className="md:grid">
          <div className="mt-10 flex h-14 w-full animate-pulse items-center justify-center gap-3 bg-gray-200 px-3 py-4 text-white md:order-2" />
          <div className="mt-12 space-y-2 md:order-1">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </section>
      <section style={{ gridColumn: "1/3" }} className="mt-28 lg:mt-8">
        <div className="mb-8 h-6 w-48 animate-pulse rounded bg-gray-200" />
        <ProductsSkeleton />
      </section>
    </div>
  );
};
