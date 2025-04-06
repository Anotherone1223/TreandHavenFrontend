import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../redux/features/auth/AuthApi'
import RegisterAnimation from './Animations/RegisterAnimation'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'


const Register = () => {
    const [message, setMeassge] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginSuccess, setLoginSuccess] = useState(false);


    const [registerUser, { isLoading }] = useRegisterUserMutation()
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        }
        console.log(data);

        try {
            await registerUser(data).unwrap()
            setLoginSuccess(true); // Trigger animation after successful login
            setTimeout(() => {
                navigate('/');
            }, 3000);
            // navigate("/login")
        } catch (error) {
            setMeassge("Registration Failed")
        }

    }


    // Handle Google registration
    const handleGoogleSuccess = async (response) => {
        const { credential } = response;  // Google token (credential)

        try {
            // Send the Google token to your backend API for registration
            const responseData = await axios.post('http://localhost:5000/api/auth/google-register', {
                credential
            });

            // On successful registration, store the token and user info
            const { token, user } = responseData.data;

            // Store the token and user info (can use localStorage or state management)
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Show success animation
            setLoginSuccess(true);

            // Navigate to the home page or dashboard after a short delay
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error("Google Registration Error:", error);
            setMeassge("Registration Failed");
        }
    };

    const handleGoogleFailure = () => {
        console.log("Google login failed");
        setMeassge("Google login failed. Try again.");
    };
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Register</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
                                    <input type="text" name='username' id='username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Username' required
                                        className='w-full bg-gray-100 focus-within:outline-none px-5 py-3' />

                                    <input type="email" name='email' id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Email Address' required
                                        className='w-full bg-gray-100 focus-within:outline-none px-5 py-3' />

                                    <input type="password" name='password' id='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password' required
                                        className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
                                    {
                                        message && <p className='text-red-500'>{message}</p>
                                    }
                                    <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>Register</button>

                                </form>
                                <p className='my-5 italic text-sm text-center'>Already Have an Account?<Link to='/login' className='text-red-700 px-1 underline'>Login</Link>Here.</p>
                            </div>
                        </div>
                        {/* Google Register Button */}
                        <div className="w-full flex justify-center mt-5">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess} // Handle success after Google login
                                onError={handleGoogleFailure} // Handle failure after Google login
                                theme='filled_black'
                                size='large'
                                text='continue_with'
                                shape='pill' 
                            />
                        </div>
                        

                    </div>
                </div>
            </div>
            {/* Show the success animation after login success */}
            {loginSuccess && (
                <div className="flex justify-center mt-5">
                    <RegisterAnimation
                        src="https://lottie.host/469551af-1ff5-4600-b122-1506be45d14b/P6FA1mT4NJ.lottie"
                        background="transparent"
                        style="width: 300px; height: 300px"
                        loop={false}
                        autoplay={true}
                    />
                </div>
            )}
        </>
    )
}

export default Register

{/* <section className='h-screen flex items-center justify-center'>
<div className='max-h-sm border shadow bg-white mx-auto p-8'>
    <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
    <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
        <input type="text" name='username' id='username'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username' required
            className='w-full bg-gray-100 focus-within:outline-none px-5 py-3' />

        <input type="email" name='email' id='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address' required
            className='w-full bg-gray-100 focus-within:outline-none px-5 py-3' />

        <input type="password" name='password' id='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password' required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
        {
            message && <p className='text-red-500'>{message}</p>
        }
        <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>Register</button>

    </form>
    <p className='my-5 italic text-sm text-center'>Already Have an Account?<Link to='/login' className='text-red-700 px-1 underline'>Login</Link>Here.</p>

</div>

</section> */}