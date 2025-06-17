import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import productRoutes from './routes/products.router';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from './db/schema';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool, { schema });

(async () => {
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
  console.log('Migrations applied');
})();

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
