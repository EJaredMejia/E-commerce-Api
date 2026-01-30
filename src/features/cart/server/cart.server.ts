import { jsonAgg } from "@/db/db.utils";
import { db } from "@/db/drizzle";
import { authMiddleware } from "@/features/auth/middleware/auth.middleware";
import {
  carts,
  orders,
  productImgs,
  productInCarts,
  products,
} from "@root/drizzle/schema";

import { createServerFn } from "@tanstack/react-start";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { z } from "zod";
import {
  getActiveCart,
  getOrCreateActiveCart,
} from "../services/cart.services";

export const getCartProductsUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { user } = context;

    const cart = await getActiveCart(user.id);

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

const addProductSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

export const addProductToCart = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(addProductSchema)
  .handler(async ({ data, context }) => {
    const { productId, quantity } = data;
    const { user } = context;

    // Verify product exists and has enough quantity
    const [product] = await db
      .select({
        id: products.id,
        quantity: products.quantity,
      })
      .from(products)
      .where(and(eq(products.id, productId), eq(products.status, "active")))
      .limit(1);

    if (!product) {
      throw Response.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.quantity < quantity) {
      throw Response.json(
        { error: "Insufficient product quantity" },
        { status: 409 },
      );
    }

    // Find or create active cart
    const cart = await getOrCreateActiveCart(user.id);

    // Check if product is already in the cart (active)
    const [productInCart] = await db
      .select()
      .from(productInCarts)
      .where(
        and(
          eq(productInCarts.cartId, cart.id),
          eq(productInCarts.productId, productId),
          eq(productInCarts.status, "active"),
        ),
      )
      .limit(1);

    if (productInCart) {
      throw Response.json(
        { error: "Product already exists in the cart" },
        { status: 400 },
      );
    }

    // Check if product was removed
    const [productInCartRemoved] = await db
      .select({
        id: productInCarts.id,
      })
      .from(productInCarts)
      .where(
        and(
          eq(productInCarts.cartId, cart.id),
          eq(productInCarts.productId, productId),
          eq(productInCarts.status, "removed"),
        ),
      )
      .limit(1);

    if (productInCartRemoved) {
      await db
        .update(productInCarts)
        .set({
          status: "active",
          quantity: quantity,
          updatedAt: new Date(),
        })
        .where(eq(productInCarts.id, productInCartRemoved.id));

      return { status: "success" };
    }

    // Create new entry
    await db.insert(productInCarts).values({
      cartId: cart.id,
      productId,
      quantity,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { status: "success" };
  });

const updateCartSchema = z.object({
  productId: z.number(),
  newQty: z.number().min(0),
});

export const updateCartProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(updateCartSchema)
  .handler(async ({ data, context }) => {
    const { productId, newQty } = data;
    const { user } = context;

    const cart = await getActiveCart(user.id);

    if (!cart) {
      throw Response.json({ error: "Cart not found" }, { status: 404 });
    }

    const [existingProduct] = await db
      .select({
        id: productInCarts.id,
      })
      .from(productInCarts)
      .where(
        and(
          eq(productInCarts.cartId, cart.id),
          eq(productInCarts.productId, productId),
          eq(productInCarts.status, "active"),
        ),
      )
      .limit(1);

    if (!existingProduct) {
      if (newQty === 0) return { status: "success" };

      throw Response.json(
        { error: "product in cart not found" },
        { status: 404 },
      );
    }

    const [updatedProduct] = await db
      .update(productInCarts)
      .set({
        quantity: newQty,
        status: newQty === 0 ? "removed" : "active",
        updatedAt: new Date(),
      })
      .where(eq(productInCarts.id, existingProduct.id))
      .returning({
        id: productInCarts.id,
      });

    return {
      status: "success",
      data: { updatedProduct },
    };
  });

const deleteCartSchema = z.object({
  productInCartId: z.number(),
});

export const deleteCartProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(deleteCartSchema)
  .handler(async ({ data, context }) => {
    const { productInCartId } = data;
    const { user } = context;

    const cart = await getActiveCart(user.id);

    if (!cart) {
      throw Response.json({ error: "Cart not found" }, { status: 404 });
    }

    const [existingProduct] = await db
      .select({
        id: productInCarts.id,
      })
      .from(productInCarts)
      .where(
        and(
          eq(productInCarts.id, productInCartId),
          eq(productInCarts.status, "active"),
        ),
      )
      .limit(1);

    if (!existingProduct) {
      throw Response.json(
        { error: "product in cart not found" },
        { status: 404 },
      );
    }

    await db
      .update(productInCarts)
      .set({
        quantity: 0,
        status: "removed",
        updatedAt: new Date(),
      })
      .where(eq(productInCarts.id, existingProduct.id));

    return { status: "success" };
  });

const purchaseCartSchema = z.object({
  street: z.string(),
  zipCode: z.string(),
  city: z.string(),
});

export const purchaseCartFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(purchaseCartSchema)
  .handler(async ({ context }) => {
    const { user } = context;

    const cart = await getActiveCart(user.id);

    if (!cart) {
      throw Response.json({ error: "Cart not found" }, { status: 404 });
    }
    debugger;

    const cartProducts = await db
      .select({
        id: productInCarts.id,
        quantity: productInCarts.quantity,
        product: {
          id: products.id,
          price: products.price,
          quantity: products.quantity,
        },
      })
      .from(productInCarts)
      .innerJoin(products, eq(products.id, productInCarts.productId))
      .where(
        and(
          eq(productInCarts.cartId, cart.id),
          eq(productInCarts.status, "active"),
        ),
      );

    if (cartProducts.length === 0) {
      throw Response.json(
        { error: "there is no products in the cart" },
        { status: 404 },
      );
    }

    await db.transaction(async (tx) => {
      let totalPrice = 0;
      const productsPromises = cartProducts.map(async (item) => {
        totalPrice += item.product.price * item.quantity;
        await tx
          .update(products)
          .set({
            quantity: item.product.quantity - item.quantity,
            updatedAt: new Date(),
          })
          .where(eq(products.id, item.product.id));
      });

      await Promise.all([
        ...productsPromises,
        tx
          .update(productInCarts)
          .set({ status: "purchased", updatedAt: new Date() })
          .where(
            inArray(
              productInCarts.id,
              cartProducts.map((item) => item.id),
            ),
          ),
        tx
          .update(carts)
          .set({
            status: "purchased",
            updatedAt: new Date(),
          })
          .where(eq(carts.id, cart.id)),
        tx.insert(orders).values({
          userId: user.id,
          cartId: cart.id,
          totalPrice: totalPrice,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ]);
    });

    return {
      status: "success",
    };
  });
