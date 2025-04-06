import React, { useEffect, useState } from 'react'
import { products } from './../../data/products';
import ProductsCard from './ProductsCard';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import ShopPageAnimation from '../../components/Animations/ShopPageAnimation';



const filters = {
    catrgoryies: ['Women', 'Men', 'Kids'],
    subCategories: ['Topwear', 'Bottomwear', 'Winterwear'],
    Sizes1: ['S', 'M', 'L', 'XL', 'XXL'],
    PriceRanges: [
        { label: 'Under ₹100', min: 0, max: 100 },
        { label: '₹100 - ₹200', min: 100, max: 200 },
        { label: '₹300 - ₹400', min: 300, max: 400 },
        { label: '₹500 and above', min: 500, max: Infinity },

    ]

}

const ShopPage = () => {
    // const [productsFilter, setProductsFilter] = useState(products)
    // console.log(productsFilter);

    const [filtersState, setFiltersState] = useState({
        category: 'all',
        subCategory: 'all',
        sizes: 'all',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8)

    const { category, subCategory, sizes, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    const { data, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        subCategory: subCategory !== 'all' ? subCategory : '',
        sizes: sizes !== 'all' ? sizes : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
        sortBy: "name",
        sortOrder: "asc"
    }, {
        refetchOnMountOrArgChange: true
    });


    // Safe destructuring to avoid undefined error
    const products = data?.products || [];
    const totalPages = data?.totalPages || 1;
    const totalProducts = data?.totalProducts || 0;






    // clear Filters
    const clearFilters = () => {
        setFiltersState({
            subCategory: 'all',
            sizes: 'all',
            priceRange: ''
        })
    }
    // handle Page change
    const handelPageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }

    }


    const [showContent, setShowContent] = useState(false);

    // ✅ Delay content until data is fetched + a small time buffer
    useEffect(() => {
        let timer;

        if (!isLoading && data) {
            // Delay rendering for smoother transition (e.g., 800ms)
            timer = setTimeout(() => setShowContent(true), 4000);
        } else {
            setShowContent(false);
        }

        return () => clearTimeout(timer);
    }, [isLoading, data]);



    if (!showContent) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
            <ShopPageAnimation />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
              🛒 Fetching your favorite styles...
            </p>
          </div>
        );
    }


    if (error) return <div>Error Loading Products</div>

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container dark:bg-[#1a202c] '>
                <h2 className='section__header capitalize'>Shop Page</h2>
                <p className='section__subheader'>Step into style with our Shop Page! 🛍️ Discover trendy outfits, timeless classics, and must-have accessories—all in one place for a seamless shopping experience!</p>
            </section>

            <section className='section__container dark:text-white'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* Left Side */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters} />

                    {/* Right Side */}
                    <div>
                        <h3 className='text-xl font-medium mb-4'>Showing {startProduct} to {endProduct} of {totalProducts} Products</h3>
                        <ProductsCard products={products} />

                        {/* Pagiantion controls */}
                        <div className='mt-6 flex justify-center'>
                            <button className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2' onClick={() => handelPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <button key={index} onClick={() => handelPageChange(index + 1)} className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
                                    rounded-md mx-1
                                    `}>{index + 1}</button>
                                ))
                            }
                            <button onClick={() => handelPageChange(currentPage + 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2' disabled={currentPage === totalPages}>Next</button>

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ShopPage