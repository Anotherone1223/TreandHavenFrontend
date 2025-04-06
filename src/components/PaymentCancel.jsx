import React, { useEffect, useState } from 'react'
import { XCircle, ArrowLeft, ShoppingBag, Clock, Shield, RefreshCw } from 'lucide-react';


const PaymentCancel = () => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#1a1a2e] relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl transform rotate-12 animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse delay-1000"></div>
            </div>

            <div className={`max-w-4xl w-full backdrop-blur-xl bg-white dark:bg-white/10 rounded-3xl p-8 md:p-12 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {/* Header Section with animated icon */}
                <div className="text-center mb-12 relative">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                            <XCircle className="h-24 w-24 text-red-500 transform transition-transform duration-500 hover:scale-110 relative z-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white  mb-6 tracking-tight">
                        Payment Cancelled
                    </h1>
                    <p className="text-black dark:text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                        Don't worry! Your payment was safely cancelled and no charges were made to your account.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                        { icon: Clock, title: "Items Saved", text: "Your cart is safely stored for later" },
                        { icon: Shield, title: "Secure Process", text: "No charges were processed" },
                        { icon: RefreshCw, title: "Try Again", text: "Return to checkout anytime" }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:bg-white/10 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.text}</p>
                        </div>
                    ))}
                </div>

                {/* Action Buttons with hover effects */}
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                    {/* <button
                        className="flex-1 group relative px-8 py-4  bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl overflow-hidden transition-all duration-300"
                        onClick={() => window.history.back()}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center text-white text-lg font-medium">
                            <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                            Return Back
                        </span>
                    </button> */}
                    <button
                        className="flex-1 group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                        onClick={() => window.location.href = '/shop'}
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center text-white text-lg font-medium">
                            <ShoppingBag className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform duration-300" />
                            Continue Shopping
                        </span>
                    </button>
                </div>

                {/* Support Section with gradient border */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur"></div>
                    <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center">
                        <p className="text-black dark:text-gray-300 text-lg">
                            Need assistance? {' '}
                            <a
                                href="/contact"
                                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center transition-colors duration-300"
                            >
                                Contact our support team
                                <span className="ml-1 text-2xl leading-none relative top-[1px]">→</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PaymentCancel

{/* <div>
<div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header Section */}
// <div className="text-center mb-8">
//     <div className="flex justify-center mb-6">
//         <XCircle className="h-20 w-20 text-red-500" />
//     </div>
//     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//         Payment Cancelled
//     </h1>
//     <p className="text-gray-600 text-lg">
//         Your payment process has been cancelled. No charges have been made to your account.
//     </p>
// </div>

// {/* Order Summary Section */}
// <div className="bg-gray-50 rounded-xl p-6 mb-8">
//     <h2 className="text-lg font-semibold text-gray-800 mb-4">
//         What happens next?
//     </h2>
//     <ul className="space-y-3 text-gray-600">
//         <li className="flex items-start">
//             <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-red-400 mt-2 mr-3"></span>
//             Your cart items are still saved
//         </li>
//         <li className="flex items-start">
//             <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-red-400 mt-2 mr-3"></span>
//             You can return to checkout at any time
//         </li>
//         <li className="flex items-start">
//             <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-red-400 mt-2 mr-3"></span>
//             Contact support if you need assistance
//         </li>
//     </ul>
// </div>

{/* Action Buttons */ }
//     <div className="flex flex-col sm:flex-row gap-4">
//         <button
//             className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
//             onClick={() => window.history.back()}
//         >
//             <ArrowLeft className="h-5 w-5 mr-2" />
//             Go Back
//         </button>
//         <button
//             className="flex-1 inline-flex justify-center items-center px-6 py-3 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
//             onClick={() => window.location.href = '/shop'}
//         >
//             <ShoppingBag className="h-5 w-5 mr-2" />
//             Continue Shopping
//         </button>
//     </div>

//     {/* Support Section */}
//     <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//         <p className="text-gray-500">
//             Need help? <a href="/contact" className="text-red-500 hover:text-red-600 font-medium">Contact our support team</a>
//         </p>
//     </div>
// </div>
// </div>
// </div> */}