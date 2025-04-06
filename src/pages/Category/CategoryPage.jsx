import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductsCard from '../Shop/ProductsCard';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const CategoryPage = () => {
    const { categoryName } = useParams();

    // Ensure first letter is capitalized (in case it's lowercase)
    const formattedCategory = categoryName
        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
        : '';

    console.log("Category from useParams:", categoryName);
    console.log("Formatted Category for API:", formattedCategory);

    // Fetch products dynamically based on category
    const { data, error, isLoading } = useFetchAllProductsQuery({
        category: formattedCategory, // Use formatted category
        subCategory: '',
        sizes: '',
        minPrice: 0,
        maxPrice: '',
        page: 1,
        limit: 10
    });

    console.log("Fetched Data:", data);

    const filteredProducts = Array.isArray(data?.products) ? data.products : [];

    // Scroll to top when category changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    return (
        <>
            <section className='section__container bg-primary-light dark:bg-[#1a202c]'>
                <h2 className='section__header capitalize'>{formattedCategory}</h2>
                <p className='section__subheader'>
                    Browse our Category Page for a seamless shopping experience! Find the latest trends in
                    men's, women's, and kids' fashion, all sorted for your convenience.
                </p>
            </section>

            {/* Products Card */}
            <div className='section__container'>
                {isLoading && <p>Loading products...</p>}
                {error && <p>Error fetching products: {error.message || "Something went wrong!"}</p>}
                {filteredProducts.length > 0 ? (
                    <ProductsCard products={filteredProducts} />
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
