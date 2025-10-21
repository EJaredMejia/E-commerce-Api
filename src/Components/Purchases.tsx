import { useNavigate } from "react-router";
import { useGetPurchasesQuery } from "../store/slices/purchases.slice";
import AnimatedPage from "./AnimatedPage";
import PurchasesItem from "./PurchasesItem";

const Purchases = () => {
  const navigate = useNavigate();

  const { data } = useGetPurchasesQuery();

  const purchases = data?.data.orders ?? [];

  document.body.style.paddingBottom = "400px";

  const sortArray = [...purchases];

  sortArray
    .sort((a, b) => {
      return (
        parseInt(
          a.createdAt.slice(0, a.createdAt.search("T")).replace(/-/g, "")
        ) -
        parseInt(
          b.createdAt.slice(0, b.createdAt.search("T")).replace(/-/g, "")
        )
      );
    })
    .reverse();

  return (
    <AnimatedPage>
      <section className="relative top-20 w-11/12 max-w-[600px] mx-auto md:max-w-[1000px] md:top-28">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <h4
            className="cursor-pointer text-gray-600"
            onClick={() => navigate("/")}
          >
            Home
          </h4>
          <i className="fa-solid fa-circle text-red-500 text-xs "></i>
          <b>purchases</b>
        </div>
        <h2 className="font-bold text-xl tracking-wide text-gray-600 mt-5">
          My purchases
        </h2>
        <ul className="mt-8 grid gap-5 ">
          {sortArray.map((purchase) => (
            <PurchasesItem key={purchase.id} purchase={purchase} />
          ))}
        </ul>
      </section>
    </AnimatedPage>
  );
};

export default Purchases;
