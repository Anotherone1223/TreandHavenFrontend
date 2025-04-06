import React from 'react'

function TextInput({ label, name, value, onChange, type = "text", placeholder }) {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 dark:text-white'>{label}</label>
            <input type={type} name={name} id={name} placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='add-product-InputCSS dark:text-black '
            />
        </div>
    )
}

export default TextInput