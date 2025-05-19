import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/CartSlice'
import authApi from './features/auth/AuthApi'
import authReducer from './features/auth/authSlice'
import productsApi from './features/products/productsApi'
import reviewApi from './features/reviews/reviewsApi'
import statsApi from './features/stats/statsApi'
import orderApi from './features/orders/orderApi'
import addressReducer from './features/address/AddressSlice'



export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        address: addressReducer



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware, statsApi.middleware, orderApi.middleware),
})      