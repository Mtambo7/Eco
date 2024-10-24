import { Request, Response } from "express";

import { db } from "../db/index.js";
import { orderItermsTable, ordersTable } from "../db/ordersSchema.js";
import { eq } from "drizzle-orm";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    body: { order, items },
  } = req;
  try {
    const { id: userId } = req.user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId })
      .returning();

    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItermsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ order: newOrder, items: newOrderItems });
  } catch (error) {
    console.log(`Error in createOrder controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await db.select().from(ordersTable);
    res.status(200).json(orders);
  } catch (error) {
    console.log(`Error in getOrders controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const orderId = parseInt(id);

    const order = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, orderId))
      .leftJoin(orderItermsTable, eq(ordersTable.id, orderItermsTable.orderId));

    if (order.length === 0) {
     return res.status(404).send("Order not found");
    }

    const mergedOrder = {
      ...order[0].orders,
      items: order.map((item) => item.orderItems),
    };

    res.status(200).json(mergedOrder);
  } catch (error) {
    console.log(`Error in getOrderById controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderId = parseInt(id);

    const [updatedOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, orderId))
      .returning();

    if (!updatedOrder) {
      res.status(404).send("Order not found");
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(`Error in updateOrder controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
