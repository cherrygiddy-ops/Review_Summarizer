import type { Request, Response } from 'express';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID.' });
         return;
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         res.status(404).json({ error: 'Product does not exist.' });
         return;
      }
      const reviews = await reviewRepository.getReviews(productId);

      res.json({
         reviews,
      });
   },
};
