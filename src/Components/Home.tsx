import { ALL_PRODUCTS } from "@/constants/products.constants";
import { Search, Filter } from "lucide-react";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { useFiltersStore } from "@/store/filters.store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FiltersSideBar from "./filters-side-bar";
import ProductsItem from "../features/products/components/products-item";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const category = useFiltersStore((state) => state.category);
  const price = useFiltersStore((state) => state.price);

  const { data: allProducts } = useQuery(getProductsQueryOptions());

  const toogleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  function getFilteredProducts() {
    return allProducts?.filter((product) => {
      const hasCategory =
        category !== ALL_PRODUCTS ? product.categoryId === category : true;

      const hasSearch = searchValue
        ? product.title.toLowerCase().includes(searchValue.toLowerCase())
        : true;

      const isInsidePrice =
        Number(product.price) >= price.from &&
        Number(product.price) <= price.to;

      return hasCategory && hasSearch && isInsidePrice;
    });
  }

  const filteredProducts = getFilteredProducts();

  return (
    <>
      <FiltersSideBar
        isFiltersVisible={isFiltersVisible}
        toogleFilters={toogleFilters}
      />
      <section className="lg:grid-cols-home relative top-28 mx-auto w-10/12 pb-14 sm:w-11/12 lg:grid lg:w-full">
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
            <ul className="grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10">
              {filteredProducts?.map((product) => (
                <ProductsItem product={product} key={product.id} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
