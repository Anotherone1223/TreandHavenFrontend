import React from 'react'

const SelectInput = ({ label, name, value, onChange, options, multiple }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 dark:text-white'>{label}</label>
            <select name={name} id={name}
                value={value}
                onChange={onChange}
                // multiple={multiple}
                className='add-product-InputCSS dark:text-black'
            >
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectInput