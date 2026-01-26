import {
  useAddCartProductMutation,
  useUpdateCartMutation,
} from "@/features/cart/hooks/cart.hooks";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";
import type { Product } from "@/features/products/types/products.types";
import { useAppStore } from "@/store/app.store";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

interface ProductsItemsProps {
  product: Product;
}

const ProductsItem = ({ product }: ProductsItemsProps) => {
  const navigate = useNavigate();
  const setIsMessage = useAppStore((state) => state.setIsMessage);

  const { data: shoppingCart } = useSuspenseQuery(getCartQueryOptions());

  const { mutate: addProductCart } = useAddCartProductMutation();
  const { mutate: updateCart } = useUpdateCartMutation();

  function unAuthorized() {
    setIsMessage("You need to be login to add products to the cart");
    navigate({ to: "/login" });
  }
  const addProductToCart = () => {
    const storageUser = localStorage.getItem("user");

    if (!storageUser) {
      unAuthorized();
      return;
    }

    const user = JSON.parse(storageUser) as { token: string };

    if (!user) {
      unAuthorized();
      return;
    }

    let isProductAllreadyInCart = false;

    if (!shoppingCart || shoppingCart.length <= 0) {
      const newProductCart = {
        productId: product.id,
        quantity: 1,
      };
      addProductCart(newProductCart);

      return;
    }

    shoppingCart?.find((productShop) => {
      if (productShop.product.id === product.id) {
        isProductAllreadyInCart = true;
        const newProductCart = {
          productId: product.id,
          newQty: productShop.quantity + 1,
        };
        updateCart(newProductCart);

        return true;
      }
    });

    if (isProductAllreadyInCart === false) {
      const newProductCart = {
        productId: product.id,
        quantity: 1,
      };
      addProductCart(newProductCart);
    }
  };

  return (
    <li className="rounded-xl border border-gray-300 pt-5">
      <Link
        to={`/product/$id`}
        params={{ id: product.id }}
        className="w-full cursor-pointer border-b border-gray-300 pb-5 sm:h-50"
      >
        <img
          className={`mx-auto max-h-[250px] w-40 contain-layout sm:h-40 sm:w-fit sm:px-2 md:h-48`}
          src={product.productImgs[0]?.imgUrl}
          alt="product image"
          style={{
            viewTransitionName: `product-image-${product.id}`,
          }}
        />
      </Link>
      <div className="h-42 p-5">
        <h3 className="mb-4 ml-4 font-bold tracking-wider">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Price</p>
            <p className="ml-4 font-semibold">$ {product.price}</p>
          </div>

          <button
            onClick={addProductToCart}
            className="block w-fit cursor-pointer rounded-full bg-red-500 p-4 text-gray-100"
          >
            <ShoppingCart className="size-5 fill-white" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductsItem;
