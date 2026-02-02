import type { Product } from "@/features/products/types/products.types";
import { cn } from "@/utils/cn.utils";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Suspense, type ComponentProps } from "react";
import { useAddProductToCart } from "../hooks/products.hooks";

interface ProductsItemsProps {
  product: Product;
}

const ProductsItem = ({ product }: ProductsItemsProps) => {
  return (
    <li className="rounded-xl border border-gray-300 pt-5">
      <div className="grid place-items-center border-b border-gray-300 pb-5">
        <Link
          to={`/product/$id`}
          params={{ id: product.id }}
          className="w-fit cursor-pointer transition-transform hover:scale-110 sm:h-50"
        >
          <img
            className={`max-h-[250px] w-40 contain-layout sm:h-40 sm:w-fit sm:px-2 md:h-48`}
            src={product.productImgs[0]?.imgUrl}
            alt="product image"
            style={{
              viewTransitionName: `product-image-${product.id}`,
            }}
          />
        </Link>
      </div>
      <div className="h-42 p-5">
        <h3 className="mb-4 ml-4 font-bold tracking-wider">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Price</p>
            <p className="ml-4 font-semibold">$ {product.price}</p>
          </div>
          <Suspense fallback={<ButtonAdd disabled />}>
            <ButtonAddToCart productId={product.id} />
          </Suspense>
        </div>
      </div>
    </li>
  );
};

function ButtonAddToCart({ productId }: { productId: number }) {
  const addToCart = useAddProductToCart({
    productId,
  });

  return <ButtonAdd onClick={addToCart} />;
}

function ButtonAdd({
  className,
  ...rest
}: Omit<ComponentProps<"button">, "children">) {
  return (
    <button
      className={cn(
        "block w-fit cursor-pointer rounded-full bg-red-500 p-4 text-gray-100 transition-colors hover:bg-red-600 disabled:bg-gray-500",
        className,
      )}
      {...rest}
    >
      <ShoppingCart className="size-5 fill-white" />
    </button>
  );
}
export default ProductsItem;
