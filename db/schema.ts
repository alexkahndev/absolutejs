import {
	integer,
	numeric,
	pgTable,
	serial,
	varchar
} from "drizzle-orm/pg-core";

export const appuser = pgTable("appuser", {
	id: serial("id").primaryKey(),
	user_id_token: varchar("user_id_token", { length: 255 }),
	first_name: varchar("first_name", { length: 255 }),
	last_name: varchar("last_name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	phone: varchar("phone", { length: 255 }),
	password: varchar("password", { length: 255 }),
	business_type: varchar("business_type", { length: 255 }),
	industry_type: varchar("industry_type", { length: 255 }),
	business_name: varchar("business_name", { length: 255 }),
	revenue: varchar("revenue", { length: 255 })
});

export const socialmedia = pgTable("socialmedia", {
	platform_id: serial("platform_id"),
	platform_name: varchar("platform_name", { length: 255 })
});

export const socialmediauser = pgTable("socialmediauser", {
	id: integer("id")
		.primaryKey()
		.references(() => appuser.id),
	platform_name: varchar("platform_name", { length: 255 }).references(
		() => socialmedia.platform_name
	),
	platform_id: integer("platform_id").references(
		() => socialmedia.platform_id
	),
	platform_handle: varchar("platform_handle", { length: 255 })
});

export const services = pgTable("services", {
	service_id: serial("service_id"),
	service_name: varchar("service_name", { length: 255 }),
	service_description: varchar("service_description", { length: 255 }),
	price: numeric("price", { precision: 10, scale: 2 }),
	category: varchar("category", { length: 255 })
});

export const serviceuser = pgTable("serviceuser", {
	user_id: integer("user_id").references(() => appuser.id),
	service_id: integer("service_id").references(() => services.service_id),
	service_name: varchar("service_name", { length: 255 }).references(
		() => services.service_name
	)
});
