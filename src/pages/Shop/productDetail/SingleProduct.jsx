import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../../../data/products';
import RatingStar from '../../../components/RatingStar';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/CartSlice';
import ReviewsCard from '../reviews/ReviewsCard';



const SingleProduct = () => {

    const { id } = useParams();

    // const product = products.find((item) => item._id === parseInt(id));
    // console.log(product);

    const dispatch = useDispatch()
    const { data, error, isLoading } = useFetchProductByIdQuery(id)
    console.log(data);

    const singleProduct = data?.product || {};
    console.log(singleProduct);

    const productReviews = data?.reviews || []
    console.log(productReviews);

    if (isLoading) return <p>Loading....</p>
    if (error) return <p>Error Loading product details</p>


    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }



    return (
        <>
            <section className='section__container bg-primary-light dark:bg-[#1a202c] '>
                <h2 className='section__header capitalize'>Discover Your Perfect Look!</h2>
                <p className='section__subheader space-x-2'>Explore the details of this stylish piece, crafted for comfort and elegance. Add it to your wardrobe today and make every outfit stand out!</p>
            </section>

            <section className='section__container mt-8 dark:text-white'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    {/* Product image */}
                    <div className='md:w-1/2 w-full'>
                        <img src={singleProduct?.image} alt="" className='rounded-md w-full h-auto' />
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-medium mb-4'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4'>₹{singleProduct.price}
                            {singleProduct?.oldPrice && <s className='px-2'>{singleProduct?.oldPrice}</s>}
                        </p>
                        <p className='text-gray-400 mb-2 dark:text-white'>{singleProduct?.description}</p>
                        {/* Addititonal product info */}
                        <div className='flex flex-col space-y-2'>
                            <p><strong>Category:{singleProduct?.category}</strong></p>
                            <p><strong>SubCategory:{singleProduct?.subCategory}</strong></p>
                            <div className='flex gap-1 items-center'>
                                <strong>Rating:</strong>
                                <RatingStar rating={singleProduct.rating} />
                            </div>

                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(singleProduct)
                        }} className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
                            Add to Cart
                        </button>

                        {/* display review */}

                        <section className='section__container mt-8'>
                            <ReviewsCard productReviews= {productReviews}/>
                        </section>
                    </div>
                </div>



            </section>
        </>
    )
}

export default SingleProduct