import { jsonAgg } from "@/db/db.utils";
import { db } from "@/db/drizzle";
import { products, productImgs } from "@root/drizzle/schema"; // Adjust paths to your schema
import { eq, isNotNull } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";

export const getAllProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const productsItems = await db
      .select({
        id: products.id,
        categoryId: products.categoryId,
        title: products.title,
        price: products.price,
        description: products.description,
        // JSON Aggregation for the product images using helpers
        productImgs: jsonAgg({
          columnsMap: {
            id: productImgs.id,
            imgUrl: productImgs.imgUrl,
          },
          filter: isNotNull(productImgs.id),
        }),
      })
      .from(products)
      .leftJoin(productImgs, eq(products.id, productImgs.productId))
      .where(eq(products.status, "active"))
      .groupBy(products.id)
      .$withCache({
        config: {
          // 24 hours - data almost never changes
          ex: 60 * 60 * 24,
        },
      });

    return productsItems;
  },
);
