import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditProfileMutation } from '../../../redux/features/auth/AuthApi';
import avatarImg from '../../../../public/assets1/avatar.png'
import { setUser } from '../../../redux/features/auth/authSlice';
import { Edit3, MapPin, Briefcase, Mail, Link2, X, Camera, User } from 'lucide-react';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [editProfile, { isLoading, isError, error, isSuccess }] = useEditProfileMutation()

    const [formData, setformData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        profession: '',
        userId: '',
        location: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setformData({
                username: user?.username || '',
                profileImage: user?.profileImage || '',
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId: user?._id || '',
                location: user?.location || ''
            })
        }
    }, [user])

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            username: formData.username,
            profileImage: formData.profileImage,
            bio: formData.bio,
            profession: formData.profession,
            userId: formData.userId,
            location: formData.location
        }
        try {
            const response = await editProfile(updatedUser).unwrap();
            console.log(response)
            dispatch(setUser(response.user));
            localStorage.setItem('user', JSON.stringify(response.user))
            window.location.reload();
             Swal.fire({
                            title: 'Updated!',
                            text: 'Profile updated successfully.',
                            icon: 'success',
                            timer: 2500,
                            showConfirmButton: false
                        });
        } catch (error) {
            console.error("Failed to update profile", error);
            Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong while updating the product.',
                            icon: 'error'
                        });
        }

        setIsModalOpen(false)
    }
    return (
        
        < div className="min-h-screen bg-gray-50 dark:bg-gray-900" >
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    <div className="px-8 pb-8">
                        <div className="relative flex items-end -mt-20 mb-4">
                            <div className="relative">
                                <img
                                    src={formData?.profileImage || avatarImg}
                                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                                />
                                {/* <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
                                    <Camera size={16} />
                                </button> */}
                            </div>

                            <div className="ml-6 flex-1">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {formData?.username || 'N/A'}
                                    </h1>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                                        >
                                        <Edit3 size={16} className="mr-2" />
                                        Edit Profile
                                    </button>
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    {formData.profession || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p className="flex items-center">
                                    <Briefcase size={18} className="mr-2 text-blue-500" />
                                    {formData.profession || 'N/A'}
                                </p>
                                <p className="flex items-center">
                                    <MapPin size={18} className="mr-2 text-blue-500" />
                                    {formData.location || 'N/A'}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    About
                                </h3>
                                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                                    {formData.bio || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-2xl mx-4 rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                Edit Profile
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label htmlFor="username" className='block text-sm font-medium text-gray-700 dark:text-white'>Username</label>
                                    <input type="text" name='username' value={formData?.username}
                                        onChange={handleChange}
                                        placeholder='username'
                                        className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700 dark:text-white'>Profile Image Url</label>
                                    <input type="text" name='profileImage' value={formData?.profileImage}
                                        onChange={handleChange}
                                        placeholder='profileImage url'
                                        className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="location" className='block text-sm font-medium text-gray-700 dark:text-white'>Location</label>
                                    <input type="text" name='location' value={formData?.location}
                                        onChange={handleChange}
                                        placeholder='location'
                                        className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="bio" className='block text-sm font-medium text-gray-700 dark:text-white'>Write Your Bio</label>
                                    <textarea name="bio"
                                        row="3"
                                        className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                        value={formData?.bio}
                                        onChange={handleChange}
                                        placeholder='add your bio'
                                    ></textarea>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="profession" className='block text-sm font-medium text-gray-700 dark:text-white'>Profession</label>
                                    <input type="text" name='profession' value={formData?.profession}
                                        onChange={handleChange}
                                        placeholder='profession'
                                        className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <button className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    type='submit'
                                    disabled={isLoading}
                                >{isLoading ? 'Saving...' : 'Save Changes'}</button>
                                {/* <button type='submit'>Save changes</button> */}
                                {isError && <p className='mt-2 text-red-500'>Failed to update profile. Please try again</p>}
                                {isSuccess && <p className='mt-2 text-green-500'>Profile updated successfully!</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </ div>
    )
}

export default UserProfile




// className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                        // <div className='container mx-auto p-6 '>
                                        //     <div className='bg-white dark:bg-[#1a202c]  shadow-xl dark:shadow-blue-500/50 rounded-lg p-6'>
                                        //         <div className='flex items-center  mb-4'>
                                        //             <img src={formData?.profileImage || avatarImg} alt="" className='w-32 h-32 object-cover rounded-full' />
                                        //             <div className='ml-6'>
                                        //                 <h3 className='text-2xl font-semibold '>Username: {formData?.username || 'N/A'}</h3>
                                        //                 <p className='text-gray-700 dark:text-white'>User Bio: {formData.bio || 'N/A'}</p>
                                        //                 <p className='text-gray-700 dark:text-white'>Profession: {formData.profession || 'N/A'}</p>
                                        //             </div>
                                        //             <button
                                        //                 onClick={() => setIsModalOpen(true)}
                                        //                 className='ml-auto text-blue-500 hover:text-blue-700'>
                                        //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h7m2 0h7a1 1 0 001-1V4a1 1 0 00-1-1h-7m-2 0v14"></path>
                                        //                 </svg>
                                        //             </button>
                                
                                        //         </div>
                                        //     </div>
                                
                                        //     {/* show modal */}
                                        //     {
                                        //         isModalOpen && (
                                        //             <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'>
                                        //                 <div className='bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative'>
                                        //                     <button
                                        //                         onClick={() => setIsModalOpen(false)}
                                        //                         className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'><i className="ri-close-line size-8 p-2 bg-black rounded-full"></i></button>
                                        //                     <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>
                                        //                     <form onSubmit={handleSubmit}>
                                        //                         <div className='mb-4'>
                                        //                             <label htmlFor="username" className='block text-sm font-medium text-gray-700 '>Username</label>
                                        //                             <input type="text" name='username' value={formData?.username}
                                        //                                 onChange={handleChange}
                                        //                                 placeholder='username'
                                        //                                 className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        //                                 required
                                        //                             />
                                        //                         </div>
                                        //                         <div className='mb-4'>
                                        //                             <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700 '>Profile Image Url</label>
                                        //                             <input type="text" name='profileImage' value={formData?.profileImage}
                                        //                                 onChange={handleChange}
                                        //                                 placeholder='profileImage url'
                                        //                                 className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        //                                 required
                                        //                             />
                                        //                         </div>
                                        //                         <div className='mb-4'>
                                        //                             <label htmlFor="bio" className='block text-sm font-medium text-gray-700 '>Write Your Bio</label>
                                        //                             <textarea name="bio"
                                        //                                 row="3"
                                        //                                 className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        //                                 value={formData?.bio}
                                        //                                 onChange={handleChange}
                                        //                                 placeholder='add your bio'
                                        //                             ></textarea>
                                        //                         </div>
                                        //                         <div className='mb-4'>
                                        //                             <label htmlFor="profession" className='block text-sm font-medium text-gray-700 '>Profession</label>
                                        //                             <input type="text" name='profession' value={formData?.profession}
                                        //                                 onChange={handleChange}
                                        //                                 placeholder='profession'
                                        //                                 className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                                        //                                 required
                                        //                             />
                                        //                         </div>
                                        //                         <button className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        //                             type='submit'
                                        //                             disabled={isLoading}
                                        //                         >{isLoading ? 'Saving...' : 'Save Changes'}</button>
                                        //                         {isError && <p className='mt-2 text-red-500'>Failed to update profile. Please try again</p>}
                                        //                         {isSuccess && <p className='mt-2 text-green-500'>Profile updated successfully!</p>}
                                        //                     </form>
                                        //                 </div>
                                        //             </div>
                                        //         )
                                        //     }
                                        // </div>