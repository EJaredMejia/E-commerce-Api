import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filtersCategoryThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const FiltersSideBar = ({isFiltersVisible, toogleFilters}) => {
  const [categories, setCategories] = useState([]);
  const [isPriceActive, setIsPriceActive] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  const dispatch = useDispatch();

  const [categoriesInput, setCategoriesInput] = useState("all products");
  console.log(categories);
  console.log(categoriesInput);

  useEffect(() => {
    if (categoriesInput === "all products") {
      dispatch(getProductsThunk());
    } else {
      dispatch(filtersCategoryThunk(categoriesInput));
    }
  }, [categoriesInput]);

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  return (
    <div className={`block fixed right-0 ${isFiltersVisible ? "show-filters" : "hide-filters"} shadow-lg bg-white w-[18rem] lg:max-w-[18rem] h-screen z-50 lg:visible lg:z-40 lg:right-auto lg:top-0`}>
      <div className="relative top-[4rem] lg:top-[8rem] left-5 w-[15rem]">
        {isFiltersVisible && (
          <i onClick={toogleFilters} className="fa-solid fa-x fa-lg absolute right-0 top-[-2rem] cursor-pointer text-gray-600"></i>
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
        <form
          className={`flex flex-col gap-4 mt-5 ml-3 ${
            isPriceActive ? "show" : "hide"
          }`}
        >
          <div>
            <label className="text-gray-600 text-md" htmlFor="fromPrice">
              From
            </label>
            <input
              className="ml-3 w-[11rem] p-2 border rounded border-gray-300 text-sm"
              id="fromPrice"
              type="number"
            />
          </div>
          <div>
            <label className="text-gray-600 text-md" htmlFor="toPrice">
              To
            </label>
            <input
              className="ml-8 w-[11rem] p-2 border rounded border-gray-300 text-sm"
              id="toPrice"
              type="number"
            />
          </div>
          <button className="text-white bg-red-500 rounded-md w-fit px-3 py-2 text-sm self-end">
            Filter price
          </button>
        </form>
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
            <div className="mb-3">
              <input
                checked={categoriesInput === "all products" ? true : false}
                className="mr-3"
                type="radio"
                name="select_category"
                value="all products"
                id="allProducts"
                onChange={(e) => setCategoriesInput(e.target.value)}
              />
              <label htmlFor="allProducts">All products</label>
            </div>
            {categories.map((category) => (
              <div className="mb-3" key={category.id}>
                <input
                  className="mr-3"
                  type="radio"
                  name="select_category"
                  value={category.id}
                  onChange={(e) => setCategoriesInput(e.target.value)}
                  id={category.name}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FiltersSideBar;
