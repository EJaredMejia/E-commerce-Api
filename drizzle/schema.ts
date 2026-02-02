import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const carts = pgTable("carts", {
  id: serial().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  status: varchar({ length: 255 }).default("active").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const categories = pgTable("categories", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).default("active").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const orders = pgTable("orders", {
  id: serial().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  cartId: integer()
    .notNull()
    .references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  totalPrice: numeric({ mode: "number" }).notNull(),
  status: varchar({ length: 255 }).default("active").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const productImgs = pgTable("productImgs", {
  id: serial().primaryKey(),
  imgUrl: varchar({ length: 255 }).notNull(),
  productId: integer()
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  status: varchar({ length: 255 }).default("active").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const productInCarts = pgTable("productInCarts", {
  id: serial().primaryKey(),
  cartId: integer()
    .notNull()
    .references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" }),
  productId: integer()
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  quantity: integer().notNull(),
  status: varchar({ length: 255 }).default("active").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const products = pgTable("products", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  quantity: integer().notNull(),
  price: numeric({ mode: "number" }).notNull(),
  categoryId: integer()
    .notNull()
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  status: varchar({ length: 255 }).default("active").notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    firstName: varchar({ length: 255 }),
    lastName: varchar({ length: 255 }),
    role: varchar({ length: 255 }).default("normal").notNull(),
    status: varchar({ length: 255 }).default("active").notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull(),
    updatedAt: timestamp({ withTimezone: true }).notNull(),
  },
  (table) => [unique("users_email_key").on(table.email)],
);
