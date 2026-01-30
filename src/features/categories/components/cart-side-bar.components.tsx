import { CartSkeleton } from "@/features/cart/components/cart-skeleton.components";
import {
  useCartUserSuspenseQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "@/features/cart/hooks/cart.hooks";
import type { Cart } from "@/features/cart/types/cart.types";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Suspense, useState } from "react";
import CheckoutModal from "../../cart/components/checkout-modal.components";

interface CartSideBarProps {
  isCartVisible: boolean;
  setIsCartVisible: (value: boolean) => void;
}

const CartSideBar = ({ isCartVisible, setIsCartVisible }: CartSideBarProps) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  return (
    <div
      className={`fixed right-0 z-50 block w-[20rem] ${
        isCartVisible ? "show-filters" : "hide-filters"
      } top-16 h-screen bg-white shadow-xl lg:top-18 lg:border`}
    >
      <h3 className="px-6 py-5 text-lg font-bold text-gray-700">
        Shopping cart
      </h3>
      <Suspense fallback={<CartSkeleton />}>
        <CartContent
          setIsCartVisible={setIsCartVisible}
          setIsCheckoutModalOpen={setIsCheckoutModalOpen}
        />
      </Suspense>
      <CheckoutModal
        isCheckoutModalOpen={isCheckoutModalOpen}
        closeCheckoutModal={closeCheckoutModal}
      />
    </div>
  );
};

interface CartContentProps {
  setIsCartVisible: (value: boolean) => void;
  setIsCheckoutModalOpen: (value: boolean) => void;
}

const CartContent = ({
  setIsCartVisible,
  setIsCheckoutModalOpen,
}: CartContentProps) => {
  const navigate = useNavigate();

  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: deleteCartMutation } = useDeleteCartMutation();

  const { data: shoppingCart = [] } = useCartUserSuspenseQuery();

  const total = shoppingCart.reduce((acc, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  const minusQuantity = (cart: Cart) => {
    if (cart.quantity === 1) {
      deleteCartMutation(cart.id);
      return;
    }

    const newProductCart = {
      productId: cart.product.id,
      newQty: cart.quantity - 1,
    };

    updateCart(newProductCart);
  };

  const plusQuantity = (cart: Cart) => {
    const newProductCart = {
      productId: cart.product.id,
      newQty: cart.quantity + 1,
    };
    updateCart(newProductCart);
  };

  const deleteCart = (id: number) => {
    deleteCartMutation(id);
  };

  const checkoutClick = () => {
    if (shoppingCart.length > 0) {
      setIsCheckoutModalOpen(true);
      setIsCartVisible(false);
      return;
    }

    alert("The shopping cart is empty");
  };

  return (
    <>
      <ul className="change-height mr-1">
        {shoppingCart.map((cart) => (
          <li
            onClick={() =>
              navigate({
                to: "/product/$id",
                params: { id: cart.product.id },
              })
            }
            className="cursor-pointer border-b-2 border-gray-300 px-5 py-1 hover:bg-slate-100 active:bg-slate-200"
          >
            <div>
              <p className="mb-2">{cart.product.title}</p>
              <p className="mb-2">$ {cart.product.price * cart.quantity}</p>
            </div>
            <div className="mb-2 flex items-center gap-5">
              <p>Quantity: </p>
              <div className="order-4 grid w-24 grid-cols-3 items-center justify-items-center border border-gray-300 text-base">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    minusQuantity(cart);
                  }}
                  className="flex h-full w-full cursor-pointer items-center justify-center active:bg-teal-300"
                >
                  <Minus size={16} />
                </button>
                <p className="w-full border-r border-l border-gray-300 text-center">
                  {cart.quantity}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    plusQuantity(cart);
                  }}
                  className="flex h-full w-full cursor-pointer items-center justify-center active:bg-teal-300"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCart(cart.product.id);
                }}
                className="order-5"
              >
                <Trash2
                  className="cursor-pointer text-red-500 hover:text-red-700 active:text-red-800"
                  size={20}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-20 flex w-[18rem] flex-col justify-end">
        <div className="border-t-2 border-gray-300 p-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Total: </p>
            <p className="font-bold">$ {total}</p>
          </div>
          <button
            onClick={checkoutClick}
            className="mt-8 w-full bg-red-500 p-2 text-center text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSideBar;
