import axios from 'axios';
import { useEffect } from 'react';
import StartRatings from './StartRatings';

import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
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
const ReviewList = ({ productId }: Props) => {
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
         `/api/products/${productId}/reviewsh`
      );
      return data;
   };
   useEffect(() => {
      fetchReviews();
   }, []);

   if (isLoading)
      return (
         <div className="flex flex-col gap-5 p-3">
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
   return (
      <div className="flex flex-col gap-5 p-3">
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
   );
};

export default ReviewList;
