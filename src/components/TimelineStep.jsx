import React from 'react'
import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';

const getStatusConfig = (status) => {
    const configs = {
        pending: {
            icon: Clock,
            bgColor: 'bg-amber-500',
            textColor: 'text-amber-500',
            borderColor: 'border-amber-500',
            gradientFrom: 'from-amber-500/20',
            gradientTo: 'to-amber-500/0',
        },
        processing: {
            icon: Package,
            bgColor: 'bg-blue-500',
            textColor: 'text-blue-500',
            borderColor: 'border-blue-500',
            gradientFrom: 'from-blue-500/20',
            gradientTo: 'to-blue-500/0',
        },
        shipped: {
            icon: Truck,
            bgColor: 'bg-indigo-500',
            textColor: 'text-indigo-500',
            borderColor: 'border-indigo-500',
            gradientFrom: 'from-indigo-500/20',
            gradientTo: 'to-indigo-500/0',
        },
        completed: {
            icon: CheckCircle,
            bgColor: 'bg-emerald-500',
            textColor: 'text-emerald-500',
            borderColor: 'border-emerald-500',
            gradientFrom: 'from-emerald-500/20',
            gradientTo: 'to-emerald-500/0',
        },
        failed: {
            icon: XCircle,
            bgColor: 'bg-rose-500',
            textColor: 'text-rose-500',
            borderColor: 'border-rose-500',
            gradientFrom: 'from-rose-500/20',
            gradientTo: 'to-rose-500/0',
        },
    };
    return configs[status] || configs.pending;
};

