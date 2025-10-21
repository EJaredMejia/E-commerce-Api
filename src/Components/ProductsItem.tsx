import { useGetCart } from "@/hooks/cart.hooks";
import { useAppDispatch } from "@/store";
import type { Product } from "@/store/slices/products.slice";
import { useNavigate } from "react-router";
import {
  useAddCartProductMutation,
  useUpdateCartMutation,
} from "../store/slices/cart.slice";
import { setIsMessage } from "../store/slices/isLoading.slice";

interface ProductsItemsProps {
  product: Product;
}
const ProductsItem = ({ product }: ProductsItemsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: shoppingCart } = useGetCart();

  const [addProductCart] = useAddCartProductMutation();
  const [updateCart] = useUpdateCartMutation();

  function unAuthorized() {
    dispatch(setIsMessage("You need to be login to add products to the cart"));
    navigate("/login");
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

    if (shoppingCart.length <= 0) {
      const newProductCart = {
        productId: product.id,
        quantity: 1,
      };
      addProductCart(newProductCart);

      return;
    }

    shoppingCart.find((productShop) => {
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

  const navigateToProductDetail = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <li className="border pt-5 border-gray-300 rounded-xl">
      <div
        onClick={navigateToProductDetail}
        className="cursor-pointer w-full sm:h-50 border-b border-gray-300 pb-5"
      >
        <img
          className={`mx-auto w-40 max-h-[250px] sm:px-2 sm:w-fit sm:h-40 md:h-48 `}
          src={product.productImgs[0]?.imgUrl}
          alt="product image"
        />
      </div>
      <div className="p-5 h-42">
        <h3 className="font-bold ml-4 tracking-wider mb-4">{product.title}</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">Price</p>
            <p className="font-semibold ml-4">$ {product.price}</p>
          </div>
          <div className="">
            <i
              onClick={addProductToCart}
              className="cursor-pointer fa-solid block p-4 text-lg bg-red-500 text-gray-100 rounded-full w-fit fa-cart-shopping"
            ></i>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductsItem;
