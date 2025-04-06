import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import UploadImage from './UploadImage'
import { useAddProductsMutation } from '../../../../redux/features/products/productsApi'
import ProductAdd from '../../../../components/Animations/ProductAdd'
// import { products } from './../../../../data/products';

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Women', value: 'women' },
    { label: 'Men', value: 'men' },
    { label: 'Kids', value: 'kids' },
]

const subCategories = [
    { label: 'Select SubCategory', value: '' },
    { label: 'Topwear', value: 'Topwear' },
    { label: 'Bottomwear', value: 'Bottomwear' },
    { label: 'Winterwear', value: 'Winterwear' },
]

const Sizes = [
    { label: 'Select Size', value: '' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },

]

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth)
    const [product, setProduct] = useState({
        name: '',
        category: '',
        subCategory: '',
        price: '',
        oldPrice: '',
        description: '',
        sizes: []

    })
    const [image, setImage] = useState('')

    const [AddProducts, { isLoading, error }] = useAddProductsMutation()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            sizes: checked
                ? [...prev.sizes, value] // Add if checked
                : prev.sizes.filter((size) => size !== value) // Remove if unchecked
        }));
    };

    const navigate = useNavigate()


    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.subCategory || !product.price || !product.description) {
            alert('Please fill all the required fields');
            return;
        }

        try {
            await AddProducts({ ...product, image, author: user?._id }).unwrap()


            setShowSuccess(true);

            setProduct({
                name: '',
                category: '',
                subCategory: '',
                price: '',
                oldPrice: '',
                description: '',
                sizes: []
            })
            setImage('');

            // Delay for 2 seconds before navigating
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/shop");
            }, 4000);



        } catch (error) {
            console.log("Failed to submit product", error);
        }


    }
    return (
        <>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"><Link to={'/shop'}>View All Product</Link></button>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4 dark:text-white'>
                    <TextInput
                        label="Product Name"
                        name="name"
                        placeholder="Ex: Cotton Shirt"
                        value={product.name}
                        onChange={handleChange}

                    />
                    <SelectInput
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        options={categories}
                    />
                    <SelectInput
                        label="SubCategory"
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChange}
                        options={subCategories}
                    />
                    <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-white'>Size</label>
                        <div className="flex flex-wrap gap-4">
                            {Sizes.slice(1).map((size) => ( // Skip the "Select Size" option
                                <label key={size.value} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="sizes"
                                        value={size.value}
                                        checked={product.sizes.includes(size.value)}
                                        onChange={handleSizeChange}
                                        className="form-checkbox text-indigo-600"
                                    />
                                    <span>{size.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <TextInput
                        label="Price"
                        name="price"
                        type="number"
                        placeholder="50"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="OldPrice"
                        name="oldPrice"
                        type="number"
                        placeholder="50"
                        value={product.oldPrice}
                        onChange={handleChange}
                    />

                    <UploadImage
                        name="image"
                        id="image"
                        value={e => setImage(e.target.value)}
                        placeholder='Image'
                        setImage={setImage}
                    />

                    <div>
                        <label htmlFor="description" className='block text-sm font-medium text-gray-700 dark:text-white'>Description</label>
                        <textarea name="description" id="description"
                            className='add-product-InputCSS dark:text-black'
                            value={product.description}
                            placeholder='Write a product description'
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <button type='submit'
                            className='add-product-btn'

                        >Add Product</button>
                    </div>

                </form>
            </div>

            {showSuccess && (
                <div className="flex justify-center mt-5">
                    <ProductAdd />
                </div>
            )}
        </>



    )
}

export default AddProduct