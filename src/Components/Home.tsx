import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { getCartThunk } from "../store/slices/cart.slice";
import {
  getProductsThunk,
  setProducts,
  type Product,
} from "../store/slices/products.slice";
import AnimatedPage from "./AnimatedPage";
import FiltersSideBar from "./FiltersSideBar";
import ProductsItem from "./ProductsItem";
import { axiosInstance } from "./utils/axios";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  document.body.style.paddingBottom = "400px";

  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (!storageUser) return;

    const user = JSON.parse(storageUser) as { token: string };
    if (!user) return;

    dispatch(getCartThunk(user.token));
  }, []);

  const products = useAppSelector((state) => state.products);

  const searchProduct = (e: React.FormEvent<HTMLFormElement>) => {
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
              className="p-3 max-w-[500px] text-sm rounded-xs w-10/12 border border-gray-300 md:max-w-160 lg:w-full xl:max-w-188"
            />
            <button className="rounded-xs bg-red-500 w-11 inline-block xl:flex xl:justify-center xl:items-center xl:px-12">
              <i className="text-white fa-solid fa-magnifying-glass "></i>
            </button>
          </form>
          <div className="flex justify-end items-center relative top-4 max-w-[500px] mx-auto md:max-w-160 lg:invisible">
            <div onClick={toogleFilters} className="flex gap-2 items-center">
              <i className="fa-solid text-xl fa-filter text-red-500"></i>
              <p className="text-red-500 font-semibold text-sm tracking-widest">
                Filters
              </p>
            </div>
          </div>
          <div className="w-full mx-auto relative top-16 md:max-w-2xl lg:top-6 xl:max-w-none xl:w-11/12">
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
