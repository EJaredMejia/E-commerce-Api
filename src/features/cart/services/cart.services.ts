import { db } from "@/db/drizzle";
import { carts } from "@root/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function getActiveCart(userId: number) {
  const [cart] = await db
    .select({ id: carts.id })
    .from(carts)
    .where(and(eq(carts.userId, userId), eq(carts.status, "active")))
    .limit(1);

  return cart || null;
}

export async function getOrCreateActiveCart(userId: number) {
  const cart = await getActiveCart(userId);

  if (cart) {
    return cart;
  }

  const [newCart] = await db
    .insert(carts)
    .values({
      userId,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({ id: carts.id });

  if (!newCart) {
    throw Response.json({ error: "Failed to create cart" }, { status: 500 });
  }

  return newCart;
}
