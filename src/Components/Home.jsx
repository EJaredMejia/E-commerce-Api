import React, { useEffect, useState } from "react";
import {
  filtersNameThunk,
  getProductsThunk,
} from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import ProductsItem from "./ProductsItem";
import axios from "axios";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  /*   console.log(products); */

  const searchProduct = (e) => {
    e.preventDefault();
    allProducts.forEach((product) => {
      if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
        dispatch(filtersNameThunk(product.title.split(" ").shift()));
      }
    });
  };

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((res) => setAllProducts(res.data.data.products));
  }, []);

  return (
    <div className="relative top-28 w-10/12 mx-auto sm:w-11/12">
      <form
        onSubmit={searchProduct}
        className="flex align-center justify-center mx-auto"
      >
        <input
          placeholder="What are you looking for?"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-3 max-w-[500px] text-sm rounded-sm w-10/12 border border-gray-300 md:max-w-[40rem]"
        />
        <button className="rounded-sm bg-red-500 w-11 inline-block">
          <i className="text-white fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="flex justify-end items-center relative top-4 gap-2 max-w-[500px] mx-auto md:max-w-[40rem]">
        <i className="fa-solid text-xl fa-filter text-red-500"></i>
        <p className="text-red-500 font-semibold text-sm tracking-widest">
          Filters
        </p>
      </div>
      <div className="w-full mx-auto relative top-16 md:max-w-[42rem]">
        <ul className="grid gap-10 sm:grid-cols-2 sm:gap-4">
          {products.map((product) => (
            <ProductsItem product={product} key={product.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
