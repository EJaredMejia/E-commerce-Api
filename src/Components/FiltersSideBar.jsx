import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import {
  getProductsThunk,
  setProducts
} from "../store/slices/products.slice";
import { axiosInstance } from "./utilis/axios";

const FiltersSideBar = ({ isFiltersVisible, toogleFilters }) => {
  const [categories, setCategories] = useState([]);
  const [isPriceActive, setIsPriceActive] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  const [priceTo, setPriceTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");

  const dispatch = useDispatch();

  const [categoriesInput, setCategoriesInput] = useState("all products");

  useEffect(() => {
    if (categoriesInput !== -1) {
      setPriceTo("");
      setPriceFrom("");
    }
    if (categoriesInput === "all products") {
      dispatch(getProductsThunk());
    } else {
      dispatch(setIsLoading(true));
      axiosInstance
        .get("/products")
        .then((res) => {
          const filteredProducts = res.data.data.products.filter((product) => {
            return product.categoryId == categoriesInput;
          });
          dispatch(setProducts(filteredProducts));
        })
        .finally(() => dispatch(setIsLoading(false)));
    }
  }, [categoriesInput]);

  useEffect(() => {
    axiosInstance
      .get(
        "/products/categories"
      )
      .then((res) => setCategories(res.data.categories));
  }, []);


  const filterByPrice = () => {
    dispatch(setIsLoading(true));
    axiosInstance
      .get("/products")
      .then((res) => {
        const productsFiltered = res.data.data.products.filter((product) => {
          return (
            Number(product.price) >= priceFrom &&
            Number(product.price) <= priceTo
          );
        });
        if (productsFiltered.length > 0) {
          dispatch(setProducts(productsFiltered));
          setCategoriesInput("");
        } else {
          alert("no products found");
        }
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <div
      className={`block fixed right-0 ${
        isFiltersVisible ? "show-filters" : "hide-filters"
      } shadow-lg bg-white w-[18rem] lg:max-w-[18rem] h-screen z-50 lg:visible lg:z-40 lg:right-auto lg:top-0`}
    >
      <div className="relative top-[4rem] lg:top-[8rem] left-5 w-[15rem]">
        {isFiltersVisible && (
          <i
            onClick={toogleFilters}
            className="fa-solid fa-x fa-lg absolute right-0 top-[-2rem] cursor-pointer text-gray-600 lg:hidden"
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
        <form
          onSubmit={filterByPrice}
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
              className="ml-3 w-[11rem] p-2 border rounded border-gray-300 text-sm"
              id="fromPrice"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <label className="text-gray-600 text-md" htmlFor="toPrice">
              To
            </label>
            <input
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              min="1"
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
            <div className="mb-3 ">
              <input
                onClick={toogleFilters}
                checked={categoriesInput === "all products" ? true : false}
                className="mr-3 cursor-pointer"
                type="radio"
                name="select_category"
                value="all products"
                id="allProducts"
                onChange={(e) => setCategoriesInput(e.target.value)}
              />
              <label className="cursor-pointer" htmlFor="allProducts">
                All products
              </label>
            </div>
            {categories.map((category) => (
              <div className="mb-3" key={category.id}>
                <input
                  onClick={toogleFilters}
                  className="mr-3 cursor-pointer"
                  type="radio"
                  name="select_category"
                  value={category.id}
                  onChange={(e) => setCategoriesInput(e.target.value)}
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
