import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';
import Swal from 'sweetalert2';

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Women', value: 'women' },
    { label: 'Men', value: 'men' },
    { label: 'Kids', value: 'kids' },
]

const subCategories = [
    { label: 'Select SubCategory', value: '' },
    { label: 'Topwear', value: 'topwear' },
    { label: 'Bottomwear', value: 'bottomwear' },
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

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    const [product, setProduct] = useState({
        name: '',
        category: '',
        subCategory: '',
        price: '',
        oldPrice: '',
        description: '',
        image: '',
        sizes: []

    })


    const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id)
    // console.log(productData);

    const [newImage, setNewImage] = useState(null)

    const { name, category, subCategory, price, oldPrice, description, image: imageURL, sizes } = productData?.product || {}
    // console.log(productData?.product);

    const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation()

    useEffect(() => {
        if (productData) {
            setProduct({
                name: name || '',
                category: category || '',
                subCategory: subCategory || '',
                price: price || '',
                oldPrice: oldPrice || '',
                description: description || '',
                image: image || '',
                sizes: sizes || ''

            })
        }
    }, [productData])

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

    const handleImageChange = (image) => {
        setNewImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image,
            author: user?._id
        };

        try {
            await updateProduct({ id: id, ...updatedProduct }).unwrap();

            Swal.fire({
                title: 'Updated!',
                text: 'Product updated successfully.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            await refetch();
            navigate("/dashboard/manage-products")
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while updating the product.',
                icon: 'error'
            });
            console.error('Failed to update product:', error);
        }
    }

    if (isProductLoading) return <div>Loading....</div>
    if (fetchError) return <div>Error fetching product!...</div>

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Update Product</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
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
                    value={newImage || product.image}
                    placeholder='Image'
                    setImage={handleImageChange}
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

                    >{isUpdating ? 'Updating...' : 'Update Product'}</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateProduct