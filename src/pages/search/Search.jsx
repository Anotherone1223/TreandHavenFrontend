import React, { useEffect, useState } from 'react'
import { products } from '../../data/products';
import ProductsCard from '../Shop/ProductsCard';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
// import { data } from 'react-router-dom';

// const filters = {
//   catrgoryies: ['Women', 'Men', 'Kids'],
//   subCategories: ['Topwear', 'Bottomwear', 'Winterwear'],
//   Sizes1: ['S', 'M', 'L', 'XL', 'XXL'],
//   PriceRanges: [
//     { label: 'Under ₹100', min: 0, max: 100 },
//     { label: '₹100 - ₹200', min: 100, max: 200 },
//     { label: '₹300 - ₹400', min: 300, max: 400 },
//     { label: '₹500 and above', min: 500, max: Infinity },

//   ]

// }

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filtersState, setFiltersState] = useState({
    category: 'all',
    subCategory: 'all',
    sizes: 'all',
    priceRange: ''
  })

  const { category, subCategory, sizes, priceRange } = filtersState;
  // const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    subCategory: subCategory !== 'all' ? subCategory : '',
    sizes: sizes !== 'all' ? sizes : '',
  })
  console.log(products);




  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filterd = products.filter(product => product.name.toLowerCase().includes
      (query) || product.description.toLowerCase().includes(query));
    setFilteredProducts(filterd)

  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery, products])



  return (
    <>
      <section className='section__container bg-primary-light dark:bg-[#1a202c]'>
        <h2 className='section__header capitalize'>Search Products</h2>
        <p className='section__subheader'>Browse our Category Page for a seamless shopping experience! Find the latest trends in men's, women's, and kids' fashion, all sorted for your convenience</p>
      </section>

      <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
          <input type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-bar w-full max-w-4xl p-2 border rounded'
            placeholder='Search for products....'
          />

          <button
            onClick={handleSearch}
            className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
          >
            Search
          </button>
        </div>

        <ProductsCard products={filteredProducts} />

      </section>
    </>
  )
}

export default Search