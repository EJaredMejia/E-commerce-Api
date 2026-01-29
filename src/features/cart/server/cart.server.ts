import { jsonAgg } from "@/db/db.utils";
import { db } from "@/db/drizzle";
import { authMiddleware } from "@/features/auth/middleware/auth.middleware";
import {
  carts,
  productImgs,
  productInCarts,
  products,
} from "@root/drizzle/schema";
import { createServerFn } from "@tanstack/react-start";
import { and, eq, isNotNull } from "drizzle-orm";

export const getCartProductsUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { user } = context;

    const [cart] = await db
      .select({
        id: carts.id,
      })
      .from(carts)
      .where(and(eq(carts.userId, user.id), eq(carts.status, "active")))
      .limit(1);

    if (!cart) {
      return [];
    }

    const productsInCart = await db
      .select({
        id: productInCarts.id,
        quantity: productInCarts.quantity,
        product: {
          id: products.id,
          title: products.title,
          price: products.price,
          imgs: jsonAgg({
            columnsMap: {
              id: productImgs.id,
              url: productImgs.imgUrl,
            },
            filter: isNotNull(productImgs.id),
          }),
        },
      })
      .from(productInCarts)
      .innerJoin(products, eq(products.id, productInCarts.productId))
      .leftJoin(productImgs, eq(productImgs.productId, products.id))
      .where(
        and(
          eq(productInCarts.cartId, cart.id),
          eq(productInCarts.status, "active"),
        ),
      )
      .groupBy(
        productInCarts.id,
        productInCarts.quantity,
        products.id,
        products.quantity,
      );

    return productsInCart;
  });
