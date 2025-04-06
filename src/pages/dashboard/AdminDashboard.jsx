import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/AuthApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/add-product', label: 'Add Product' },
    { path: '/dashboard/manage-products', label: 'Manage Products' },
    { path: '/dashboard/users', label: 'Users' },
    { path: '/dashboard/manage-orders', label: 'Manage Orders' },
    { path: '/dashboard/customer-address', label: 'Customer address' },

]

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error("Failed to log out", error)
        }

    }
    return (
        <div className='space-y-5 bg-white dark:bg-[#1a202c] p-8 md:h-screen flex flex-col justify-between'>
            <div>
                <div className='nav__logo'>
                    <Link to="/">TreandHaven<span>.</span></Link>
                    <p className='text-xs italic'>Admin dashboard</p>
                </div>
                <hr className='mt-5' />
                <ul className='space-y-5 pt-5'>
                    {
                        navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    className={
                                        ({ isActive }) => isActive ? "text-blue-600 font-bold" : 'text-black dark:text-white'}
                                    end
                                    to={item.path}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className='mb-3'>
                <hr className='mb-3' />
                <button
                    onClick={handleLogout}
                    className='text-white bg-primary font-medium px-5 py-1 rounded-sm'>Logout</button>
            </div>
        </div>
    )
}

export default AdminDashboard