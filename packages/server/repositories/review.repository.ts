import { PrismaClient, type Review } from '../generated/prisma';

const prisma = new PrismaClient();
const reviewRepository = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },
};

export default reviewRepository;
