import React, { useEffect, useState } from "react";
import {
  filtersNameThunk,
  getProductsThunk,
} from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import ProductsItem from "./ProductsItem";
import axios from "axios";
import FiltersSideBar from "./FiltersSideBar";
import AnimatedPage from "./AnimatedPage";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  document.body.style.paddingBottom = "400px";

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const searchProduct = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      allProducts.forEach((product) => {
        if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
          dispatch(filtersNameThunk(product.title.split(" ").shift()));
        }
      });
    } else {
      dispatch(getProductsThunk());
    }
  };

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((res) => setAllProducts(res.data.data.products));
  }, []);

  const toogleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <AnimatedPage>
      <FiltersSideBar
        isFiltersVisible={isFiltersVisible}
        toogleFilters={toogleFilters}
      />
      <section className="relative top-28 w-10/12 mx-auto sm:w-11/12 lg:grid lg:grid-cols-home lg:w-full">
        <div style={{ gridColumn: "2/3" }}>
          <form
            onSubmit={searchProduct}
            className="flex align-center justify-center mx-auto"
          >
            <input
              placeholder="What are you looking for?"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-3 max-w-[500px] text-sm rounded-sm w-10/12 border border-gray-300 md:max-w-[40rem] lg:w-full xl:max-w-[47rem]"
            />
            <button className="rounded-sm bg-red-500 w-11 inline-block xl:flex xl:justify-center xl:items-center xl:px-[3rem]">
              <i className="text-white fa-solid fa-magnifying-glass "></i>
            </button>
          </form>
          <div className="flex justify-end items-center relative top-4 max-w-[500px] mx-auto md:max-w-[40rem] lg:invisible">
            <div onClick={toogleFilters} className="flex gap-2 items-center">
              <i className="fa-solid text-xl fa-filter text-red-500"></i>
              <p className="text-red-500 font-semibold text-sm tracking-widest">
                Filters
              </p>
            </div>
          </div>
          <div className="w-full mx-auto relative top-16 md:max-w-[42rem] lg:top-6 xl:max-w-none xl:w-11/12">
            <ul className="grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10 ">
              {products.map((product) => (
                <ProductsItem product={product} key={product.id} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Home;
