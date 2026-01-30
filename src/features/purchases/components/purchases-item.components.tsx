import type { getUserPurchases } from "../server/purchases.server";

interface PurchasesItemProps {
  purchase: Awaited<ReturnType<typeof getUserPurchases>>[number];
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
  return (
    <>
      {purchase.cart.productInCarts.length > 0 && (
        <li className="rounded-lg border border-gray-300">
          <h3 className="border-b border-gray-300 p-3 font-semibold text-gray-700">
            {months[purchase.createdAt.getMonth()]}{" "}
            {purchase.createdAt.getDate()}, {purchase.createdAt.getFullYear()}
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
