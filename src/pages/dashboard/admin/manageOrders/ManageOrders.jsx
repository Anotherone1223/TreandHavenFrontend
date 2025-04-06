import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery, useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi'
import { formatDate } from './../../../../utils/formateDate';
import { Link } from 'react-router-dom';
import UpdateOrderModel from './UpdateOrderModel';
import Swal from 'sweetalert2';

const ManageOrders = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery()
    const { data: orderdata } = useGetOrdersByEmailQuery()
    const ordersView = orderdata?.ordersView;
    // console.log(ordersView);


    // console.log(data);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [deleteOrder] = useDeleteOrderMutation();

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    }

    const handleDeleteOder = async (orderId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This order will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });


        if (result.isConfirmed) {
            try {
                await deleteOrder(orderId).unwrap();
                await refetch();

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Order has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                refetch();
            } catch (error) {
                console.error("Failed to delete order:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while deleting the order.',
                    icon: 'error'
                });
            }
        }

    }

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Something went wrong!</div>

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'processing':
                return 'bg-blue-500';
            case 'shipped':
                return 'bg-green-500';
            case 'completed':
                return 'bg-gray-500';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className='section__container p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Manage Orders</h2>
            <table className='min-w-full bg-white dark:bg-[#1a202c] border border-gray-200 shadow-xl dark:shadow-blue-500/50 rounded-lg'>
                <thead className='bg-gray-100 dark:bg-[#1a202c]'>
                    <tr>
                        <th className="py-3 px-4 border-b">
                            No.
                        </th>
                        <th className='py-3 px-4 border-b'>Order Id</th>
                        <th className='py-3 px-4 border-b'>Customer</th>
                        <th className='py-3 px-4 border-b'>Status</th>
                        <th className='py-3 px-4 border-b'>Date</th>
                        <th className='py-3 px-4 border-b'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders && orders.map((order, index) => (
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                    {index + 1}
                                </th>
                                <td className='py-3 px-4 border-b'>{order?.orderId}</td>
                                <td className='py-3 px-4 border-b'>{order?.email}</td>
                                <td className='py-3 px-4 border-b'>
                                    <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>{order?.status}</span>
                                </td>
                                <td className='py-3 px-4 border-b'>{formatDate(order?.updatedAt)}</td>
                                <td className='py-3 px-4 border-b flex items-center space-x-4'>
                                    <Link to={`/orders/${order?._id}`} className='underline hover:text-primary'>view order</Link>

                                    <button className="text-green-500 hover:underline" onClick={() => handleEditOrder(order)}>Edit</button>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDeleteOder(order?._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            {/* Update Order Model */}
            {
                selectedOrder && (
                    <UpdateOrderModel
                        order={selectedOrder}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                )
            }
            <footer className=" py-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                <p className="text-blueGray-500 ">Made By TreadHaven Developer</p>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ManageOrders