import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { getProductsThunk } from "../store/slices/products.slice";
import ProductsItem from "./ProductsItem";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);
  const allProducts = useSelector((state) => state.products);

  const [product, setProduct] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = product?.productImgs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const productToFind = allProducts.find(
      (productItem) => Number(productItem.id) === Number(id)
    );
    setProduct(productToFind);
  }, [allProducts, id]);

  const minusQuantity = () => {
    if (quantityProducts !== 1) {
      setQuantityProducts(quantityProducts - 1);
    }
  };

  const plusQuantity = () => {
    setQuantityProducts(quantityProducts + 1);
  };

  return (
    <section className="relative top-20 text-gray-600 mx-auto w-11/12 max-w-[540px] md:max-w-[900px] md:gap-8 md:grid md:grid-cols-2 md:top-28 lg:max-w-[1300px]">
      <section>
        <div className="flex items-center gap-3 text-sm">
          <h4 className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </h4>
          <i className="fa-solid fa-circle text-red-500 text-xs"></i>
          <b>{product?.title}</b>
        </div>
        <ul className="relative top-[3rem] gap-1 flex items-center justify-between md:justify-center lg:justify-evenly">
          <li>
            <i
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1);
                } else {
                  setCurrentPage(product?.productImgs?.length);
                }
              }}
              className="cursor-pointer fa-solid fa-arrow-left text-white bg-red-500 rounded-full p-3"
            ></i>
          </li>
          {currentImages?.map((img) => (
            <li key={img}>
              <img
                className="w-[13rem] h-[13rem] sm:w-[20rem] sm:h-[20rem] object-contain"
                src={img}
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
              className="cursor-pointer p-1 rounded-md"
              onClick={() => setCurrentPage(i + 1)}
              style={{ border: i + 1 === currentPage && "2px red solid" }}
            >
              <img
                className="w-[4rem] h-[4rem] object-contain"
                src={img}
                alt=""
              />
            </div>
          ))}
        </ul>
      </section>
      <section className="relative top-[5rem]">
        <h3 className="ml-6 text-xl">
          <b>{product?.title}</b>
        </h3>
        <div className="mt-6 grid grid-cols-2">
          <h6 className="text-gray-400 order-1">Price</h6>
          <p className="ml-6 mt-2 text-lg order-3">
            <b>$ {product?.price}</b>
          </p>
          <h6 className="text-gray-400 order-2">Quantity</h6>
          <div className="mt-2 text-base border border-gray-300 items-center w-[8rem] justify-items-center order-4 grid grid-cols-3">
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
          <button className="cursor-pointer w-full py-4 px-3 bg-red-500 text-white mt-10 flex gap-3 justify-center items-center md:order-2">
            Add to cart <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <p className="text-base mt-12 leading-6 md:order-1">
            {product?.description}
          </p>
        </div>
      </section>
      <section style={{ gridColumn: "1/3" }} className="mt-[7rem] lg:mt-[2rem]">
        <h3 className="text-red-500 text-lg">
          <b>Discover similar items</b>
        </h3>
        <ul>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-10 ">
            {allProducts
              .filter((productItem) => {
                return productItem.category?.id === product?.category?.id;
              })
              .map((productItem) => (
                <ProductsItem product={productItem} key={productItem.id} />
              ))}
          </ul>
        </ul>
      </section>
    </section>
  );
};

export default ProductDetail;
