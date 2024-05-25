import {
  pgTable,
  serial,
  varchar,
  timestamp,
  numeric,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('user_id').primaryKey(),
  username: varchar('username').unique(),
  email: varchar('email').unique(),
  password: varchar('password'),
  firstName: varchar('first_name'),
  lastName: varchar('last_name'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  type: varchar('type'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const products = pgTable('products', {
  id: serial('product_id').primaryKey(),
  name: varchar('product_name'),
  price: numeric('price'),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
