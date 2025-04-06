import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi';
import { data, useParams } from 'react-router-dom';
import TimelineStep from '../../../components/TimelineStep';
import { Package } from 'lucide-react';

const OrderDetails = () => {
    // const { user } = useSelector((state) => state.auth);
    const { orderId } = useParams()
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId)
    console.log(order);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No orders!</div>

    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"];
        return statuses.indexOf(status) < statuses.indexOf(order.status)
    }

    const isCurrent = (status) => order.status === status;

    const steps = [
        {
            status: 'pending',
            label: 'Pending',
            description: 'Your order has been created and is awaiting processing.',
            icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
        },
        {
            status: 'processing',
            label: 'Processing Order',
            description: 'We are preparing your items for shipment.',
            icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
        },
        {
            status: 'shipped',
            label: 'Shipping',
            description: 'Your order will be shipped soon.',
            icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
        },
        {
            status: 'completed',
            label: 'Order Confirmed',
            description: 'Your order has been successfully placed and confirmed.',
            icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
        },
    ];

    return (
        <>
            <section className=' rounded p-6'>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
                    <div className='container mx-auto px-4 py-16'>

                        <div className="mb-12 flex items-center justify-between">
                            <div className="space-y-1">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                    Order Status
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Track your order's journey from confirmation to delivery
                                </p>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
                            <div className=" inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
                                <div className="relative p-6 md:p-8">
                                    <div className="mb-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div className="space-y-1">
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                    <Package className="h-6 w-6" />
                                                    Order {order?.orderId}
                                                </h2>
                                               
                                            </div>
                                            <div className="mt-4 sm:mt-0">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 
              text-sm font-medium text-blue-700 dark:text-blue-400 ring-1 ring-blue-700/10 dark:ring-blue-400/20">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                                    </span>
                                                    {order?.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {
                                            steps.map((step, index) => (
                                                <TimelineStep
                                                    key={index}
                                                    step={step}
                                                    order={order}
                                                    isCompleted={isCompleted(step.status)}
                                                    isCurrent={isCurrent(step.status)}
                                                    isLastStep={index === steps.length - 1}
                                                    icon={step.icon}
                                                    description={step.description}
                                                />
                                            ))
                                        }
                                    </div>



                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
         

        </>
    )
}

export default OrderDetails

// import React from 'react';
// import TimelineStep from './components/TimelineStep';
// import { Sun, Moon, Package } from 'lucide-react';

// const orderSteps = [
//   {
//     status: 'completed',
//     label: 'Order Confirmed',
//     description: 'Your order has been successfully placed and confirmed. We\'ll start processing it right away.',
//     updatedAt: '2024-02-28T10:00:00',
//   },
//   {
//     status: 'processing',
//     label: 'Processing Order',
//     description: 'Our team is carefully preparing your items for shipment. We\'ll ensure everything is perfect.',
//     updatedAt: '2024-02-28T11:30:00',
//   },
//   {
//     status: 'pending',
//     label: 'Shipping',
//     description: 'Your order will be handed over to our shipping partner for delivery to your location.',
//     updatedAt: null,
//   },
//   {
//     status: 'pending',
//     label: 'Delivery',
//     description: 'Your package will be delivered to your specified address. Make sure someone is available to receive it.',
//     updatedAt: null,
//   },
// ];

// function App() {
//   const [isDarkMode, setIsDarkMode] = React.useState(false);

//   return (
//     <div className={isDarkMode ? 'dark' : ''}>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
//         <div className="container mx-auto px-4 py-16">
//           <div className="mb-12 flex items-center justify-between">
//             <div className="space-y-1">
//               <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//                 Order Status
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Track your order's journey from confirmation to delivery
//               </p>
//             </div>
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className="rounded-full bg-white dark:bg-gray-800 p-3 text-sm font-medium text-gray-900 dark:text-white 
//                 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
//                 ring-1 ring-gray-200 dark:ring-gray-700"
//             >
//               {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             </button>
//           </div>

//           <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20" />
            
//             <div className="relative p-6 md:p-8">
//               <div className="mb-8">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                   <div className="space-y-1">
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                       <Package className="h-6 w-6" />
//                       Order #2024-0123
//                     </h2>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Placed on February 28, 2024 at 10:00 AM
//                     </p>
//                   </div>
//                   <div className="mt-4 sm:mt-0">
//                     <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 
//                       text-sm font-medium text-blue-700 dark:text-blue-400 ring-1 ring-blue-700/10 dark:ring-blue-400/20">
//                       <span className="relative flex h-2 w-2">
//                         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
//                         <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
//                       </span>
//                       In Progress
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {orderSteps.map((step, index) => (
//                   <TimelineStep
//                     key={index}
//                     step={step}
//                     isCompleted={step.status === 'completed'}
//                     isCurrent={step.status === 'processing'}
//                     isLastStep={index === orderSteps.length - 1}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;