import axios from 'axios';
import { useEffect, useState } from 'react';
import StartRatings from './StartRatings';
import { HiSparkles } from 'react-icons/hi2';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
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
      const { data } = await axios.post<SummaryResponse>(
         `api.products/${productId}/reviews/summarize`
      );
      setSummary(data.summarry);
   };

   if (isLoading)
      return (
         <div className="flex flex-col gap-5 ">
            {[1, 2, 3, 4].map((rev) => (
               <div key={rev}>
                  <Skeleton width={150}></Skeleton>
                  <Skeleton width={100}></Skeleton>
                  <Skeleton count={2}></Skeleton>
               </div>
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
               <Button onClick={handleSummary}>
                  <HiSparkles></HiSparkles>Summarize
               </Button>
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
