import express, { Request, Response } from 'express';
import { db } from '../db';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

// create product
router.post('/', async (req, res) => {
  const { name, description, price, category } = req.body;
  const result = await db.insert(products).values({ name, description, price, category }).returning();
  res.status(201).json(result[0]);
});

// get all products
router.get('/', async (_req, res) => {
  const result = await db.select().from(products);
  res.json(result);
});

// get product by id
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const result = await db.select().from(products).where(eq(products.id, id));
  if (result.length === 0) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json(result[0]);
});

// update product
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  const result = await db.update(products).set(updates).where(eq(products.id, id)).returning();
  if (result.length === 0) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json(result[0]);
});

// delete product
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.delete(products).where(eq(products.id, id)).returning();
  if (result.length === 0) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json({ deleted: result[0] });
});

export default router;
