import React, { useState } from 'react'
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi'
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12)

    const { data: { products = [], totalProducts, totalPages } = {}, isLoading, error, refetch } = useFetchAllProductsQuery({
        category: '',
        subCategory: '',
        sizes: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage
    })
    // console.log(products);
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const [deleteProduct] = useDeleteProductMutation()
    const handleDeleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id).unwrap();
                await refetch();

                Swal.fire({
                    title: 'Deleted!',
                    text: 'The product has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error("Error deleting product", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while deleting the product.',
                    icon: 'error'
                });
            }
        } else {
            Swal.fire({
                title: 'Cancelled',
                text: 'The product is safe.',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
        }
    }

    return (
        <>
            {
                isLoading && <div>Loading...</div>

            }
            {
                error && <div>Error loading products.</div>
            }
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#1a202c] w-full mb-6 shadow-xl dark:shadow-blue-500/50 rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Products</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"><Link to={'/dashboard/add-product'}>Add Product</Link></button>
                                </div>
                            </div>
                            <h3 className='my-4  text-sm'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Product Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Price
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit or manage
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        products && products.map((product, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {product?.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {product?.price}

                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                                                    <Link to={`/dashboard/update-product/${product._id}`}> <i className=" ri-edit-box-fill">Edit</i></Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                        className='bg-red-600 text-white px-2 py-1'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* pagination */}
                <div className='mt-6 flex items-center justify-center'>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}>{index + 1}</button>
                        ))
                    }
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                </div>

                <footer className="relative pt-8 pb-6 mt-16">
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
            </section>
        </>
    )
}

export default ManageProduct