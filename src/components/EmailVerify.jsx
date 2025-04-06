import React from 'react'

const EmailVerify = () => {
  return (
    <div>EmailVerify</div>
  )
}

export default EmailVerify

// import React from 'react';
// import { Mail, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';

// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         {/* Logo and Brand Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4 animate-bounce">
//             <ShoppingBag className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
//           <p className="text-gray-600">We've sent a verification link to your email address</p>
//         </div>

//         {/* Email Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:scale-105 transition-transform duration-300">
//           <div className="flex items-center justify-center w-full mb-6">
//             <div className="relative">
//               <Mail className="w-12 h-12 text-purple-600" />
//               <CheckCircle2 className="w-6 h-6 text-green-500 absolute -top-1 -right-1" />
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="text-center">
//               <p className="text-gray-600 mb-2">
//                 Please check your email inbox and click the verification link to activate your account.
//               </p>
//               <p className="text-sm text-gray-500">
//                 If you don't see the email, check your spam folder.
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-4">
//               <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
//                 Open Email App
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </button>
              
//               <button className="w-full bg-transparent text-purple-600 py-3 px-6 rounded-lg font-medium hover:bg-purple-50 border border-purple-200">
//                 Resend Verification Email
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Help Section */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Didn't receive the email? Check your spam filter or
//             <a href="#" className="text-purple-600 hover:text-purple-700 font-medium ml-1">
//               contact support
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Background Decorative Elements */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
//         <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>
//     </div>
//   );
// }

// export default App;