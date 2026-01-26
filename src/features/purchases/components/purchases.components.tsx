import { getPurchasesQueryOptions } from "@/features/purchases/queries/purchases.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Circle } from "lucide-react";
import PurchasesItem from "./purchases-item.components";

const Purchases = () => {
  const navigate = useNavigate();

  const { data: purchases = [] } = useSuspenseQuery(getPurchasesQueryOptions());

  const sortArray = [...purchases];

  sortArray
    .sort((a, b) => {
      return (
        parseInt(
          a.createdAt.slice(0, a.createdAt.search("T")).replace(/-/g, ""),
        ) -
        parseInt(
          b.createdAt.slice(0, b.createdAt.search("T")).replace(/-/g, ""),
        )
      );
    })
    .reverse();

  return (
    <section className="relative top-20 mx-auto w-11/12 max-w-[600px] pb-12 md:top-28 md:max-w-[1000px]">
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <h4
          className="cursor-pointer text-gray-600"
          onClick={() => navigate({ to: "/" })}
        >
          Home
        </h4>
        <Circle className="text-red-500" fill="currentColor" size={8} />
        <b>purchases</b>
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-wide text-gray-600">
        My purchases
      </h2>
      <ul className="mt-8 grid gap-5">
        {sortArray.map((purchase) => (
          <PurchasesItem key={purchase.id} purchase={purchase} />
        ))}
      </ul>
    </section>
  );
};

export default Purchases;
