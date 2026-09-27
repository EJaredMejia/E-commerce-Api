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
import { CheckoutModal } from "../../cart/components/checkout-modal.components";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@root/components/ui/sheet";
import { Button } from "@root/components/ui/button";

interface CartSideBarProps {
  isCartVisible: boolean;
  setIsCartVisible: (value: boolean) => void;
}

export function CartSideBar({
  isCartVisible,
  setIsCartVisible,
}: CartSideBarProps) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  function closeCheckoutModal() {
    setIsCheckoutModalOpen(false);
  }

  return (
    <Sheet open={isCartVisible} onOpenChange={setIsCartVisible}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 border-none shadow-2xl">
        <SheetHeader className="px-6 py-5 border-b border-gray-200">
          <SheetTitle className="text-xl font-bold text-gray-700">Shopping cart</SheetTitle>
        </SheetHeader>

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
      </SheetContent>
    </Sheet>
  );
}

interface CartContentProps {
  setIsCartVisible: (value: boolean) => void;
  setIsCheckoutModalOpen: (value: boolean) => void;
}

function CartContent({
  setIsCartVisible,
  setIsCheckoutModalOpen,
}: CartContentProps) {
  const navigate = useNavigate();

  const { mutate: updateCart } = useUpdateCartMutation();
  const { mutate: deleteCartMutation } = useDeleteCartMutation();

  const { data: shoppingCart = [] } = useCartUserSuspenseQuery();

  const total = shoppingCart.reduce((acc, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  function minusQuantity(cart: Cart) {
    if (cart.quantity === 1) {
      deleteCartMutation(cart.id);
      return;
    }
    const newProductCart = {
      productId: cart.product.id,
      newQty: cart.quantity - 1,
    };
    updateCart(newProductCart);
  }

  function plusQuantity(cart: Cart) {
    const newProductCart = {
      productId: cart.product.id,
      newQty: cart.quantity + 1,
    };
    updateCart(newProductCart);
  }

  function deleteCart(id: number) {
    deleteCartMutation(id);
  }

  function checkoutClick() {
    if (shoppingCart.length > 0) {
      setIsCheckoutModalOpen(true);
      setIsCartVisible(false);
      return;
    }
    alert("The shopping cart is empty");
  }

  return (
    <>
      <ul className="flex-1 overflow-y-auto">
        {shoppingCart.map((cart) => (
          <li
            key={cart.id}
            onClick={() =>
              navigate({
                to: "/product/$id",
                params: { id: cart.product.id },
              })
            }
            className="cursor-pointer border-b border-gray-200 px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <p className="font-medium text-gray-800">{cart.product.title}</p>
                <p className="font-semibold whitespace-nowrap ml-4">$ {cart.product.price * cart.quantity}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Qty:</span>
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none rounded-l-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        minusQuantity(cart);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center text-sm">{cart.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none rounded-r-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        plusQuantity(cart);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCart(cart.product.id);
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 bg-white p-6 shadow-sm z-10">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 font-medium">Total</p>
          <p className="text-lg font-bold text-gray-900">$ {total.toFixed(2)}</p>
        </div>
        <Button
          onClick={checkoutClick}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg rounded-md"
        >
          Checkout
        </Button>
      </div>
    </>
  );
}
