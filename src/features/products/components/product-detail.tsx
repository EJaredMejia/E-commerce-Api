import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import {
  ArrowLeft,
  ArrowRight,
  Circle,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { cn } from "@/utils/cn.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState, type ComponentProps } from "react";
import { useAddProductToCart } from "../hooks/products.hooks";
import { getAllProducts } from "../server/products.server";
import ProductsItem from "./products-item";
import { Button } from "@root/components/ui/button";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_layout/product/$id" });
  const queryFn = useServerFn(getAllProducts);
  const { data: allProducts } = useSuspenseQuery(
    getProductsQueryOptions(queryFn),
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, _] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const product = allProducts?.find(
    (productItem) => Number(productItem.id) === Number(id),
  );
  const currentImages = product?.productImgs?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const minusQuantity = () => {
    if (quantityProducts !== 1) {
      setQuantityProducts(quantityProducts - 1);
    }
  };

  const plusQuantity = () => {
    setQuantityProducts(quantityProducts + 1);
  };

  return (
    <div className="relative mx-auto w-11/12 max-w-[540px] px-6 py-8 pb-12 text-gray-600 md:grid md:max-w-[900px] md:grid-cols-2 md:gap-8 lg:max-w-[1300px]">
      <section>
        <div className="flex items-center gap-3 text-sm">
          <h4
            className="cursor-pointer hover:underline"
            onClick={() => navigate({ to: "/" })}
          >
            Home
          </h4>
          <Circle className="text-red-500" fill="currentColor" size={8} />
          <b>{product?.title}</b>
        </div>
        <ul className="relative top-12 flex items-center justify-between gap-1 md:justify-center lg:justify-evenly">
          <li>
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1);
                } else {
                  setCurrentPage(product?.productImgs?.length || 1);
                }
              }}
              className="rounded-full bg-red-500 hover:bg-red-600"
            >
              <ArrowLeft size={20} />
            </Button>
          </li>
          {currentImages?.map((img) => (
            <li key={img.imgUrl}>
              <img
                style={{
                  viewTransitionName: `product-image-${product?.id}`,
                }}
                className="h-52 w-52 object-contain contain-layout sm:h-80 sm:w-[20rem]"
                src={img.imgUrl}
              />
            </li>
          ))}
          <li>
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                if (currentPage !== product?.productImgs?.length) {
                  setCurrentPage(currentPage + 1);
                } else {
                  setCurrentPage(1);
                }
              }}
              className="rounded-full bg-red-500 hover:bg-red-600"
            >
              <ArrowRight size={20} />
            </Button>
          </li>
        </ul>
        <ul className="mt-20 hidden items-center justify-center gap-4 lg:flex">
          {product?.productImgs?.map((img, i) => (
            <div
              key={img.imgUrl}
              className={
                "cursor-pointer rounded-md p-1 transition-all hover:outline-2 hover:outline-red-500"
              }
              onClick={() => setCurrentPage(i + 1)}
              style={{
                outline: i + 1 === currentPage ? "2px red solid" : undefined,
              }}
            >
              <img
                className="h-16 w-16 object-contain"
                src={img.imgUrl}
                alt=""
              />
            </div>
          ))}
        </ul>
      </section>
      <section className="relative top-20">
        <h3 className="text-2xl font-bold text-gray-800">{product?.title}</h3>
        <div className="mt-8 grid grid-cols-2 items-center gap-y-4">
          <h6 className="font-medium text-gray-500">Price</h6>
          <p className="text-xl font-bold text-gray-900">
            $ {(product?.price || 0) * quantityProducts}
          </p>
          <h6 className="font-medium text-gray-500">Quantity</h6>
          <div className="flex w-32 items-center rounded-md border border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={minusQuantity}
              className="h-10 w-10 rounded-none rounded-l-md hover:bg-gray-100"
            >
              <Minus size={16} />
            </Button>
            <p className="flex h-10 w-full items-center justify-center border-x border-gray-200 text-center font-medium text-gray-700">
              {quantityProducts}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={plusQuantity}
              className="h-10 w-10 rounded-none rounded-r-md hover:bg-gray-100"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <div className="mt-8 md:grid">
          <Suspense fallback={<ButtonAdd disabled />}>
            <ButtonAddToCart quantityProducts={quantityProducts} />
          </Suspense>
          <p className="mt-8 text-base leading-relaxed text-gray-600 md:order-1">
            {product?.description}
          </p>
        </div>
      </section>
      <section style={{ gridColumn: "1/3" }} className="mt-28 lg:mt-16">
        <h3 className="mb-8 text-xl font-bold text-red-500">
          Discover similar items
        </h3>
        <ul className="grid gap-10 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-10">
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
      </section>
    </div>
  );
};

function ButtonAddToCart({ quantityProducts }: { quantityProducts: number }) {
  const { id } = useParams({ from: "/_layout/product/$id" });
  const addToCart = useAddProductToCart({
    productId: id,
    quantity: quantityProducts,
  });

  return <ButtonAdd onClick={addToCart} />;
}

function ButtonAdd({
  className,
  ...rest
}: Omit<ComponentProps<"button">, "children">) {
  return (
    <Button
      className={cn(
        "mt-4 h-12 w-full gap-2 bg-red-500 text-lg text-white hover:bg-red-600 md:order-2",
        className,
      )}
      {...(rest as any)}
    >
      Add to cart <ShoppingCart size={20} />
    </Button>
  );
}

export default ProductDetail;
