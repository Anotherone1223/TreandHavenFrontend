import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/AuthApi'
import { setUser } from '../redux/features/auth/authSlice'
import LoginAnimation from './Animations/LoginAnimation'
import { setUserCart } from '../redux/features/cart/CartSlice'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Login = () => {
    const [message, setMeassge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false);

    const dispatch = useDispatch()
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()
    const navigate = useNavigate()
    // console.log(loginUser);


    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        // console.log(data);

        try {
            const response = await loginUser(data).unwrap();
            console.log(response);
            const { token, user } = response;
            dispatch(setUser({ user }))

            dispatch(setUserCart({ email: user.email }))


            setLoginSuccess(true); // Trigger animation after successful login
            setTimeout(() => {
                navigate('/');
            }, 4000);

        } catch (error) {
            setMeassge("Please provide a valid email and password")
        }

    }

    const handleLoginFailure = () => {
        console.log("Login Failed");
    };


    // Google Login Success Handler
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log('Google Login Success:', credentialResponse);

        // Send the Google token to the backend for authentication
        try {
            const response = await axios.post('http://localhost:5000/api/auth/google-login', {
                credential: credentialResponse.credential
            });

            const { token, user } = response.data;
            dispatch(setUser({ user }));
            dispatch(setUserCart({ email: user.email }));

            setLoginSuccess(true); // Trigger animation after successful login
            setTimeout(() => {
                navigate('/');
            }, 4000);
        } catch (error) {
            console.error('Google Login Error:', error);
            setMeassge('Google login failed. Please try again.');
        }
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
                                <h1 className="text-2xl font-semibold">Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
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
                                    <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>Login</button>

                                </form>
                                <p className='my-5 italic text-sm text-center'>Don't Have an Account?<Link to='/register' className='text-red-700 px-1 underline'>Register</Link>Here.</p>
                            </div>
                        </div>



                        {/* Google Login */}
                        <div className="w-full flex justify-center py-5">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleLoginFailure}
                                theme='filled_black'
                                size='large'
                                text='continue_with'
                                shape='pill'    
                            />

                        </div>

                        {/* <div className="w-full flex justify-center">
                            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div> */}

                    </div>
                </div>
            </div>

            {/* Show the success animation after login success */}
            {loginSuccess && (
                <div className="flex justify-center mt-5">
                    <LoginAnimation
                        src="https://lottie.host/f6528067-7645-492d-9e44-9b4df136146f/di9BSVr0LZ.lottie"
                        height="700px"
                        width="700px"
                        loop={false}
                        autoplay={true}
                    />
                </div>
            )}
        </>
    )
}

export default Login


