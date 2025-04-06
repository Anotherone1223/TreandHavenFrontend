import React, { useState } from 'react'
import ProductsCard from './ProductsCard'
// import products from '../../../src/assets/assets';
// import { products } from './../../data/products';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';



const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    // console.log(visibleProducts);

    const [filtersState, setFiltersState] = useState({
        category: 'all',
        subCategory: 'all',
        sizes: 'all',
        priceRange: ''
    })

    const { category, subCategory, sizes, priceRange } = filtersState;



    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
        subCategory: subCategory !== 'all' ? subCategory : '',
        sizes: sizes !== 'all' ? sizes : '',
    });
    // console.log(products);


    const loadmoreProducts = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
        console.log(setVisibleProducts);

    }

    return (
        <section className='section__container product__container' >
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader mb-12'> "Explore our Best Sellers, featuring customer favorites that combine style, comfort, and unmatched quality for every occasion."</p>

            {/* ProdcutCard */}
            <div className='mt-12'>
                <ProductsCard products={products.slice(0, visibleProducts)} />
            </div>

            {/* Load More Product */}
            <div className='product__btn'>
                {
                    visibleProducts < products.length && (
                        <button className='btn' onClick={loadmoreProducts}>Load More</button>
                    )
                }

            </div>


        </section>

    )
}

export default TrendingProducts