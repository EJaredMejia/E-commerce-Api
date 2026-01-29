import FiltersSideBar from "@/features/categories/components/filters-side-bar.components";
import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { ProductsGrid } from "@/features/products/components/products-grid";
import { ProductsSkeleton } from "@/features/products/components/products-skeleton";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { getAllProducts } from "@/features/products/server/products.server";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search } from "lucide-react";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    const { queryClient } = context;

    queryClient.prefetchQuery(getProductsQueryOptions(getAllProducts));
    queryClient.prefetchQuery(getCategoriesQueryOptions());
  },
});

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const toogleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <>
      <FiltersSideBar
        isFiltersVisible={isFiltersVisible}
        toogleFilters={toogleFilters}
      />
      <section className="lg:grid-cols-home relative mx-auto w-10/12 pt-8 pb-24 sm:w-11/12 lg:grid lg:w-full">
        <div style={{ gridColumn: "2/3" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="align-center mx-auto flex justify-center"
          >
            <div className="flex max-w-[500px] grow flex-col md:max-w-160 xl:max-w-188">
              <div className="flex justify-center">
                <input
                  placeholder="What are you looking for?"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="grow rounded-xs border border-gray-300 p-3 text-sm placeholder:text-gray-500 lg:w-full"
                />
                <button className="grid w-11 place-items-center rounded-xs bg-red-500 xl:w-24 xl:items-center xl:justify-center">
                  <Search className="size-5 text-white" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-end self-end lg:hidden">
                <button
                  type="button"
                  onClick={toogleFilters}
                  className="flex items-center gap-2"
                >
                  <Filter className="size-5 fill-red-500 text-red-500" />
                  <p className="text-sm font-semibold tracking-widest text-red-500">
                    Filters
                  </p>
                </button>
              </div>
            </div>
          </form>

          <div className="relative top-8 mx-auto w-full md:max-w-2xl lg:top-6 xl:top-12 xl:w-11/12 xl:max-w-none">
            <Suspense fallback={<ProductsSkeleton />}>
              <ProductsGrid searchValue={searchValue} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
