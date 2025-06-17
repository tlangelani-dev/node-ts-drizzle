import { Request, Response } from 'express';

export const appHealth = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Node TS Drizzle API is running',
    timestamp: new Date().toISOString(),
  });
};

export const appWelcome = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Node TS Drizzle API',
    version: '1.0.0',
  });
};