const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {



    const config = getStatusConfig(step.status);
    const Icon = config.icon;

    return (
        <li className="relative flex gap-8 pb-10 last:pb-0 group">
            <div className="flex flex-col items-center">
                <div
                    className={`
            relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] transition-all duration-500
            ${isCompleted ? config.bgColor + ' border-transparent' : 'bg-transparent ' + config.borderColor}
            ${isCurrent ? 'scale-110 shadow-xl ' + config.borderColor : ''}
            before:absolute before:inset-[-8px] before:rounded-full before:border-2 before:border-transparent before:transition-all
            before:duration-500 group-hover:before:border-current
            ${isCompleted || isCurrent ? 'before:opacity-20 ' + config.borderColor : 'before:opacity-0'}
          `}
                >
                    <Icon
                        className={`h-7 w-7 transition-transform duration-500 group-hover:scale-110 ${isCompleted ? 'text-white' : config.textColor
                            }`}
                    />
                </div>
                {!isLastStep && (
                    <div className="relative h-full w-px">
                        <div
                            className={`absolute inset-0 w-px transition-all duration-500
                ${isCompleted ? config.bgColor : 'bg-gray-200 dark:bg-gray-700'}
              `}
                        />
                        <div
                            className={`
                absolute inset-0 w-px opacity-0 group-hover:opacity-100
                bg-gradient-to-b ${config.gradientFrom} ${config.gradientTo}
                transition-all duration-500
              `}
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col pb-10 last:pb-0">
                <div
                    className={`
            relative rounded-lg p-4 transition-all duration-300
            ${isCurrent ? 'bg-gray-50 dark:bg-gray-800/50 shadow-lg' : ''}
            group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50
            group-hover:shadow-md
          `}
                >
                    <div className="flex flex-col space-y-2">
                        <span
                            className={`text-base font-semibold tracking-wide ${isCurrent
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {step.label}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
                        </span>
                    </div>
                    <p
                        className={`mt-2 text-sm leading-relaxed ${isCurrent
                            ? 'text-gray-600 dark:text-gray-300'
                            : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {step.description}
                    </p>
                    {isCurrent && (
                        <div
                            className={`absolute -left-1 top-6 h-3 w-3 rotate-45 
                bg-gray-50 dark:bg-gray-800/50 transition-all duration-300
                group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50`}
                        />
                    )}
                </div>
            </div>
        </li>
    )
}

export default TimelineStep



// import React from 'react';
// import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';

// const getStatusConfig = (status: string) => {
//   const configs = {
//     pending: {
//       icon: Clock,
//       bgColor: 'bg-amber-500',
//       textColor: 'text-amber-500',
//       borderColor: 'border-amber-500',
//       gradientFrom: 'from-amber-500/20',
//       gradientTo: 'to-amber-500/0',
//     },
//     processing: {
//       icon: Package,
//       bgColor: 'bg-blue-500',
//       textColor: 'text-blue-500',
//       borderColor: 'border-blue-500',
//       gradientFrom: 'from-blue-500/20',
//       gradientTo: 'to-blue-500/0',
//     },
//     shipped: {
//       icon: Truck,
//       bgColor: 'bg-indigo-500',
//       textColor: 'text-indigo-500',
//       borderColor: 'border-indigo-500',
//       gradientFrom: 'from-indigo-500/20',
//       gradientTo: 'to-indigo-500/0',
//     },
//     completed: {
//       icon: CheckCircle,
//       bgColor: 'bg-emerald-500',
//       textColor: 'text-emerald-500',
//       borderColor: 'border-emerald-500',
//       gradientFrom: 'from-emerald-500/20',
//       gradientTo: 'to-emerald-500/0',
//     },
//     failed: {
//       icon: XCircle,
//       bgColor: 'bg-rose-500',
//       textColor: 'text-rose-500',
//       borderColor: 'border-rose-500',
//       gradientFrom: 'from-rose-500/20',
//       gradientTo: 'to-rose-500/0',
//     },
//   };
//   return configs[status] || configs.pending;
// };

// const TimelineStep = ({ step, isCompleted, isCurrent, isLastStep }) => {
//   const config = getStatusConfig(step.status);
//   const Icon = config.icon;

//   return (
//     <li className="relative flex gap-8 pb-10 last:pb-0 group">
//       <div className="flex flex-col items-center">
//         <div
//           className={`
//             relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] transition-all duration-500
//             ${isCompleted ? config.bgColor + ' border-transparent' : 'bg-transparent ' + config.borderColor}
//             ${isCurrent ? 'scale-110 shadow-xl ' + config.borderColor : ''}
//             before:absolute before:inset-[-8px] before:rounded-full before:border-2 before:border-transparent before:transition-all
//             before:duration-500 group-hover:before:border-current
//             ${isCompleted || isCurrent ? 'before:opacity-20 ' + config.borderColor : 'before:opacity-0'}
//           `}
//         >
//           <Icon
//             className={`h-7 w-7 transition-transform duration-500 group-hover:scale-110 ${
//               isCompleted ? 'text-white' : config.textColor
//             }`}
//           />
//         </div>
//         {!isLastStep && (
//           <div className="relative h-full w-px">
//             <div
//               className={`absolute inset-0 w-px transition-all duration-500
//                 ${isCompleted ? config.bgColor : 'bg-gray-200 dark:bg-gray-700'}
//               `}
//             />
//             <div
//               className={`
//                 absolute inset-0 w-px opacity-0 group-hover:opacity-100
//                 bg-gradient-to-b ${config.gradientFrom} ${config.gradientTo}
//                 transition-all duration-500
//               `}
//             />
//           </div>
//         )}
//       </div>

//       <div className="flex flex-1 flex-col pb-10 last:pb-0">
//         <div
//           className={`
//             relative rounded-lg p-4 transition-all duration-300
//             ${isCurrent ? 'bg-gray-50 dark:bg-gray-800/50 shadow-lg' : ''}
//             group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50
//             group-hover:shadow-md
//           `}
//         >
//           <div className="flex flex-col space-y-1">
//             <span
//               className={`text-base font-semibold tracking-wide ${
//                 isCurrent
//                   ? 'text-gray-900 dark:text-white'
//                   : 'text-gray-700 dark:text-gray-300'
//               }`}
//             >
//               {step.label}
//             </span>
//             <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
//               {step.updatedAt
//                 ? new Date(step.updatedAt).toLocaleString('en-US', {
//                     dateStyle: 'medium',
//                     timeStyle: 'short',
//                   })
//                 : 'Pending'}
//             </span>
//           </div>
//           <p
//             className={`mt-2 text-sm leading-relaxed ${
//               isCurrent
//                 ? 'text-gray-600 dark:text-gray-300'
//                 : 'text-gray-500 dark:text-gray-400'
//             }`}
//           >
//             {step.description}
//           </p>
//           {isCurrent && (
//             <div
//               className={`absolute -left-1 top-6 h-3 w-3 rotate-45
//                 bg-gray-50 dark:bg-gray-800/50 transition-all duration-300
//                 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50`}
//             />
//           )}
//         </div>
//       </div>
//     </li>
//   );
// };

// export default TimelineStep;