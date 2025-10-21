import { useGetCart } from "@/hooks/cart.hooks";
import { useAppDispatch } from "@/store";
import {
  useAddCartProductMutation,
  useUpdateCartMutation,
} from "@/store/slices/cart.slice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { setIsMessage } from "../store/slices/isLoading.slice";
import { useGetProductsQuery } from "../store/slices/products.slice";
import AnimatedPage from "./AnimatedPage";
import ProductsItem from "./ProductsItem";
import { getLocalStorageUser } from "./utils/storage";

const ProductDetail = () => {
  const { data: shoppingCart } = useGetCart();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  document.body.style.paddingBottom = "400px";

  const { data } = useGetProductsQuery();

  const [addProductCart] = useAddCartProductMutation();
  const [updateCart] = useUpdateCartMutation();

  const allProducts = data?.data.products;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, _] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const product = allProducts?.find(
    (productItem) => Number(productItem.id) === Number(id)
  );
  const currentImages = product?.productImgs?.slice(
    indexOfFirstItem,
    indexOfLastItem
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
      dispatch(
        setIsMessage("You need to be login to add products to the cart")
      );
      navigate("/login");
      return;
    }
    let isProductAllreadyInCart = false;
    const idProduct = Number(id);
    shoppingCart.find((product) => {
      // TODO is this a bug?
      console.log({ product, idProduct });
      if (product.id === idProduct) {
        isProductAllreadyInCart = true;
        const newProductCart = {
          productId: idProduct,
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
    <AnimatedPage>
      <section className="relative top-20 text-gray-600 mx-auto w-11/12 max-w-[540px] md:max-w-[900px] md:gap-8 md:grid md:grid-cols-2 md:top-28 lg:max-w-[1300px]">
        <section>
          <div className="flex items-center gap-3 text-sm">
            <h4 className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </h4>
            <i className="fa-solid fa-circle text-red-500 text-xs"></i>
            <b>{product?.title}</b>
          </div>
          <ul className="relative top-12 gap-1 flex items-center justify-between md:justify-center lg:justify-evenly">
            <li>
              <i
                onClick={() => {
                  if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                  } else {
                    setCurrentPage(product?.productImgs?.length || 1);
                  }
                }}
                className="cursor-pointer fa-solid fa-arrow-left text-white bg-red-500 rounded-full p-3"
              ></i>
            </li>
            {currentImages?.map((img) => (
              <li key={img.imgUrl}>
                <img
                  className="w-52 h-52 sm:w-[20rem] sm:h-80 object-contain"
                  src={img.imgUrl}
                ></img>
              </li>
            ))}
            <li>
              <i
                onClick={() => {
                  if (currentPage !== product?.productImgs?.length) {
                    setCurrentPage(currentPage + 1);
                  } else {
                    setCurrentPage(1);
                  }
                }}
                className="cursor-pointer fa-solid fa-arrow-right text-white bg-red-500 rounded-full p-3"
              ></i>
            </li>
          </ul>
          <ul className="hidden lg:flex mt-20 justify-center items-center gap-4">
            {product?.productImgs?.map((img, i) => (
              <div
                key={img.imgUrl}
                className="cursor-pointer p-1 rounded-md"
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  border: i + 1 === currentPage ? "2px red solid" : undefined,
                }}
              >
                <img
                  className="w-16 h-16 object-contain"
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
            <h6 className="text-gray-400 order-1">Price</h6>
            <p className="ml-6 mt-2 text-lg order-3">
              <b>$ {(product?.price || 0) * quantityProducts}</b>
            </p>
            <h6 className="text-gray-400 order-2">Quantity</h6>
            <div className="mt-2 text-base border border-gray-300 items-center w-32 justify-items-center order-4 grid grid-cols-3">
              <p
                onClick={minusQuantity}
                className="cursor-pointer w-full flex justify-center items-center active:bg-teal-300 h-full"
              >
                <i className="fa-solid fa-minus"></i>
              </p>
              <p className="border-r  border-l w-full text-center border-gray-300">
                {quantityProducts}
              </p>
              <p
                onClick={plusQuantity}
                className="cursor-pointer w-full flex justify-center items-center active:bg-teal-300 h-full"
              >
                <i className="fa-solid fa-plus"></i>
              </p>
            </div>
          </div>
          <div className="md:grid">
            <button
              onClick={addToCart}
              className="cursor-pointer w-full py-4 px-3 bg-red-500 text-white mt-10 flex gap-3 justify-center items-center md:order-2"
            >
              Add to cart <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <p className="text-base mt-12 leading-6 md:order-1">
              {product?.description}
            </p>
          </div>
        </section>
        <section style={{ gridColumn: "1/3" }} className="mt-28 lg:mt-8">
          <h3 className="text-red-500 text-lg">
            <b>Discover similar items</b>
          </h3>
          <ul>
            <ul className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10 ">
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
      </section>
    </AnimatedPage>
  );
};

export default ProductDetail;
