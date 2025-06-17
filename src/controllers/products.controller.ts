import { Request, Response } from 'express';
import { products } from '@/db/schema';
import { db } from '@/db';
import { asc, eq } from 'drizzle-orm';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(products).orderBy(asc(products.id));
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was a problem fetching products',
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    const result = await db.insert(products).values({ name, description, price, category }).returning();
    res.status(201).json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was a problem creating a product',
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await db.select().from(products).where(eq(products.id, id));

    if (result.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was a problem fetching product by id',
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body;

    const result = await db.update(products).set(updates).where(eq(products.id, id)).returning();

    if (result.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was a problem updating a product',
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    if (result.length === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was a problem deleting a product',
    });
  }
};
