ALTER TABLE "carts" RENAME CONSTRAINT "carts_userId_fkey" TO "carts_userId_users_id_fkey";--> statement-breakpoint
ALTER TABLE "orders" RENAME CONSTRAINT "orders_cartId_fkey" TO "orders_userId_users_id_fkey";--> statement-breakpoint
ALTER TABLE "orders" RENAME CONSTRAINT "orders_userId_fkey" TO "orders_cartId_carts_id_fkey";--> statement-breakpoint
ALTER TABLE "productImgs" RENAME CONSTRAINT "productImgs_productId_fkey" TO "productImgs_productId_products_id_fkey";--> statement-breakpoint
ALTER TABLE "productInCarts" RENAME CONSTRAINT "productInCarts_cartId_fkey" TO "productInCarts_cartId_carts_id_fkey";--> statement-breakpoint
ALTER TABLE "productInCarts" RENAME CONSTRAINT "productInCarts_productId_fkey" TO "productInCarts_productId_products_id_fkey";--> statement-breakpoint
ALTER TABLE "products" RENAME CONSTRAINT "products_categoryId_fkey" TO "products_categoryId_categories_id_fkey";--> statement-breakpoint
ALTER TABLE "products" RENAME CONSTRAINT "products_userId_fkey" TO "products_userId_users_id_fkey";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstName" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" varchar(255);--> statement-breakpoint
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_users_id_fkey", ADD CONSTRAINT "carts_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_users_id_fkey", ADD CONSTRAINT "orders_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_cartId_carts_id_fkey", ADD CONSTRAINT "orders_cartId_carts_id_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "productImgs" DROP CONSTRAINT "productImgs_productId_products_id_fkey", ADD CONSTRAINT "productImgs_productId_products_id_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "productInCarts" DROP CONSTRAINT "productInCarts_cartId_carts_id_fkey", ADD CONSTRAINT "productInCarts_cartId_carts_id_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "productInCarts" DROP CONSTRAINT "productInCarts_productId_products_id_fkey", ADD CONSTRAINT "productInCarts_productId_products_id_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_categories_id_fkey", ADD CONSTRAINT "products_categoryId_categories_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_userId_users_id_fkey", ADD CONSTRAINT "products_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;