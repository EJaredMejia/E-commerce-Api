import { ALL_PRODUCTS } from "@/constants/products.constants";
import { ChevronDown, X } from "lucide-react";
import { useFiltersStore } from "@/store/filters.store";
import { useState, Suspense } from "react";
import { CategoriesList } from "@/features/categories/components/categories-list";
import { CategoriesSkeleton } from "@/features/categories/components/categories-skeleton";

interface FiltersSideBarProps {
  isFiltersVisible: boolean;
  toogleFilters: () => void;
}

const FiltersSideBar = ({
  isFiltersVisible,
  toogleFilters,
}: FiltersSideBarProps) => {
  const [isPriceActive, setIsPriceActive] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  const setCategory = useFiltersStore((state) => state.setCategory);

  function setCategoryInput(category: number | typeof ALL_PRODUCTS) {
    setCategory(category);
  }

  const price = useFiltersStore((state) => state.price);
  const setPrice = useFiltersStore((state) => state.setPrice);

  return (
    <div
      className={`fixed right-0 block overflow-hidden transition-[max-width] duration-300 ${
        isFiltersVisible ? "max-w-2xs" : "max-w-0"
      } z-50 h-screen w-[18rem] bg-white shadow-lg lg:visible lg:top-0 lg:right-auto lg:z-40 lg:max-w-2xs`}
    >
      <div className="relative top-16 left-5 w-60 lg:top-32">
        {isFiltersVisible && (
          <X
            onClick={toogleFilters}
            className="absolute -top-8 right-0 cursor-pointer text-gray-600 lg:hidden"
          />
        )}
        <div
          onClick={() => setIsPriceActive(!isPriceActive)}
          className="flex cursor-pointer justify-between border-b-2 border-gray-300"
        >
          <h4 className="font-bold text-gray-600">Price</h4>
          <ChevronDown
            className={`inline-block ${
              isPriceActive ? "rotate-180" : "rotate-0"
            } transition-transform duration-200`}
          />
        </div>
        <div
          className={`mt-5 ml-3 flex flex-col gap-4 ${
            isPriceActive ? "show" : "hide"
          }`}
        >
          <div>
            <label className="text-md text-gray-600" htmlFor="fromPrice">
              From
            </label>
            <input
              min="0"
              className="ml-3 w-44 rounded-sm border border-gray-300 p-2 text-sm"
              id="fromPrice"
              value={
                !price.from || price.from === Number.NEGATIVE_INFINITY
                  ? ""
                  : price.from
              }
              onChange={(e) => {
                const value = e.target.value;

                const isEmpty = value === "";

                if (isEmpty) {
                  setPrice({ from: Number.NEGATIVE_INFINITY });
                  return;
                }

                setPrice({ from: Number(e.target.value) });
              }}
              type="number"
            />
          </div>
          <div>
            <label className="text-md text-gray-600" htmlFor="toPrice">
              To
            </label>
            <input
              value={
                !price.to || price.to === Number.POSITIVE_INFINITY
                  ? ""
                  : price.to
              }
              onChange={(e) => {
                const value = e.target.value;

                const isEmpty = value === "";

                if (isEmpty) {
                  setPrice({ to: Number.POSITIVE_INFINITY });
                  return;
                }

                setPrice({ to: Number(value) });
              }}
              min="1"
              className="ml-8 w-44 rounded-sm border border-gray-300 p-2 text-sm"
              id="toPrice"
              type="number"
            />
          </div>
        </div>
        <form className="mt-10">
          <div
            onClick={() => setIsCategoryActive(!isCategoryActive)}
            className="flex cursor-pointer justify-between border-b-2 border-gray-300"
          >
            <h4 className="font-bold text-gray-600">Category</h4>
            <ChevronDown
              className={`inline-block ${
                isCategoryActive ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </div>
          <div className={`mt-5 ml-3 ${isCategoryActive ? "show" : "hide"}`}>
            <Suspense fallback={<CategoriesSkeleton />}>
              <CategoriesList
                toogleFilters={toogleFilters}
                setCategoryInput={setCategoryInput}
              />
            </Suspense>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FiltersSideBar;
