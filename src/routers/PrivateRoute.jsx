import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setLocalUser(storedUser);
    }, [user]);

    if (!localUser) {
        Swal.fire({
            icon: 'warning',
            title: 'Login Required',
            text: 'You must be logged in to access this page!',
            confirmButtonText: 'OK'
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && localUser.role !== role) {
        Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not authorized to access this page!',
            confirmButtonText: 'OK'
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default PrivateRoute