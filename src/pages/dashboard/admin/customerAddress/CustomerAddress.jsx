import React from 'react'
import { Mail, MapPin, Phone, User, Building, Globe2, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserAddress } from '../../../../redux/address/AddressSlice';
import Swal from 'sweetalert2';


const CustomerAddress = () => {
    // const addresses = [
    //     {
    //         id: 1,
    //         fullName: 'John Doe',
    //         email: 'john@example.com',
    //         addressLine1: '123 Main Street',
    //         addressLine2: 'Apt 4B',
    //         city: 'New York',
    //         state: 'NY',
    //         zipCode: '10001',
    //         phone: '+1 (555) 123-4567',
    //     },
    //     {
    //         id: 2,
    //         fullName: 'Jane Smith',
    //         email: 'jane@example.com',
    //         addressLine1: '456 Park Avenue',
    //         addressLine2: 'Suite 789',
    //         city: 'Los Angeles',
    //         state: 'CA',
    //         zipCode: '90001',
    //         phone: '+1 (555) 987-6543',
    //     },
    // ];

 const dispatch = useDispatch()
    const addresses = useSelector((state) => state.address.allUserAddresses);

    console.log(addresses);

    
const handleDeleteAddress = (index) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This address will be removed from your list!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(removeUserAddress(index));
      Swal.fire({
        title: 'Deleted!',
        text: 'Address has been removed.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

    return (
        <div>
                 <h2 className='text-2xl font-semibold mb-4 py-3'>Users's Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {addresses.map((address,index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
            rounded-2xl overflow-hidden group
            border border-gray-100 dark:border-gray-700
            shadow-[0_8px_30px_rgba(147,51,234,0.07)] dark:shadow-[0_8px_30px_rgba(79,70,229,0.2)]
            hover:shadow-[0_20px_40px_rgba(147,51,234,0.15)] dark:hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)]
            transition-all duration-300 ease-in-out
            transform hover:-translate-y-1
            before:absolute before:inset-0 before:z-0 
            before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent dark:before:from-white/[0.02]"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 
            shadow-[0_2px_10px_rgba(147,51,234,0.3)] dark:shadow-[0_2px_10px_rgba(147,51,234,0.2)]"></div>
          
          <div className="relative p-6 space-y-6 z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 
                dark:from-blue-900 dark:to-purple-900 rounded-xl
                shadow-[0_4px_20px_rgba(59,130,246,0.2)] dark:shadow-[0_4px_20px_rgba(147,51,234,0.2)]">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {address.fullName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{address.email}</span>
                </div>
              </div>
              
            </div>  
            <div className="space-y-4">
              <div className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                shadow-[inset_0_1px_2px_rgba(59,130,246,0.1)] dark:shadow-[inset_0_1px_2px_rgba(147,51,234,0.2)]">
                <Building className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-1" />
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-200">{address.addressLine1}</p>
                  {address.addressLine2 && (
                    <p className="text-gray-600 dark:text-gray-400">{address.addressLine2}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                shadow-[inset_0_1px_2px_rgba(147,51,234,0.1)] dark:shadow-[inset_0_1px_2px_rgba(147,51,234,0.2)]">
                <Globe2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                shadow-[inset_0_1px_2px_rgba(59,130,246,0.1)] dark:shadow-[inset_0_1px_2px_rgba(147,51,234,0.2)]">
                <Phone className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <p className="text-gray-800 dark:text-gray-200">{address.phone}</p>
              </div>
             <div>
             <button  onClick={() => handleDeleteAddress(index)}
              className='flex items-center  space-x-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600'
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
             </button>
             </div>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
    )
}

export default CustomerAddress





// import React from 'react';
// import { Mail, MapPin, Phone, User, Building, Globe2 } from 'lucide-react';

// // Sample data - in a real app, this would come from your backend
// const addresses = [
//   {
//     id: 1,
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     addressLine1: '123 Main Street',
//     addressLine2: 'Apt 4B',
//     city: 'New York',
//     state: 'NY',
//     zipCode: '10001',
//     phone: '+1 (555) 123-4567',
//   },
//   {
//     id: 2,
//     fullName: 'Jane Smith',
//     email: 'jane@example.com',
//     addressLine1: '456 Park Avenue',
//     addressLine2: 'Suite 789',
//     city: 'Los Angeles',
//     state: 'CA',
//     zipCode: '90001',
//     phone: '+1 (555) 987-6543',
//   },
// ];

// const AddressList = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {addresses.map((address) => (
//         <div
//           key={address.id}
//           className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
//             rounded-2xl overflow-hidden group
//             border border-gray-100 dark:border-gray-700
//             shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
//             hover:shadow-[0_20px_40px_rgb(0,0,0,0.07)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]
//             transition-all duration-300 ease-in-out
//             transform hover:-translate-y-1
//             before:absolute before:inset-0 before:z-0 
//             before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent dark:before:from-white/[0.02]"
//         >
//           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 
//             shadow-[0_2px_10px_rgb(147,51,234,0.3)] dark:shadow-[0_2px_10px_rgb(147,51,234,0.2)]"></div>
          
//           <div className="relative p-6 space-y-6 z-10">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 
//                 dark:from-blue-900 dark:to-purple-900 rounded-xl
//                 shadow-[0_4px_20px_rgb(59,130,246,0.15)] dark:shadow-[0_4px_20px_rgb(59,130,246,0.1)]">
//                 <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                   {address.fullName}
//                 </h3>
//                 <div className="flex items-center gap-2 mt-1">
//                   <Mail className="w-4 h-4 text-purple-500 dark:text-purple-400" />
//                   <span className="text-sm text-gray-600 dark:text-gray-300">{address.email}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
//                 shadow-[inset_0_1px_2px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_2px_rgb(0,0,0,0.2)]">
//                 <Building className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-1" />
//                 <div className="space-y-1">
//                   <p className="text-gray-800 dark:text-gray-200">{address.addressLine1}</p>
//                   {address.addressLine2 && (
//                     <p className="text-gray-600 dark:text-gray-400">{address.addressLine2}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
//                 shadow-[inset_0_1px_2px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_2px_rgb(0,0,0,0.2)]">
//                 <Globe2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />
//                 <div>
//                   <p className="text-gray-800 dark:text-gray-200">
//                     {address.city}, {address.state} {address.zipCode}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3 items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl
//                 shadow-[inset_0_1px_2px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_2px_rgb(0,0,0,0.2)]">
//                 <Phone className="w-5 h-5 text-blue-500 dark:text-blue-400" />
//                 <p className="text-gray-800 dark:text-gray-200">{address.phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AddressList;