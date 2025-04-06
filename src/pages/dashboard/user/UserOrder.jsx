import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import { Link } from 'react-router-dom';
import { Package2, ShoppingBag, Clock, CheckCircle2, AlertCircle, Search, Filter, ArrowUpDown } from 'lucide-react';

const UserOrder = () => {
    
    const { user } = useSelector((state) => state.auth);
    const { data: orderdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
    const orders = orderdata?.orders;
    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'processing':
                return <Clock className="w-5 h-5 text-blue-500 animate-spin-slow" />;
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-amber-500" />;
            default:
                return <Package2 className="w-5 h-5 text-gray-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="space-y-6 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-indigo-200 dark:border-indigo-900 rounded-full animate-pulse"></div>
                        <div className="absolute inset-3 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                        <Package2 className="absolute inset-6 w-12 h-12 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-md w-full mx-4 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform transition-all">
                    <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-pulse"></div>
                            <ShoppingBag className="absolute inset-4 w-16 h-16 text-red-500 dark:text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Orders Found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Your shopping journey awaits! Start exploring our collection.</p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Your Orders
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Track and manage your shopping journey
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                    <th className="group px-6 py-4 text-left">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                                            Order Details
                                            <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </th>
                                    <th className="group px-6 py-4 text-left">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                                            Date
                                            <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </th>
                                    <th className="group px-6 py-4 text-left">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                                            Status
                                            <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </th>
                                    <th className="group px-6 py-4 text-left">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
                                            Total
                                            <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {orders?.map((order, index) => (
                                    <tr
                                        key={order?._id}
                                        className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                        >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 group-hover:scale-110 transition-transform duration-200">
                                                    <Package2 className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Order #{order?.orderId}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {order?.items?.length} items
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {new Date(order?.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(order?.createdAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(order?.status)}
                                                <span
                                                    className={`ml-2 px-3 py-1 rounded-full text-xs font-medium
                            ${order?.status === 'completed'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                            : order?.status === 'pending'
                                                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                                                : order?.status === 'processing'
                                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                                                        }`}
                                                >
                                                    {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                ₹{order?.amount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <Link
                                                to={`/orders/${order?._id}`}
                                                className="inline-flex items-center px-4 py-2 rounded-lg text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserOrder
                                        // const { user } = useSelector((state) => state.auth);
                                        // const { data: orderdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email)
                                        // const orders = orderdata?.orders;
                                        // console.log(orders);
                                    
                                    
                                        // if (isLoading) return <div>Loading...</div>
                                        // if (error) return <div>No order found!</div>
                                        // return (
                                        //     <section className="py-1 bg-blueGray-50">
                                        //         <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                                        //             <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#1a202c] w-full mb-6 shadow-xl dark:shadow-blue-500/50 rounded ">
                                        //                 <div className="rounded-t mb-0 px-4 py-3 border-0">
                                        //                     <div className="flex flex-wrap items-center">
                                        //                         <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        //                             <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
                                        //                         </div>
                                        //                         <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        //                             <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                        //                         </div>
                                        //                     </div>
                                        //                 </div>
                                    
                                        //                 <div className="block w-full overflow-x-auto">
                                        //                     <table className="items-center bg-transparent w-full border-collapse ">
                                        //                         <thead>
                                        //                             <tr>
                                        //                                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        //                                     #
                                        //                                 </th>
                                        //                                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        //                                     Order ID
                                        //                                 </th>
                                        //                                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        //                                     Date
                                        //                                 </th>
                                        //                                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        //                                     Status
                                        //                                 </th>
                                        //                                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        //                                     Total
                                        //                                 </th>
                                        //                                 <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        //                                     View Order
                                        //                                 </th>
                                        //                             </tr>
                                        //                         </thead>
                                    
                                        //                         <tbody>
                                        //                             {
                                        //                                 orders && orders.map((order, index) => (
                                        //                                     <tr key={index}>
                                        //                                         <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        //                                             {index + 1}
                                        //                                         </th>
                                        //                                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        //                                             {order?.orderId}
                                        //                                         </td>
                                        //                                         <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        //                                             {
                                        //                                                 new Date(order?.createdAt).toLocaleDateString()
                                        //                                             }
                                        //                                         </td>
                                        //                                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        //                                             <span className={`p-1 rounded 
                                        //                                         ${order?.status === 'completed' ? 'bg-green-100 text-green-700' : order?.status === 'pending' ? 'bg-red-100 text-red-700' : order?.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>{order?.status}</span>
                                        //                                         </td>
                                        //                                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        //                                             ₹{order?.amount}
                                        //                                         </td>
                                        //                                         <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        //                                             <Link to={`/orders/${order?._id}`} className='underline hover:text-primary'>view order</Link>
                                        //                                         </td>
                                        //                                         {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        //                                             <Link 
                                        //                                                 to={`/dashboard/address?orderId=${order?._id}`} 
                                        //                                                 className="underline hover:text-primary"
                                        //                                             >
                                        //                                                 View Address
                                        //                                             </Link>
                                        //                                         </td> */}
                                        //                                     </tr>
                                        //                                 ))
                                        //                             }
                                    
                                    
                                        //                         </tbody>
                                    
                                        //                     </table>
                                        //                 </div>
                                        //             </div>
                                        //         </div>
                                        //         <footer className="relative pt-8 pb-6 mt-16">
                                        //             <div className="container mx-auto px-4">
                                        //                 <div className="flex flex-wrap items-center md:justify-between justify-center">
                                        //                     <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                        //                         <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    
                                        //                         </div>
                                        //                     </div>
                                        //                 </div>
                                        //             </div>
                                        //         </footer>
                                        //     </section>
                                        // )