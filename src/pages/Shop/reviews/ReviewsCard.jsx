import React, { useState } from 'react'
import commenterIcon from '../../../../public/assets1/avatar.png'
import { formatDate } from '../../../utils/formateDate'
import RatingStar from '../../../components/RatingStar'
import PostaReview from './PostaReview'

const ReviewsCard = ({ productReviews }) => {
    const [isModalOpen, SetIsModelOpen] = useState(false)

    const reviews = productReviews || []
    console.log(reviews);

    const handleOpenReviewModel = () => {
        SetIsModelOpen(true)
    }

    const handleCloseReviewModel = () => {
        SetIsModelOpen(false)
    }



    return (
        <div className='my-6 bg-white dark:bg-[#1a202c] p-8'>
            <div>
                {
                    reviews.length > 0 ? (
                        <div>
                            <h3 className='text-lg font-medium dark:text-white'>All Comments....</h3>
                            <div>
                                {
                                    reviews.map((review, index) => (
                                        <div key={index} className='mt-4'>
                                            <div className='flex gap-4 items-center'>
                                                <img src={commenterIcon} alt="" className='size-14' />
                                                <div className='space-y-1'>
                                                    <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400 dark:text-white'>{review?.userId?.username}</p>
                                                    <p className='text-[12px] italic dark:text-white'>{formatDate(review?.updatedAt)}</p>
                                                    <RatingStar rating={review?.rating} />
                                                </div>
                                            </div>
                                            <div className='text-gray-600 mt-5 border p-8 dark:text-white'>
                                                <p className='md:w-4/5'>{review?.comment}</p>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : <p className='dark:text-white'>No Reviews Yet!</p>
                }
            </div>

            {/* Add review button */}
            <div className='mt-12'>
                <button onClick={handleOpenReviewModel} className='px-6 py-3 bg-primary text-white rounded-md'>Add A Review</button>
            </div>
            {/* review modal */}
            <PostaReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModel} />

        </div>
    )
}

export default ReviewsCard