import type { Purchase } from "@/features/purchases/types/purchases.types";

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

  return (
    <>
      {purchase.cart.productInCarts.length > 0 && (
        <li className="rounded-lg border border-gray-300">
          <h3 className="border-b border-gray-300 p-3 font-semibold text-gray-700">
            {months[Number(arrayDate[1]) - 1]} {arrayDate[2]}, {arrayDate[0]}
          </h3>
          <div className="mx-auto p-7 text-sm text-gray-600 sm:w-100 md:w-136">
            {purchase.cart.productInCarts.map((product) => (
              <div
                className="my-2 grid grid-cols-3 items-center justify-items-end gap-y-7"
                key={product.id}
              >
                <p>{product.product.title}</p>
                <p className="flex w-12 items-center justify-center border border-gray-300 px-6 py-1">
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
