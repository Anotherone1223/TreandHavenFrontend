import React from 'react'
import { products } from './../../data/products';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './../../redux/store';
import { clearCart } from '../../redux/features/cart/CartSlice';
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from '../../utils/baseURL';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';



const OrderSummary = () => {

    const { user } = useSelector(state => state.auth)
    

    const products = useSelector((store) => store.cart.products)



    const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    

    const makePayment = async (e) => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const body = {
            products: products,
            userId: user?._id
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch(`${getBaseUrl()}/api/orders/create-checkout-session`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })


        const session = await response.json()
        console.log("session: ", session);

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        })
        console.log("Result:", result)
        if (result.error) {
            console.log("Error:", result.error)
        }
    }

    return (
        <div className='bg-primary-light mt-5 rounded text-base dark:text-black'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-xl text-text-dark'>Order Summary</h2>
                <p className='text-text-dark mt-2'>Selectd Items:{selectedItems}</p>
                {/* <p>Toatal Price:₹{totalPrice}</p> */}
                {/* <p>Tax({taxRate * 100}%):₹{tax}</p> */}
                <h3 className='font-bold'>GrandToatal: ₹{totalPrice}</h3>
                <div className='px-4 mb-6'>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        dispatch(clearCart())
                    }} className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span className='mr-2' >Clear Cart</span>  <i className="ri-delete-bin-line"></i>
                    </button>
                    {/* <button onClick={(e) => {
                        e.stopPropagation()
                        makePayment()
                    }} className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span className='mr-2'>Proceed Checkout</span> <i className="ri-bank-card-line"></i>
                    </button> */}
                    <button className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span className='mr-2'><Link to='/shippingaddress'>Proceed Checkout</Link></span> <i className="ri-bank-card-line"></i>
                    </button>
                    {/* <button className='bg-blue-700 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span>   <Link to='/shippingaddress'>Add Address</Link> </span> <MapPin className='text-sm'/>
                    </button> */}


                </div>
            </div>
        </div>

    )
}

export default OrderSummary