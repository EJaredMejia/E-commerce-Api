import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import {
  ArrowLeft,
  ArrowRight,
  Circle,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import {
  useAddCartProductMutation,
  useUpdateCartMutation,
} from "@/features/cart/hooks/cart.hooks";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";
import { useAppStore } from "@/store/app.store";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { getLocalStorageUser } from "../../../utils/storage";
import ProductsItem from "./products-item";

const ProductDetail = () => {
  const { data: shoppingCart } = useSuspenseQuery(getCartQueryOptions());

  const navigate = useNavigate();
  const setIsMessage = useAppStore((state) => state.setIsMessage);
  const { id } = useParams({ from: "/product/$id" });
  const { data: allProducts } = useSuspenseQuery(getProductsQueryOptions());

  const { mutate: addProductCart } = useAddCartProductMutation();
  const { mutate: updateCart } = useUpdateCartMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, _] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const product = allProducts?.find(
    (productItem) => Number(productItem.id) === Number(id),
  );
  const currentImages = product?.productImgs?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const minusQuantity = () => {
    if (quantityProducts !== 1) {
      setQuantityProducts(quantityProducts - 1);
    }
  };

  const plusQuantity = () => {
    setQuantityProducts(quantityProducts + 1);
  };

  const addToCart = () => {
    const user = getLocalStorageUser();

    if (!user) {
      setIsMessage("You need to be login to add products to the cart");
      navigate({ to: "/login" });
      return;
    }
    let isProductAllreadyInCart = false;
    const idProduct = Number(id);
    shoppingCart?.find((product) => {
      // TODO is this a bug?
      console.log({ product, idProduct });
      if (product.product.id === idProduct) {
        isProductAllreadyInCart = true;
        const newProductCart = {
          productId: product.product.id,
          newQty: quantityProducts,
        };
        updateCart(newProductCart);

        return true;
      }
    });
    if (!isProductAllreadyInCart) {
      const newProductCart = {
        productId: idProduct,
        quantity: quantityProducts,
      };
      addProductCart(newProductCart);
    }
  };

  return (
    <div className="relative top-20 mx-auto w-11/12 max-w-[540px] pb-12 text-gray-600 md:top-28 md:grid md:max-w-[900px] md:grid-cols-2 md:gap-8 lg:max-w-[1300px]">
      <section>
        <div className="flex items-center gap-3 text-sm">
          <h4 className="cursor-pointer" onClick={() => navigate({ to: "/" })}>
            Home
          </h4>
          <Circle className="text-red-500" fill="currentColor" size={8} />
          <b>{product?.title}</b>
        </div>
        <ul className="relative top-12 flex items-center justify-between gap-1 md:justify-center lg:justify-evenly">
          <li>
            <ArrowLeft
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1);
                } else {
                  setCurrentPage(product?.productImgs?.length || 1);
                }
              }}
              className="box-content cursor-pointer rounded-full bg-red-500 p-2 text-white"
              size={20}
            />
          </li>
          {currentImages?.map((img) => (
            <li key={img.imgUrl}>
              <img
                style={{
                  viewTransitionName: `product-image-${product?.id}`,
                }}
                className="h-52 w-52 object-contain contain-layout sm:h-80 sm:w-[20rem]"
                src={img.imgUrl}
              />
            </li>
          ))}
          <li>
            <ArrowRight
              onClick={() => {
                if (currentPage !== product?.productImgs?.length) {
                  setCurrentPage(currentPage + 1);
                } else {
                  setCurrentPage(1);
                }
              }}
              className="box-content cursor-pointer rounded-full bg-red-500 p-2 text-white"
              size={20}
            />
          </li>
        </ul>
        <ul className="mt-20 hidden items-center justify-center gap-4 lg:flex">
          {product?.productImgs?.map((img, i) => (
            <div
              key={img.imgUrl}
              className="cursor-pointer rounded-md p-1"
              onClick={() => setCurrentPage(i + 1)}
              style={{
                border: i + 1 === currentPage ? "2px red solid" : undefined,
              }}
            >
              <img
                className="h-16 w-16 object-contain"
                src={img.imgUrl}
                alt=""
              />
            </div>
          ))}
        </ul>
      </section>
      <section className="relative top-20">
        <h3 className="ml-6 text-xl">
          <b>{product?.title}</b>
        </h3>
        <div className="mt-6 grid grid-cols-2">
          <h6 className="order-1 text-gray-400">Price</h6>
          <p className="order-3 mt-2 ml-6 text-lg">
            <b>$ {(product?.price || 0) * quantityProducts}</b>
          </p>
          <h6 className="order-2 text-gray-400">Quantity</h6>
          <div className="order-4 mt-2 grid w-32 grid-cols-3 items-center justify-items-center border border-gray-300 text-base">
            <p
              onClick={minusQuantity}
              className="flex h-full w-full cursor-pointer items-center justify-center active:bg-teal-300"
            >
              <Minus size={16} />
            </p>
            <p className="w-full border-r border-l border-gray-300 text-center">
              {quantityProducts}
            </p>
            <p
              onClick={plusQuantity}
              className="flex h-full w-full cursor-pointer items-center justify-center active:bg-teal-300"
            >
              <Plus size={16} />
            </p>
          </div>
        </div>
        <div className="md:grid">
          <button
            onClick={addToCart}
            className="mt-10 flex w-full cursor-pointer items-center justify-center gap-3 bg-red-500 px-3 py-4 text-white md:order-2"
          >
            Add to cart <ShoppingCart size={20} />
          </button>
          <p className="mt-12 text-base leading-6 md:order-1">
            {product?.description}
          </p>
        </div>
      </section>
      <section style={{ gridColumn: "1/3" }} className="mt-28 lg:mt-8">
        <h3 className="text-lg text-red-500">
          <b>Discover similar items</b>
        </h3>
        <ul>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10">
            {allProducts
              ?.filter((productItem) => {
                if (productItem.id === product?.id) {
                  return false;
                }
                return productItem?.categoryId === product?.categoryId;
              })
              .map((productItem) => (
                <ProductsItem product={productItem} key={productItem.id} />
              ))}
          </ul>
        </ul>
      </section>
    </div>
  );
};

export default ProductDetail;
