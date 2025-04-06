import React from 'react'
import {
  Truck,
  MapPin,
  Phone,
  Mail,
  Package,
  Clock,
  CheckCircle2,
  Building2,
  User,
  Trash2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi';



const UserAddress = () => {

  //   const location = useLocation();
  //   const queryParams = new URLSearchParams(location.search);
  //   const orderId = queryParams.get("orderId");
  //  console.log(orderId);

  //    const { data, error, isLoading } = useGetOrderByIdQuery(orderId)
  //   console.log(data);



  const dispatch = useDispatch()
  const addresses = useSelector((state) => state.address.userAddress);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-indigo-50 dark:bg-indigo-900/30  px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Order #{index + 1}
                    </h2>
                  </div>
                  

                </div>
              </div>

            </div>

            <div className="p-6">


              {/* Shipping Address Card */}
              <div className="bg-gray-50 dark:bg-gray-700/50 shadow-xl  dark:shadow-blue-500/50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Shipping Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {address.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {address.addressLine1}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {address.addressLine2}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {address.city}, {address.state}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-700 dark:text-gray-300">
                        {address.phone}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-700 dark:text-gray-300">
                        {address.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* address Items */}

            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default UserAddress






// import React from 'react'
// import {
//   Truck,
//   MapPin,
//   Phone,
//   Mail,
//   Package,
//   Clock,
//   CheckCircle2,
//   Building2,
//   User
// } from 'lucide-react';

// const UserAddress = () => {

//   const orders = [
//     {
//       id: "ORD001",
//       status: "delivered",
//       estimatedDelivery: "2024-03-20",
//       trackingNumber: "TRK789456123",
//       items: [
//         { name: "Cotton T-Shirt", quantity: 2, price: 599.99 },
//         { name: "Denim Jeans", quantity: 1, price: 1299.99 }
//       ],
//       shippingAddress: {
//         fullName: "Rahul Sharma",
//         street: "742, Regal Avenue, Bandra West",
//         city: "Mumbai",
//         state: "Maharashtra",
//         pincode: "400050",
//         phone: "+91 98765 43210",
//         email: "rahul.sharma@example.com",
//         landmark: "Near Coffee House"
//       }
//     },
//     {
//       id: "ORD002",
//       status: "in-transit",
//       estimatedDelivery: "2024-03-22",
//       trackingNumber: "TRK789456124",
//       items: [
//         { name: "Formal Shirt", quantity: 1, price: 899.99 },
//         { name: "Blazer", quantity: 1, price: 2499.99 }
//       ],
//       shippingAddress: {
//         fullName: "Priya Patel",
//         street: "123, Green Park Extension",
//         city: "New Delhi",
//         state: "Delhi",
//         pincode: "110016",
//         phone: "+91 98765 43211",
//         email: "priya.patel@example.com",
//         landmark: "Opposite Metro Station"
//       }
//     }
//   ];
//   return (
//     <div>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto space-y-8">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
//             >
//               {/* Order Header */}
//               <div className="bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         Order #{order.id}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">
//                         Tracking ID: {order.trackingNumber}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                     <span className="text-sm text-gray-600 dark:text-gray-300">
//                       Expected by {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {/* Status Badge */}
//                 <div className="mb-6">
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.status === 'delivered'
//                       ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
//                       : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
//                     }`}>
//                     <CheckCircle2 className="w-4 h-4 mr-2" />
//                     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                   </span>
//                 </div>

//                 {/* Shipping Address Card */}
//                 <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
//                   <div className="flex items-center space-x-2 mb-4">
//                     <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Shipping Address
//                     </h3>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="flex items-start space-x-3">
//                         <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-white">
//                             {order.shippingAddress.fullName}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-start space-x-3">
//                         <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
//                         <div>
//                           <p className="text-gray-700 dark:text-gray-300">
//                             {order.shippingAddress.street}
//                           </p>
//                           <p className="text-gray-700 dark:text-gray-300">
//                             {order.shippingAddress.landmark}
//                           </p>
//                           <p className="text-gray-700 dark:text-gray-300">
//                             {order.shippingAddress.city}, {order.shippingAddress.state}
//                           </p>
//                           <p className="text-gray-700 dark:text-gray-300">
//                             {order.shippingAddress.pincode}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex items-center space-x-3">
//                         <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                         <p className="text-gray-700 dark:text-gray-300">
//                           {order.shippingAddress.phone}
//                         </p>
//                       </div>

//                       <div className="flex items-center space-x-3">
//                         <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                         <p className="text-gray-700 dark:text-gray-300">
//                           {order.shippingAddress.email}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="mt-6">
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
//                     Order Items
//                   </h4>
//                   <div className="space-y-3">
//                     {order.items.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
//                             <span className="text-indigo-600 dark:text-indigo-400 text-sm">
//                               {item.quantity}x
//                             </span>
//                           </span>
//                           <span className="text-gray-900 dark:text-white">
//                             {item.name}
//                           </span>
//                         </div>
//                         <span className="text-gray-900 dark:text-white font-medium">
//                           ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-4 text-right">
//                     <p className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Total: ₹{order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
//                         .toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserAddress