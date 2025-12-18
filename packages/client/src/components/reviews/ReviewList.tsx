import axios from 'axios';
import { useEffect, useState } from 'react';
import StartRatings from './StartRatings';
import skeletons from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton';
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
   const [reviewData, setReviews] = useState<ReviewResponse>();
   const [isloading, setIsloading] = useState(false);
   const fetchReviews = async () => {
      setIsloading(true);
      const { data } = await axios.get<ReviewResponse>(
         `/api/products/${productId}/reviews`
      );
      setReviews(data);
      setIsloading(false);
   };
   useEffect(() => {
      fetchReviews();
   }, []);

   if (isloading)
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
   return (
      <div className="flex flex-col gap-5 p-3">
         {reviewData?.reviews.map((review) => (
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
