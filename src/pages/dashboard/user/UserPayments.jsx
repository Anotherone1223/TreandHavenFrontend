import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import { ArrowUpRight, Calendar, Clock, CreditCard } from 'lucide-react';


const UserPayments = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: ordersdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email)

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>No order found!</div>
    const orders = ordersdata.orders || {};
    const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);
    console.log(totalPayment)

    return ( 
        // <div className='py-6 px-4 '>
        //     <h3 className='text-xl font-semibold mb-4'>Total Payments</h3>
        //     <div>
        //         <p className='text-lg font-medium text-gray-800 mb-5 dark:text-emerald-400'>Total Spent: ₹{totalPayment ? totalPayment : 0}</p>
        //         <ul>
        //             {
        //                 orders && orders.map((item, index) => (
        //                     <li key={index}>
        //                         <h5 className='font-medium text-gray-800 mb-2 dark:text-sky-400'>Order #{index + 1}</h5>
        //                         <div>
        //                             <span className='text-gray-600 dark:text-white'>Order Amount: ₹{item?.amount.toFixed(2)}</span>
        //                         </div>
        //                         <div className='flex md:flex-row items-center space-x-2 '>
        //                             <span className='text-gray-600 dark:text-white'>Date: {new Date(item?.createdAt).toLocaleString()}</span>
        //                             <p className='text-gray-600 dark:text-white'>
        //                                 | Status: <span className={`ml-2 py-[2px] px-2 text-sm rounded ${item?.status === 'completed' ? 'bg-green-100 text-green-700' : item?.status === 'pending' ? 'bg-red-200 text-red-700' : item?.status === 'processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-200 text-blue-700'} `}>{item?.status}</span>
        //                             </p>
        //                         </div>
        //                         <hr className='my-2' />
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //     </div>

        // </div>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment History</h2>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Spent: ₹{totalPayment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          
          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900">
                      <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{index + 1}</span>
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order Amount
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.createdAt).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric'
                        })}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{new Date(item.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        item.status === 'pending' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    {/* <ArrowUpRight className="w-5 h-5 text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors" /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Successful Payments</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {orders.filter(o => o.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending Payments</h3>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Processing</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {orders.filter(o => o.status === 'processing').length}
            </p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default UserPayments
