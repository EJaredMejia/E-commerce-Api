import React from "react";

const PurchasesItem = ({ purchase }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const arrayDate = purchase.createdAt
    .slice(0, purchase.createdAt.search("T"))
    .split("-");

  /*   console.log(arrayDate); */

  return (
    <>
      {purchase.cart.products.length > 0 && (
        <li className="rounded-lg border border-gray-300">
          <h3 className="p-3 border-b border-gray-300 font-semibold text-gray-700">
            {months[parseInt(arrayDate[1] - 1)]} {parseInt(arrayDate[2])},{" "}
            {parseInt(arrayDate[0])}
          </h3>
          <div className="p-7 text-sm mx-auto text-gray-600  sm:w-[25rem] md:w-[34rem]">
            {purchase.cart.products.map((product) => (
              <div
                className="gap-y-7 my-2 grid grid-cols-3 justify-items-end items-center"
                key={product.id}
              >
                <p>{product.title}</p>
                <p className="border border-gray-300 w-[3rem] flex justify-center items-center py-1 px-6">
                  {product.quantity}
                </p>
                <p>$ {product.price}</p>
              </div>
            ))}
          </div>
        </li>
      )}
    </>
  );
};

export default PurchasesItem;
