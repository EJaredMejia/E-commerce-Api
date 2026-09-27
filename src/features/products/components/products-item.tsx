import type { Product } from "@/features/products/types/products.types";
import { cn } from "@/utils/cn.utils";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Suspense, type ComponentProps } from "react";
import { useAddProductToCart } from "../hooks/products.hooks";
import { Button } from "@root/components/ui/button";

interface ProductsItemsProps {
  product: Product;
}

const ProductsItem = ({ product }: ProductsItemsProps) => {
  return (
    <li className="rounded-xl border border-gray-300 pt-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="grid place-items-center border-b border-gray-100 pb-5">
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
      <div className="h-42 p-5 flex flex-col justify-between">
        <h3 className="mb-4 font-bold tracking-wider text-gray-800 line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Price</p>
            <p className="font-semibold text-lg text-gray-900">$ {product.price}</p>
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
    <Button
      size="icon"
      className={cn(
        "rounded-full bg-red-500 hover:bg-red-600 h-12 w-12 text-white shadow-md",
        className,
      )}
      {...rest as any}
    >
      <ShoppingCart className="size-5 fill-white" />
    </Button>
  );
}
export default ProductsItem;
