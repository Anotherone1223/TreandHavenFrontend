import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModel from '../pages/Shop/CartModel'
import { products } from './../data/products';
import avatarImg from '../../public/assets1/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/AuthApi';
import { logout } from '../redux/features/auth/authSlice';
import LightandDarkMode from './Mode/LightandDarkMode';
import { clearCart } from '../redux/features/cart/CartSlice';



const Navbar = () => {

    const products = useSelector((state) => state.cart.products)
    const [isCartOpen, setisCartOpen] = useState(false)

    const handleCartToggle = () => {
        setisCartOpen(!isCartOpen)
    }

    // show if user Logged in
    const dispatch = useDispatch()       // auth slice name   
    const { user } = useSelector((state) => state.auth)
    console.log(user);

    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate()


    // dropdown menus
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen)
    }

    const adminDropDownMenus = [
        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Manage Items", path: "/dashboard/manage-products" },
        { label: "All Orders", path: "/dashboard/manage-orders" },
        { label: "Add New Product", path: "/dashboard/add-product" },

    ]

    const userDropDownMenus = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Profile", path: "/dashboard/profile" },
        { label: "Payments", path: "/dashboard/payments" },
        { label: "Orders", path: "/dashboard/orders" },
    ]

    const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            // dispatch(clearCart());
            navigate('/login')
        } catch (error) {
            console.error("Faild to logout", error);

        }
    }
    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                <ul className='nav__links'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/shop">Shop</Link></li>
                    <li className='link'><Link to="/contact">contact</Link></li>
                    <li className='link'><Link to="/aboutus">About Us </Link></li>
                </ul>
                {/* Logo */}
                <div className='nav__logo'>
                    <Link to="/">TreandHaven <span>.</span></Link>

                </div>

                {/* Nav Icons */}
                <div className='nav__icons relative'>
                    <span>
                        <Link to='/search'><i className="ri-search-line"></i></Link>
                    </span>


                    <span className='hover:text-primary'>
                        <button onClick={handleCartToggle} to='/search'>
                            <i className="ri-shopping-bag-line dark:text-white"></i>
                            <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>

                        </button>
                    </span>
                    {/* 
                    <ThemeProvider>
                        
                        <LightandDarkMode />

                    </ThemeProvider> */}

                    <div className="flex justify-between items-center bg-white dark:bg-gray-900">
                        {/* <h1 className="text-2xl font-bold text-black dark:text-white">Logo</h1> */}
                        <LightandDarkMode />
                    </div>

                    <span>
                        {
                            user && user ? (<>
                                <img
                                    onClick={handleDropDownToggle}
                                    src={user?.profileImage || avatarImg} className='size-6 rounded-full cursor-pointer' alt="" />

                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-[#1a202c]'>
                                            <ul className='font-medium space-y-4 p-2'>
                                                {
                                                    dropdownMenus.map((menu, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                onClick={() => setIsDropDownOpen(flase)}
                                                                className='dropdown-items' to={menu.path}>{menu.label}</Link>

                                                        </li>
                                                    ))
                                                }
                                                <li>  <Link to='/login' onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </>) : (<Link to='/login'><i className="ri-user-line"></i></Link>)
                        }

                    </span>

                </div>
            </nav >

            {
                isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
            }
        </header >
    )
}

export default Navbar