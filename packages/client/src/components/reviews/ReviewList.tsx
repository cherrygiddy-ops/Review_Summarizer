import axios from 'axios';
import { useEffect, useState } from 'react';
import StartRatings from './StartRatings';
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
   const fetchReviews = async () => {
      return axios
         .get<ReviewResponse>(`/api/products/${productId}/reviews`)
         .then((res) => setReviews(res.data));
   };
   useEffect(() => {
      fetchReviews();
   }, []);
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
