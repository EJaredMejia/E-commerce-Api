import type { Purchase } from "@/store/slices/purchases.slice";

interface PurchasesItemProps {
  purchase: Purchase;
}
const PurchasesItem = ({ purchase }: PurchasesItemProps) => {
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
      {purchase.cart.productInCarts.length > 0 && (
        <li className="rounded-lg border border-gray-300">
          <h3 className="p-3 border-b border-gray-300 font-semibold text-gray-700">
            {months[Number(arrayDate[1]) - 1]} {arrayDate[2]}, {arrayDate[0]}
          </h3>
          <div className="p-7 text-sm mx-auto text-gray-600 sm:w-100 md:w-136">
            {purchase.cart.productInCarts.map((product) => (
              <div
                className="gap-y-7 my-2 grid grid-cols-3 justify-items-end items-center"
                key={product.id}
              >
                <p>{product.product.title}</p>
                <p className="border border-gray-300 w-12 flex justify-center items-center py-1 px-6">
                  {product.quantity}
                </p>
                <p>$ {product.product.price}</p>
              </div>
            ))}
          </div>
        </li>
      )}
    </>
  );
};

export default PurchasesItem;
