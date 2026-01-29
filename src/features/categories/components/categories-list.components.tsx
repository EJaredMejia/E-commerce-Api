import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { useFiltersStore } from "@/store/filters.store";
import { ALL_PRODUCTS } from "@/constants/products.constants";
import { getAllCategories } from "../server/categories.server";

interface CategoriesListProps {
  toogleFilters: () => void;
  setCategoryInput: (category: number | typeof ALL_PRODUCTS) => void;
}

export const CategoriesList = ({
  toogleFilters,
  setCategoryInput,
}: CategoriesListProps) => {
  const { data: categories } = useSuspenseQuery(
    getCategoriesQueryOptions(getAllCategories),
  );
  const category = useFiltersStore((state) => state.category);

  return (
    <>
      <div className="mb-3">
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
      {categories.map((categoryItem) => (
        <div className="mb-3" key={categoryItem.id}>
          <input
            onClick={toogleFilters}
            className="mr-3 cursor-pointer"
            type="radio"
            name="select_category"
            value={categoryItem.id}
            onChange={(e) => setCategoryInput(Number(e.target.value))}
            id={categoryItem.name}
          />
          <label className="cursor-pointer" htmlFor={categoryItem.name}>
            {categoryItem.name}
          </label>
        </div>
      ))}
    </>
  );
};
