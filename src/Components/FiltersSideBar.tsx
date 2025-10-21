import { ALL_PRODUCTS } from "@/constants/products.constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetCategoriesQuery } from "@/store/slices/categories.slice";
import {
  setCategory,
  setPrice,
  type FiltersState,
} from "@/store/slices/filters.slice";
import { useState } from "react";

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

  const price = useAppSelector((state) => state.filters.price);

  function setCategoryInput(category: FiltersState["category"]) {
    dispatch(setCategory(category));
  }

  const category = useAppSelector((state) => state.filters.category);
  const dispatch = useAppDispatch();
  const { data } = useGetCategoriesQuery();

  const categories = data?.data.categories;

  return (
    <div
      className={`block fixed right-0 ${
        isFiltersVisible ? "show-filters" : "hide-filters"
      } shadow-lg bg-white w-[18rem] lg:max-w-[18rem] h-screen z-50 lg:visible lg:z-40 lg:right-auto lg:top-0`}
    >
      <div className="relative top-16 lg:top-32 left-5 w-60">
        {isFiltersVisible && (
          <i
            onClick={toogleFilters}
            className="fa-solid fa-x fa-lg absolute right-0 -top-8 cursor-pointer text-gray-600 lg:hidden"
          ></i>
        )}
        <div
          onClick={() => setIsPriceActive(!isPriceActive)}
          className="border-b-2 border-gray-300 flex justify-between cursor-pointer"
        >
          <h4 className="font-bold text-gray-600">Price</h4>
          <i
            className={`fa-solid text-xl fa-angle-down inline-block rotate-180 ${
              isPriceActive ? "rotate-down" : "rotate-up"
            }`}
          ></i>
        </div>
        <div
          className={`flex flex-col gap-4 mt-5 ml-3 ${
            isPriceActive ? "show" : "hide"
          }`}
        >
          <div>
            <label className="text-gray-600 text-md" htmlFor="fromPrice">
              From
            </label>
            <input
              min="0"
              className="ml-3 w-44 p-2 border rounded-sm border-gray-300 text-sm"
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
                  dispatch(setPrice({ from: Number.NEGATIVE_INFINITY }));
                  return;
                }

                dispatch(setPrice({ from: Number(e.target.value) }));
              }}
              type="number"
            />
          </div>
          <div>
            <label className="text-gray-600 text-md" htmlFor="toPrice">
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
                  dispatch(setPrice({ to: Number.POSITIVE_INFINITY }));
                  return;
                }

                dispatch(setPrice({ to: Number(value) }));
              }}
              min="1"
              className="ml-8 w-44 p-2 border rounded-sm border-gray-300 text-sm"
              id="toPrice"
              type="number"
            />
          </div>
        </div>
        <form className="mt-10">
          <div
            onClick={() => setIsCategoryActive(!isCategoryActive)}
            className="border-b-2 border-gray-300 flex justify-between cursor-pointer"
          >
            <h4 className="font-bold text-gray-600">Category</h4>
            <i
              className={`fa-solid text-xl fa-angle-down inline-block rotate-180 ${
                isCategoryActive ? "rotate-down" : "rotate-up"
              }`}
            ></i>
          </div>
          <div className={`mt-5 ml-3 ${isCategoryActive ? "show" : "hide"}`}>
            <div className="mb-3 ">
              <input
                onClick={toogleFilters}
                checked={category === ALL_PRODUCTS ? true : false}
                className="mr-3 cursor-pointer"
                type="radio"
                name="select_category"
                value={ALL_PRODUCTS}
                id="allProducts"
                onChange={(e) =>
                  setCategoryInput(e.target.value as typeof ALL_PRODUCTS)
                }
              />
              <label className="cursor-pointer" htmlFor="allProducts">
                All products
              </label>
            </div>
            {categories?.map((category) => (
              <div className="mb-3" key={category.id}>
                <input
                  onClick={toogleFilters}
                  className="mr-3 cursor-pointer"
                  type="radio"
                  name="select_category"
                  value={category.id}
                  onChange={(e) => setCategoryInput(Number(e.target.value))}
                  id={category.name}
                />
                <label className="cursor-pointer" htmlFor={category.name}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FiltersSideBar;
