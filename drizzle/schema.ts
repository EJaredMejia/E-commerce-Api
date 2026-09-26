import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";

export const carts = sqliteTable("carts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  cartId: integer("cartId")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  totalPrice: real("totalPrice").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const productImgs = sqliteTable("productImgs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  imgUrl: text("imgUrl").notNull(),
  productId: integer("productId")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const productInCarts = sqliteTable("productInCarts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  cartId: integer("cartId")
    .notNull()
    .references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  productId: integer("productId")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  quantity: integer("quantity").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  price: real("price").notNull(),
  categoryId: integer("categoryId")
    .notNull()
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  status: text("status").default("active").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    firstName: text("firstName"),
    lastName: text("lastName"),
    role: text("role").default("normal").notNull(),
    status: text("status").default("active").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  }
);
