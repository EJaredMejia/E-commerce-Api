import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { useFiltersStore } from "@/store/filters.store";
import { ALL_PRODUCTS } from "@/constants/products.constants";
import ProductsItem from "./products-item";
import { useServerFn } from "@tanstack/react-start";
import { getAllProducts } from "../server/products.server";

interface ProductsGridProps {
  searchValue: string;
}

export const ProductsGrid = ({ searchValue }: ProductsGridProps) => {
  const queryFn = useServerFn(getAllProducts);
  const { data: allProducts } = useSuspenseQuery(
    getProductsQueryOptions(queryFn),
  );
  const category = useFiltersStore((state) => state.category);
  const price = useFiltersStore((state) => state.price);

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
    <ul className="grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10">
      {filteredProducts.map((product) => (
        <ProductsItem product={product} key={product.id} />
      ))}
    </ul>
  );
};
