import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk, setProducts } from "../store/slices/products.slice";
import AnimatedPage from "./AnimatedPage";
import FiltersSideBar from "./FiltersSideBar";
import ProductsItem from "./ProductsItem";
import { axiosInstance } from "./utilis/axios";
import { getCartThunk } from "../store/slices/cart.slice";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  document.body.style.paddingBottom = "400px";

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getCartThunk(user.token));
    }
  }, []);

  const products = useSelector((state) => state.products);

  const searchProduct = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      const filteredProducts = allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      dispatch(setProducts(filteredProducts));
    } else {
      dispatch(getProductsThunk());
    }
  };

  useEffect(() => {
    if (searchValue === "") {
      dispatch(getProductsThunk());
      axiosInstance
        .get("/products")
        .then((res) => setAllProducts(res.data.data.products));
    } else {
      const filteredProducts = allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [searchValue]);

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
