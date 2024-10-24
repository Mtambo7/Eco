import { Request, Response } from "express";

import { db } from "../db/index.js";
import { productsTable } from "../db/productsSchema.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validation/product.validation.js";
import { eq } from "drizzle-orm";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);

    res.status(200).json(products);
  } catch (error) {
    console.log(`Error in getProducts controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(`Error in getProductById controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { body } = req;
  try {
    if (req.user.role !== "seller") {
      return res.status(401).json({ message: "You dont have permission" });
    }

    const { value, error } = createProductSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const [product] = await db.insert(productsTable).values(value).returning();

    res.status(201).json({ product });
  } catch (error) {
    console.log(`Error in createProduct controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    body,
    params: { id },
  } = req;
  try {
    if (req.user.role !== "seller") {
      return res.status(401).json({ message: "You dont have permission" });
    }

    const { value, error } = updateProductSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const [updatedProduct] = await db
      .update(productsTable)
      .set(value)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(`Error in updateProduct controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    if (req.user.role !== "seller") {
      return res.status(401).json({ message: "You dont have permission" });
    }

    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteProduct controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
