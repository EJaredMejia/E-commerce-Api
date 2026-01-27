import { db } from "@/db/drizzle";
import { products, productImgs } from "@root/drizzle/schema"; // Adjust paths to your schema
import { eq, sql } from "drizzle-orm";
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
        // JSON Aggregation for the product images
        productImgs: sql<Array<{ id: number; imgUrl: string }>>`
          COALESCE(
            json_agg(
              json_build_object(
                'id', ${productImgs.id},
                'imgUrl', ${productImgs.imgUrl}
              )
            ) FILTER (WHERE ${productImgs.id} IS NOT NULL), 
            '[]'
          )`.as("productImgs"),
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
