import { doublePrecision, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema";
import { productsTable } from "./productsSchema";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().defaultNow().notNull(),
  status: varchar({ length: 255 }).notNull().default("New"),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
});


export const orderItermsTable = pgTable("orderItems", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    
    orderId: integer().references(() => ordersTable.id),
    productId: integer().references(() => productsTable.id),

    quantity: integer().notNull(),
    price: doublePrecision().notNull(),

})