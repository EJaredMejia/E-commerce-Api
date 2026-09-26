CREATE TABLE `carts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_carts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`cartId` integer NOT NULL,
	`totalPrice` real NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_orders_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_orders_cartId_carts_id_fk` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `productImgs` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`imgUrl` text NOT NULL,
	`productId` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_productImgs_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `productInCarts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`cartId` integer NOT NULL,
	`productId` integer NOT NULL,
	`quantity` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_productInCarts_cartId_carts_id_fk` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_productInCarts_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` real NOT NULL,
	`categoryId` integer NOT NULL,
	`userId` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_products_categoryId_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_products_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`username` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`firstName` text,
	`lastName` text,
	`role` text DEFAULT 'normal' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
