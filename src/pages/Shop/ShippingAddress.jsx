import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MapPin, Truck, ChevronLeft, Package, Clock, CreditCard, Shield, DollarSign, IndianRupee } from 'lucide-react';
import { data, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { getBaseUrl } from '../../utils/baseURL';
import Swal from 'sweetalert2';
import { addUserAddress, setUserAddress } from '../../redux/features/address/AddressSlice';

const ShippingAddress = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const { user } = useSelector(state => state.auth)

    const onSubmit = async (data) => {
        if (!user) {
            alert('Please log in first.');
            return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Address Before Dispatch:", data);

        // Save in Redux
        dispatch(setUserAddress(data));
        dispatch(addUserAddress({ ...data, userEmail: user.email }));

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your Address has been Saved successfully.',
            timer: 2500,
            showConfirmButton: false,
        });

        await makePayment(data);

    };

    // console.log(data);



    const products = useSelector((store) => store.cart.products)

    const { totalPrice, tax, grandTotal } = useSelector((store) => store.cart)

    const makePayment = async (e) => {


        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const body = {
            products: products,
            userId: user?._id
        }   

        console.log("🧾 Full products:", products);


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
        <div>
            <div className="min-h-screen bg-gray-50 ">
                {/* Header */}

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-[#1a202c]  rounded-2xl shadow-lg p-6 sm:p-8">
                                <div className="flex items-center mb-6">
                                    <MapPin className="h-6 w-6 text-indigo-600 dark:text-white" />
                                    <h1 className="text-2xl font-semibold text-gray-900 ml-2 dark:text-white">Shipping Address</h1>
                                </div>

                                <form id="address-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 ">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"

                                                {...register('fullName', { required: 'Full name is required' })}
                                                className={`mt-1 block w-full rounded-lg border-2 ${errors.fullName ? 'border-red-300' : 'border-gray-200'
                                                    } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                placeholder="John Doe"
                                            />
                                            {errors.fullName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"

                                                {...register('email', { required: 'Full name is required' })}
                                                className={`mt-1 block w-full rounded-lg border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'
                                                    } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                placeholder="example@gmail.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Address Line 1
                                            </label>
                                            <input
                                                type="text"
                                                id="addressLine1"

                                                {...register('addressLine1', { required: 'Address is required' })}
                                                className={`mt-1 block w-full rounded-lg border-2 ${errors.addressLine1 ? 'border-red-300' : 'border-gray-200'
                                                    } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                placeholder="123 Street Name"
                                            />
                                            {errors.addressLine1 && (
                                                <p className="mt-1 text-sm text-red-600">{errors.addressLine1.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Address Line 2 (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="addressLine2"

                                                {...register('addressLine2')}
                                                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Apartment, Suite, Unit, etc."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    id="city"

                                                    {...register('city', { required: 'City is required' })}
                                                    className={`mt-1 block w-full rounded-lg border-2 ${errors.city ? 'border-red-300' : 'border-gray-200'
                                                        } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                    placeholder="New York"
                                                />
                                                {errors.city && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    id="state"

                                                    {...register('state', { required: 'State is required' })}
                                                    className={`mt-1 block w-full rounded-lg border-2 ${errors.state ? 'border-red-300' : 'border-gray-200'
                                                        } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                    placeholder="NY"
                                                />
                                                {errors.state && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                                                )}
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                    ZIP Code
                                                </label>
                                                <input
                                                    type="text"
                                                    id="zipCode"

                                                    {...register('zipCode', { required: 'ZIP code is required' })}
                                                    className={`mt-1 block w-full rounded-lg border-2 ${errors.zipCode ? 'border-red-300' : 'border-gray-200'
                                                        } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                    placeholder="10001"
                                                />
                                                {errors.zipCode && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"

                                                    {...register('phone', { required: 'Phone number is required' })}
                                                    className={`mt-1 block w-full rounded-lg border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'
                                                        } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                                    placeholder="(555) 123-4567"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Country
                                            </label>
                                            <select
                                                id="country"

                                                {...register('country', { required: 'Country is required' })}
                                                className={`mt-1 block w-full rounded-lg border-2 ${errors.country ? 'border-red-300' : 'border-gray-200'
                                                    } px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                                            >
                                                <option value="">Select a country</option>
                                                <option value="IN">India</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="AU">Australia</option>

                                            </select>
                                            {errors.country && (
                                                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 dark:text-white">
                                                Delivery Instructions (Optional)
                                            </label>
                                            <textarea
                                                id="deliveryInstructions"

                                                {...register('deliveryInstructions')}
                                                rows={3}
                                                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                placeholder="Add any special instructions for delivery"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                'Save Address & Pay'
                                            )}
                                        </button>

                                    </div>

                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-1 flex flex-col gap-4">

                            {/* Sidebar */}
                            <div className="bg-white dark:bg-[#1a202c] rounded-2xl shadow-lg p-6 space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Information</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <Truck className="h-5 w-5 text-indigo-600   mt-1" />
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-green-500">Free Shipping</h3>
                                                <p className="text-sm text-gray-500 dark:text-white">On orders over $100</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Package className="h-5 w-5 text-indigo-600 mt-1" />
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-green-500">Order Tracking</h3>
                                                <p className="text-sm text-gray-500 dark:text-white">Real-time updates on your delivery</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Clock className="h-5 w-5 text-indigo-600 mt-1" />
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-green-500">Estimated Delivery</h3>
                                                <p className="text-sm text-gray-500 dark:text-white">3-5 business days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h2>
                                    <div className="text-sm text-gray-500 dark:text-white">
                                        <p>Our customer service team is available:</p>
                                        <p className="mt-2">Monday - Friday: 9AM - 6PM EST</p>
                                        <p>Saturday: 10AM - 4PM EST</p>
                                        <p className="mt-4">
                                            <Link to='/contact' className="text-indigo-600 hover:text-indigo-500">
                                                Contact Support →
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Payment Sidebar */}
                            <div>
                                <div className="bg-white dark:bg-[#1a202c] rounded-2xl shadow-lg p-6 space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
                                        <div className="space-y-4 dark:text-white">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-white">Subtotal</span>
                                                <span className="font-medium">₹{totalPrice}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-white">Shipping</span>
                                                <span className="font-medium text-green-600">Free</span>
                                            </div>
                                            {/* <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-white">Tax</span>
                                                <span className="font-medium">₹{tax}</span>
                                            </div> */}
                                            <div className="border-t border-gray-200 pt-4 flex justify-between">
                                                <span className="text-lg font-semibold">Grand Total</span>
                                                <span className="text-lg font-semibold">₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <CreditCard className="h-5 w-5 text-indigo-600  mt-1" />
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-green-500">Secure Payment</h3>
                                                <p className="text-sm text-gray-500 dark:text-white">All major credit cards accepted</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Shield className="h-5 w-5 text-indigo-600  mt-1" />
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-green-500">SSL Encrypted</h3>
                                                <p className="text-sm text-gray-500 dark:text-white">Your data is protected</p>
                                            </div>
                                        </div>
                                        {/* <div className="flex items-start">
                                        <IndianRupee className="h-5 w-5 text-indigo-600 mt-1" />
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-gray-900">Money Back Guarantee</h3>
                                            <p className="text-sm text-gray-500">30-day return policy</p>
                                        </div>
                                    </div> */}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            makePayment()
                                        }}
                                        className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 flex items-center justify-center"
                                    >
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Make Payment
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ShippingAddress
