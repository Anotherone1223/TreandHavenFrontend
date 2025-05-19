import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/Category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/Shop/ShopPage";
import SingleProduct from "../pages/Shop/productDetail/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserdMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrder from "../pages/dashboard/user/UserOrder";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUsers from "../pages/dashboard/admin/user/ManageUsers";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import ShippingAddress from "../pages/Shop/ShippingAddress";
import UserAddress from "../pages/dashboard/user/UserAddress";
import TreamsAndCondition from "../components/TreamsAndCondition";
import CustomerAddress from "../pages/dashboard/admin/customerAddress/CustomerAddress";
import PaymentCancel from "../components/PaymentCancel";
import EmailVerify from "../components/EmailVerify";
// import DeliveryPanel from "../components/Order Tracking/DeliveryPanel";
// import OrderTracking from "../components/Order Tracking/OrderTracking";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/aboutus",
                element: <AboutUs />
            },
            {
                path: "/treams",
                element: <TreamsAndCondition />
            },
            {
                path: "/shippingaddress",
                element: <ShippingAddress />
            },
            {
                path: "/categories/:categoryName",
                element: <CategoryPage />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/shop",
                element: <ShopPage />
            },
            {
                path: "/shop/:id",
                element: <SingleProduct />
            },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
            {
                path: "/cancel",
                element: <PaymentCancel />
            },
            {
                path: "/orders/:orderId",
                element: <OrderDetails />
            },
            {
                path: "/verify-email/:token",
                element: <EmailVerify />
            },
            // {
            //     path: "/delivery",
            //     element: <DeliveryPanel />
            // },
            // {
            //     path: "/track",
            //     element: <OrderTracking />
            // }


        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    // dashboard routed here
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // user Dashboard
            { path: '', element: <UserdMain /> },
            { path: 'orders', element: <UserOrder /> },
            { path: 'payments', element: <UserPayments /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'reviews', element: <UserReviews /> },
            { path: 'address', element: <UserAddress /> },


            // admin Dashboard (only accessible by admin) TODO:private routes with role field
            {
                path: "admin",
                element: <PrivateRoute role="admin"><AdminDMain /></PrivateRoute>
            },
            {
                path: "add-product",
                element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>
            },
            {
                path: "manage-products",
                element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute>
            },
            {
                path: "update-product/:id",
                element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute>
            },
            {
                path: "users",
                element: <PrivateRoute role="admin"><ManageUsers /></PrivateRoute>
            },
            {
                path: "manage-orders",
                element: <PrivateRoute role="admin"><ManageOrders /></PrivateRoute>
            },
            {
                path: "customer-address",
                element: <PrivateRoute role="admin"><CustomerAddress /></PrivateRoute>
            },




        ]

    }
]);


export default router;