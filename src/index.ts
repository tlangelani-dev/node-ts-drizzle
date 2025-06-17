import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './routes/products.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Express server running on port: ${port}`);
});
