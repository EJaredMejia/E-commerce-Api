import { db } from "@/db/drizzle";
import { categories } from "@root/drizzle/schema";
import { createServerFn } from "@tanstack/react-start";

export const getAllCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const categoriesItems = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories);

    return categoriesItems;
  },
);
