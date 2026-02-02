import { useCurrentUserQuery } from "@/features/auth/hooks/auth.hooks";
import {
  useAddCartProductMutation,
  useCartUserSuspenseQuery,
  useUpdateCartMutation,
} from "@/features/cart/hooks/cart.hooks";
import { useNavigate } from "@tanstack/react-router";

interface useAddProductToCartParams {
  productId: number;
  quantity?: number;
}
export function useAddProductToCart({
  productId,
  quantity,
}: useAddProductToCartParams) {
  const quantityProducts = quantity === 0 ? 1 : quantity;
  const { data: user } = useCurrentUserQuery();
  const { data: shoppingCart } = useCartUserSuspenseQuery();

  const { mutate: addProductCart } = useAddCartProductMutation();
  const { mutate: updateCart } = useUpdateCartMutation();

  const navigate = useNavigate();

  function addToCart() {
    if (!user) {
      navigate({
        to: "/login",
        search: {
          message: "You need to be login to add products to the cart",
        },
      });
      return;
    }

    const idProduct = productId;
    const productInCart = shoppingCart?.find((product) => {
      return product.product.id === idProduct;
    });

    if (productInCart) {
      const newProductCart = {
        productId: productInCart.product.id,
        newQty: quantityProducts ?? productInCart.quantity + 1,
      };
      updateCart(newProductCart);
      return;
    }

    const newProductCart = {
      productId: idProduct,
      quantity: quantityProducts ?? 1,
    };
    addProductCart(newProductCart);
  }

  return addToCart;
}
