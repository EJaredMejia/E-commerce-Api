import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, User, Package } from "lucide-react";
import { useAppStore } from "@/store/app.store";
import CartSideBar from "../features/categories/components/cart-side-bar.components";
import { getLocalStorageUser } from "../utils/storage";

const NavBar = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [userLocal, setUserLocal] = useState<any>(null);
  const setIsMessage = useAppStore((state) => state.setIsMessage);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorageUser();

    setUserLocal(user);
  }, []);

  const toogleCart = () => {
    if (userLocal) {
      setIsCartVisible(!isCartVisible);
    } else {
      setIsMessage("you need to log in to see your cart shop");
      navigate({ to: "/login" });
    }
  };

  const purchaseClick = () => {
    if (!userLocal) {
      setIsMessage("you need to log in to see your purchases");
    }
  };

  return (
    <nav className="fixed z-50 grid w-screen grid-cols-2 bg-white p-5 lg:items-center lg:border-b lg:border-gray-300 lg:py-0">
      <Link className="w-fit" to="/">
        <h1 className="text-xl font-bold tracking-wider text-red-500 sm:text-2xl lg:text-3xl">
          e-commerce
        </h1>
      </Link>
      <div className="flex gap-8 justify-self-end lg:gap-0">
        <Link
          to="/login"
          className="lg:border-l lg:border-gray-300 lg:px-16 lg:py-5"
        >
          <User className="size-8 text-red-500" />
        </Link>
        <Link
          to="/purchases"
          className="lg:border-l lg:border-gray-300 lg:px-16 lg:py-5"
        >
          <Package onClick={purchaseClick} className="size-8 text-red-500" />
        </Link>
        <button
          onClick={toogleCart}
          className="cursor-pointer lg:border-l lg:border-gray-300 lg:px-16 lg:py-5"
        >
          <ShoppingCart
            className={`${
              isCartVisible
                ? "fill-red-500 text-red-500"
                : "fill-gray-500 text-gray-500"
            } size-8`}
          />
        </button>
      </div>
      {userLocal && (
        <CartSideBar
          isCartVisible={isCartVisible}
          setIsCartVisible={setIsCartVisible}
        />
      )}
    </nav>
  );
};

export default NavBar;
