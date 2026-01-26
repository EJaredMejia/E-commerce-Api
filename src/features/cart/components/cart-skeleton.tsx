import { Minus, Plus, Trash2 } from "lucide-react";

export const CartSkeleton = () => {
  return (
    <ul className="change-height mr-1">
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          className="cursor-pointer border-b-2 border-gray-300 px-5 py-5 hover:bg-slate-100"
        >
          <div>
            <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-2 h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mb-2 flex items-center gap-5">
            <p>Quantity: </p>
            <div className="order-4 grid w-24 grid-cols-3 items-center justify-items-center border border-gray-300 text-base">
              <div className="flex h-full w-full items-center justify-center text-gray-300">
                <Minus size={16} />
              </div>
              <div className="w-full text-center">1</div>
              <div className="h-full w-full items-center justify-center text-gray-300">
                <Plus size={16} />
              </div>
            </div>
            <div className="order-5">
              <Trash2 className="text-gray-200" size={20} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
