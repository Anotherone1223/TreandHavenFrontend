import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';
import { useGetAdminsStatsQuery } from '../../../../redux/features/stats/statsApi';
import Swal from 'sweetalert2';

const UpdateOrderModel = ({ order, isOpen, onClose }) => {
    const [status, setStatus] = useState(order?.status);

    const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation()
    const { refetch } = useGetAdminsStatsQuery()

    const handleUpdateOrderStatus = async () => {
        try {
            await updateOrderStatus({ id: order?._id, status }).unwrap();

            Swal.fire({
                title: 'Updated!',
                text: 'Order updated successfully.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            // If order is completed, refetch admin stats
            if (status === "completed") {
                await refetch();
            }


            onClose();
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating the product.',
                icon: 'error'
            });
            console.error("Failed to update order status:", err);
        }
    }

    if (!isOpen) return null;


    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <div className="bg-white dark:bg-[#1a202c]  p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 dark:text-white" htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border dark:text-black border-gray-300 p-2 rounded w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">completed</option>
                    </select>
                </div>

                {error && <p className="text-red-500 mb-4">Failed to update status.</p>}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderModel