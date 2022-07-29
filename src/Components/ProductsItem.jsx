import React from "react";

const ProductsItem = ({ product }) => {
  console.log(product);
  return (
    <li className="border pt-5 border-gray-300 rounded-xl">
      <div className="w-full sm:h-50 border-b border-gray-300 pb-5">
        <img
          className="mx-auto w-40 max-h-[250px] sm:px-2 sm:w-fit sm:h-40 md:h-[12rem]"
          src={product.productImgs[0]}
          alt="product image"
        />
      </div>
      <div className="p-5 h-[10.5rem]">
        <h3 className="font-bold ml-4 tracking-wider mb-4">{product.title}</h3>
        <p className="text-gray-400">Price</p>
        <p className="font-semibold ml-4">$ {product.price}</p>
        <div className="relative top-[-3rem]">
          <i className="fa-solid block p-4 py-3 text-lg bg-red-500 text-gray-100 rounded-full w-fit ml-auto text-end fa-cart-shopping"></i>
        </div>
      </div>
    </li>
  );
};

export default ProductsItem;
