import { jsonAgg, jsonBuildObject } from "@/db/db.utils";
import { db } from "@/db/drizzle";
import { authMiddleware } from "@/features/auth/middleware/auth.middleware";
import { carts, orders, productInCarts, products } from "@root/drizzle/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, isNotNull } from "drizzle-orm";

export const getUserPurchases = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userId = context.user.id;

    const ordersItems = await db
      .select({
        id: orders.id,
        total: orders.totalPrice,
        createdAt: orders.createdAt,
        status: orders.status,
        cart: {
          id: carts.id,
          productInCarts: jsonAgg({
            columnsMap: {
              id: productInCarts.id,
              quantity: productInCarts.quantity,
              productId: productInCarts.productId,
              product: jsonBuildObject({
                id: products.id,
                title: products.title,
                price: products.price,
              }),
            },
            filter: isNotNull(productInCarts.id),
          }),
        },
      })
      .from(orders)
      .innerJoin(carts, eq(carts.id, orders.cartId))
      .innerJoin(productInCarts, eq(productInCarts.cartId, carts.id))
      .innerJoin(products, eq(products.id, productInCarts.productId))
      .where(eq(orders.userId, userId))
      .groupBy(orders.id, carts.id);

    return ordersItems;
  });
