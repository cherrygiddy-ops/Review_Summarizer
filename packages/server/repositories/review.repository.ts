import { PrismaClient, type Review } from '../generated/prisma';

const prisma = new PrismaClient();
const reviewRepository = {
   async getReviews(productId: number): Promise<Review[]> {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
      });
   },
};

export default reviewRepository;
