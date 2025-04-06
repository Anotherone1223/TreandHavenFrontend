import { createSlice } from '@reduxjs/toolkit'
import { products } from './../../../data/products';

const loadCartFromLocalStorage = (email) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.email) return { products: [], userEmail: null };

        const savedCart = localStorage.getItem(`cart_${user.email}`);
        return {
            products: savedCart ? JSON.parse(savedCart) : [],
            userEmail: user.email,
        };
    } catch (error) {
        return { products: [], userEmail: null };
    }
};

const saveCartToLocalStorage = (state) => {
    if (state.userEmail) {
        localStorage.setItem(`cart_${state.userEmail}`, JSON.stringify(state.products));
    }
};



const loadedCart = loadCartFromLocalStorage();

//  utilities functions

const setSelectedItems = (state) => {
    return state.products?.reduce((total, product) => total + (product.quantity || 0), 0) || 0;
};

const setTotalPrice = (state) => {
    return state.products?.reduce((total, product) => total + (product.quantity * product.price || 0), 0) || 0;
};

// const setTax = (state) => {
//     const totalPrice = setTotalPrice(state);
//     const taxRate = state.taxRate || 0.05; // Ensure taxRate is always defined
//     return totalPrice * taxRate;
// };

// const setGrandTotal = (state) => {
//     const totalPrice = setTotalPrice(state);
//     const tax = setTax(state);
//     return isNaN(totalPrice) || isNaN(tax) ? 0 : totalPrice + tax;
// };



const initialState = {
    ...loadedCart,
    selectedItems: setSelectedItems(loadedCart),
    totalPrice: setTotalPrice(loadedCart),
    // taxRate: 0.05, // 5% tax rate
    // tax: setTax(loadedCart),
    // grandTotal: setGrandTotal(loadedCart),
};

// const initialState = {
//     ...loadCartFromLocalStorage(),
//     selectedItems: 0,
//     totalPrice: 0,
//     tax: 0,
//     taxRate: 0.05,
//     grandTotal: 0,
//     // userEmail: null,
// }

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserCart: (state, action) => {
            state.userEmail = action.payload.email;

            // state.products = loadCartFromLocalStorage().products;

            const loadedCart = loadCartFromLocalStorage(); // Load the cart
            state.products = loadedCart.products; // Assign loaded products


            // Recalculate cart values
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            // state.tax = setTax(state);
            // state.grandTotal = setGrandTotal(state);


        },
        addToCart: (state, action) => {


            const isExist = state.products.find((product) => product._id === action.payload._id);

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
                console.log({ ...action });

            } else {
                console.log("item is already exists");

            }
            state.selectedItems = setSelectedItems(state)
            state.totalPrice = setTotalPrice(state)
            // state.tax = setTax(state)
            // state.grandTotal = setGrandTotal(state)
            saveCartToLocalStorage(state);

        },
        updateQuantity: (state, action) => {
            const products = state.products.map((product) => {
                if (product._id === action.payload.id) {
                    if (action.payload.type === 'INCREMENT') {
                        product.quantity += 1
                    } else if (action.payload.type === 'DECREMENT') {
                        if (product.quantity > 0) {
                            product.quantity -= 1;
                        }

                        if (product.quantity === 0) {
                            return null; // Mark this product for removal
                        }
                    }
                }
                return product;

            }).filter((product) => product !== null)
            state.products = products;
            state.selectedItems = setSelectedItems(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)


        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload.id);

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            // state.tax = setTax(state);
            // state.grandTotal = setGrandTotal(state);
            saveCartToLocalStorage(state);

        },
        clearCart: (state) => {
            state.products = []
            state.selectedItems = 0
            state.totalPrice = 0
            // state.tax = 0
            // state.grandTotal = 0
            saveCartToLocalStorage(state);
        }
    }
})



export const { addToCart, updateQuantity, removeFromCart, clearCart, setUserCart } = CartSlice.actions
// console.log(CartSlice);


export default CartSlice.reducer;
