
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';
import ReviewAnimation from './../../../components/Animations/ReviewAnimation';

const PostaReview = ({ isModalOpen, handleClose }) => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { refetch } = useFetchProductByIdQuery(id, { skip: !id })
    const [postReview] = usePostReviewMutation()

    const handleRating = (value) => {
        setRating(value)

    }


    const [showSuccess, setShowSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            comment: comment,
            rating: rating,
            userId: user?._id,
            productId: id
        }
        try {
            const response = await postReview(newComment).unwrap();

            setShowSuccess(true)
            // Delay for animation effect, then reset
            setTimeout(() => {
                setShowSuccess(false);
                setComment('');
                setRating(0);
                refetch();
                handleClose();
            }, 3000);
        } catch (error) {
            alert(error.message)
        }
        handleClose();
    }


    return (
        <>
            <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
                <div className='bg-white dark:bg-[#1a202c] p-6 rounded-md shadow-lg w-96 z-50'>
                    <h2 className='text-lg font-medium mb-4 dark:text-white'>Post A Review </h2>
                    <div className='flex items-center mb-4'>
                        {
                            [1, 2, 3, 4, 5].map((star) => (
                                <span key={star} onClick={() => handleRating(star)} className='cursor-pointer text-yellow-500 text-xl'>
                                    {
                                        rating >= star ? (<i className="ri-star-fill"></i>) : (<i className="ri-star-line"></i>)
                                    }
                                </span>
                            ))
                        }
                    </div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className='w-full border border-gray-300 p-2 dark:text-black rounded-md mb-4 focus:outline-none'></textarea>
                    <div className='flex justify-end gap-2'>
                        <button onClick={handleClose} className='px-4 py-2 bg-gray-300 rounded-md'>Cancel</button>
                        <button onClick={handleSubmit} className='px-4 py-2 bg-primary text-white rounded-md'>Submit</button>
                    </div>

                </div>
            </div>
            {showSuccess && <ReviewAnimation />}
        </>
    )
}

export default PostaReview