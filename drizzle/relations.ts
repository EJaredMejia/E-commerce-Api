import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	carts: {
		user: r.one.users({
			from: r.carts.userId,
			to: r.users.id,
			alias: "carts_userId_users_id"
		}),
		users: r.many.users({
			from: r.carts.id.through(r.orders.cartId),
			to: r.users.id.through(r.orders.userId),
			alias: "carts_id_users_id_via_orders"
		}),
		products: r.many.products({
			from: r.carts.id.through(r.productInCarts.cartId),
			to: r.products.id.through(r.productInCarts.productId)
		}),
	},
	users: {
		cartsUserId: r.many.carts({
			alias: "carts_userId_users_id"
		}),
		cartsViaOrders: r.many.carts({
			alias: "carts_id_users_id_via_orders"
		}),
		categories: r.many.categories(),
	},
	productImgs: {
		product: r.one.products({
			from: r.productImgs.productId,
			to: r.products.id
		}),
	},
	products: {
		productImgs: r.many.productImgs(),
		carts: r.many.carts(),
	},
	categories: {
		users: r.many.users({
			from: r.categories.id.through(r.products.categoryId),
			to: r.users.id.through(r.products.userId)
		}),
	},
}))