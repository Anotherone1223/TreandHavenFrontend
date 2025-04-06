import React from 'react'
import { useSelector } from 'react-redux'
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi'
import { useNavigate } from 'react-router-dom'
import { Star, Plus, ShoppingBag, Calendar, Package2 } from 'lucide-react';

function StarRating({ rating }) {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={20}
            className={`${
              index < rating
                ? 'fill-yellow-400 text-yellow-400 drop-shadow-md'
                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
            } transform transition-transform duration-200 hover:scale-110`}
          />
        ))}
      </div>
    );
  }


function ReviewCard({ review }) {
    return (
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-blue-500/30 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <span className="text-lg font-bold">{review.rating}</span>
            </div>

            <div className="mb-6">
                <StarRating rating={review.rating} />
            </div>

            <p className="text-gray-800 dark:text-gray-200 font-medium mb-6 line-clamp-3 relative pl-6 before:content-[\u0022] before:absolute before:left-0 before:top-0 before:text-3xl before:text-blue-500 before:font-serif before:leading-5">
                {review.comment}
            </p>

            <div className="border-t dark:border-gray-700 pt-4 mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Package2 size={16} className="text-blue-500" />
                    <span>Product ID: {review.productId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="text-blue-500" />
                    <span>
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

const UserReviews = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id)
    const navigate = useNavigate()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Failed to load reviews!</div>


    const handleCardClick = () => {
        navigate('/shop')
    }
    return (
        <div className='py-6'>

           
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6'>
                {
                    reviews && reviews.map((review, index) => (
                        <div key={index} className='bg-white dark:bg-[#1a202c] shadow-xl dark:shadow-blue-500/50 rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200'>
                            <p className='text-lg font-semibold mb-2'>Rating: {review?.rating}</p>
                            <p className='mb-2'><strong>Comment:</strong> {review?.comment}</p>
                            <p className='text-sm text-gray-500'><strong>ProductId:</strong> {review?.productId}</p>
                            <p className='text-sm text-gray-500'><strong>Date:</strong> {new Date(review?.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                }
                <div
                    onClick={handleCardClick}
                    className='bg-gray-100 dark:bg-[#1a202c] shadow-xl dark:shadow-blue-500/50 dark:text-white  text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-200'>
                    <span>+</span>
                    <p>Add New Review</p>
                </div>
            </div> */}

            <div className="min-h-screen bg-gradient-to-br bg-white dark:bg-[#1a202c]   p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="relative">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 relative">
                                Your Reviews
                               
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Share your thoughts on our products
                            </p>
                        </div>


                    </div>

                    {reviews.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-blue-500/20 border border-gray-100 dark:border-gray-700">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <ShoppingBag className="w-24 h-24 text-gray-400 dark:text-gray-600 animate-float" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    0
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                No reviews yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                Start shopping and share your experience with others. Your feedback helps the community!
                            </p>
                            <button
                                onClick={handleCardClick}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 transform"
                            >
                                <ShoppingBag size={20} />
                                <span>Go to Shop</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {reviews.map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))}
                            <button
                                onClick={handleCardClick}
                                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-blue-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-blue-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-blue-500/30"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                    <Plus size={32} className="group-hover:animate-pulse" />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        Add New Review
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Share your experience
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserReviews

// import React from 'react';
// import { Star, Plus, ShoppingBag, Calendar, Package2 } from 'lucide-react';

// // Simulated data for demonstration
// const mockReviews = [
//   {
//     rating: 5,
//     comment: "Excellent quality fabric and perfect fitting! Would definitely recommend.",
//     productId: "prod_123",
//     createdAt: "2024-03-10T10:00:00Z"
//   },
//   {
//     rating: 4,
//     comment: "Great casual wear, comfortable for daily use.",
//     productId: "prod_456",
//     createdAt: "2024-03-08T15:30:00Z"
//   },
//   {
//     rating: 5,
//     comment: "The color is exactly as shown in the picture. Very satisfied!",
//     productId: "prod_789",
//     createdAt: "2024-03-05T09:15:00Z"
//   }
// ];

// function StarRating({ rating }) {
//   return (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, index) => (
//         <Star
//           key={index}
//           size={20}
//           className={`${
//             index < rating
//               ? 'fill-yellow-400 text-yellow-400 drop-shadow-md'
//               : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
//           } transform transition-transform duration-200 hover:scale-110`}
//         />
//       ))}
//     </div>
//   );
// }

// function ReviewCard({ review }) {
//   return (
//     <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-blue-500/30 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
//       <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
//         <span className="text-lg font-bold">{review.rating}</span>
//       </div>
      
//       <div className="mb-6">
//         <StarRating rating={review.rating} />
//       </div>
      
//       <p className="text-gray-800 dark:text-gray-200 font-medium mb-6 line-clamp-3 relative pl-6 before:content-[\u0022] before:absolute before:left-0 before:top-0 before:text-3xl before:text-blue-500 before:font-serif before:leading-5">
//         {review.comment}
//       </p>
      
//       <div className="border-t dark:border-gray-700 pt-4 mt-4 space-y-3">
//         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//           <Package2 size={16} className="text-blue-500" />
//           <span>Product ID: {review.productId}</span>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//           <Calendar size={16} className="text-blue-500" />
//           <span>
//             {new Date(review.createdAt).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             })}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const handleAddReview = () => {
//     console.log('Navigate to shop');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//           <div className="relative">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 relative">
//               Your Reviews
//               <span className="absolute -top-2 -right-4 w-2 h-2 bg-blue-500 rounded-full"></span>
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-400">
//               Share your thoughts on our products
//             </p>
//           </div>
          
//           <button
//             onClick={handleAddReview}
//             className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_40px_rgb(59,130,246,0.45)] hover:scale-105 transform"
//           >
//             <Plus size={20} className="animate-pulse" />
//             <span>Write a Review</span>
//           </button>
//         </div>

//         {mockReviews.length === 0 ? (
//           <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-blue-500/20 border border-gray-100 dark:border-gray-700">
//             <div className="relative w-24 h-24 mx-auto mb-6">
//               <ShoppingBag className="w-24 h-24 text-gray-400 dark:text-gray-600 animate-float" />
//               <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
//                 0
//               </div>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//               No reviews yet
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
//               Start shopping and share your experience with others. Your feedback helps the community!
//             </p>
//             <button
//               onClick={handleAddReview}
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 transform"
//             >
//               <ShoppingBag size={20} />
//               <span>Go to Shop</span>
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {mockReviews.map((review, index) => (
//               <ReviewCard key={index} review={review} />
//             ))}
//             <button
//               onClick={handleAddReview}
//               className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-blue-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-blue-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-blue-500/30"
//             >
//               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
//                 <Plus size={32} className="group-hover:animate-pulse" />
//               </div>
//               <div className="text-center">
//                 <p className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
//                   Add New Review
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                   Share your experience
//                 </p>
//               </div>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
