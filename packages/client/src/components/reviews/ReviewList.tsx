import axios from 'axios';
import { useEffect, useState } from 'react';
import StartRatings from './StartRatings';
import { HiSparkles } from 'react-icons/hi2';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import ReviewSkelton from './ReviewSkelton';
interface Props {
   productId: number;
}
type Review = {
   id: number;
   author: string;
   rating: number;
   content: string;
   createdAt: Date;
   productId: number;
};

type ReviewResponse = {
   reviews: Review[];
   summary: string | null;
};

type SummaryResponse = {
   summarry: string;
};
const ReviewList = ({ productId }: Props) => {
   const [summary, setSummary] = useState('');
   const [isSummaryLoading, setSummaryLoading] = useState(false);
   const [summaryError, setSummaryError] = useState('');
   const {
      data: reviewsData,
      isLoading,
      error,
   } = useQuery({
      queryKey: ['reviews', productId],
      queryFn: () => fetchReviews(),
   });

   const fetchReviews = async () => {
      const { data } = await axios.get<ReviewResponse>(
         `/api/products/${productId}/reviews`
      );
      return data;
   };

   const handleSummary = async () => {
      try {
         setSummaryLoading(true);
         setSummaryError('');
         const { data } = await axios.post<SummaryResponse>(
            `api.products/${productId}/reviews/summarize`
         );

         setSummary(data.summarry);
      } catch (error) {
         setSummaryError('error summarzing the reviews');
      } finally {
         setSummaryLoading(false);
      }
   };

   if (isLoading)
      return (
         <div className="flex flex-col gap-5 ">
            {[1, 2, 3, 4].map((rev) => (
               <ReviewSkelton key={rev}></ReviewSkelton>
            ))}
         </div>
      );
   if (error) return <p className="text-red-500">{error.message}</p>;

   if (!reviewsData?.reviews.length) return null;

   const currentSummary = reviewsData.summary || summary;
   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={handleSummary}
                     className="cursor-pointer"
                     disabled={isSummaryLoading}
                  >
                     <HiSparkles></HiSparkles>Summarize
                  </Button>
                  {isSummaryLoading && (
                     <div className="py-3">
                        <ReviewSkelton></ReviewSkelton>
                     </div>
                  )}
                  {summaryError && (
                     <p className="text-red-500">{summaryError}</p>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5 ">
            {reviewsData?.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  <div>
                     Ratings:<StartRatings value={review.rating}></StartRatings>
                  </div>
                  <div className="py-2">{review.content}</div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
