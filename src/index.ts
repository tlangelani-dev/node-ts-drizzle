import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import appRouter from '@/routes/app.router';
import productsRouter from '@/routes/products.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', appRouter);
app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.log(`Express server running on port: ${port}`);
});
