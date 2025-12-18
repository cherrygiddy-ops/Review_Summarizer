import type { Request, Response } from 'express';
import express from 'express';
import { reviewController } from './controllers/review.controller';
import { PrismaClient } from './generated/prisma';

const router = express.Router();

router.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
   const prisma = new PrismaClient();
   const productId = Number(req.params.id);
   if (isNaN(productId)) {
      res.status(400).json({ error: 'invalid product id passed' });
   }
   const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
   });
   res.json(reviews);
});
export default router;
