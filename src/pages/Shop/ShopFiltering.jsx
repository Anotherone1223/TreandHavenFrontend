import React from 'react'

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className='space-y-5 flex-shrink-0 dark:text-white'>
      <h3>Filters</h3>
      {/* SubCategory */}
      <div className='flex flex-col space-y-2 '>
        <h4 className='font-medium text-lg'>subCategory</h4>
        <hr />
        {
          filters.subCategories.map((subCategory) => (
            <label key={subCategory} className='capitalize cursor-pointer'>
              <input type="radio" name='subCategory' id='subCategory' value={subCategory}
                checked={filtersState.subCategory === subCategory}
                onChange={(e) => setFiltersState({ ...filtersState, subCategory: e.target.value })}
              />
              <span className='ml-1'>{subCategory}</span>
            </label>

          ))
        }
      </div>

      {/* Sizes */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Sizes</h4>
        <hr />
        {
          filters.Sizes1.map((sizes) => (
            <label key={sizes} className='capitalize cursor-pointer'>
              <input type="radio" name='sizes' id='sizes' value={sizes}
                checked={filtersState.sizes === sizes}
                onChange={(e) => setFiltersState({ ...filtersState, sizes: e.target.value })}
              />
              <span className='ml-1'>{sizes}</span>
            </label>

          ))
        }
      </div>


      {/* Pricing */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr />
        {
          filters.PriceRanges.map((range) => (
            <label key={range.label} className='capitalize cursor-pointer'>
              <input type="radio" name='priceRange' id='priceRange'
                value={`${range.min}-${range.max}`}
                checked={filtersState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
              />
              <span className='ml-1'>{range.label}</span>
            </label>

          ))
        }
      </div>

      {/* Clear Filter */}
      <button onClick={clearFilters} className='bg-primary py-1 px-4 text-white rounded'>Clear All Filter</button>
    </div>
  )
}

export default ShopFiltering