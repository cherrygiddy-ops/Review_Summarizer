import type { Request, Response } from 'express';
import { reviewService } from '../service/review.service';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'invalid product id passed' });
      }
      const reviews = await reviewService.getReviews(productId);
      res.json(reviews);
   },

   async summarizeReviews(req: Request, res: Response) {
      var productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'invalid product id' });
      }
      const summary = await reviewService.summarizeReviews(productId);

      res.json(summary);
   },
};
