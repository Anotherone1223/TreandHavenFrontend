import { createSlice } from "@reduxjs/toolkit";

// Load address from localStorage if available
const loadUserAddress = () => {
    const storedAddress = localStorage.getItem("userAddress");
    try {
        const parsedAddress = JSON.parse(storedAddress);
        return Array.isArray(parsedAddress) ? parsedAddress : []; // Always return an array
    } catch {
        return []; // Return an empty array if JSON parsing fails
    }
};


// Load all addresses for admin
const loadAllUserAddresses = () => {
    const storedAllAddresses = localStorage.getItem("allUserAddresses");
    try {
        const parsedAllAddresses = JSON.parse(storedAllAddresses);
        return Array.isArray(parsedAllAddresses) ? parsedAllAddresses : [];
    } catch {
        return [];
    }
};

const initialState = {
    userAddress: loadUserAddress(), // Load saved address
    allUserAddresses: loadAllUserAddresses(), // Stores all addresses (for admin view)
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setUserAddress: (state, action) => {
            state.userAddress = Array.isArray(action.payload) ? action.payload : [action.payload];
            localStorage.setItem("userAddress", JSON.stringify(state.userAddress));
        },
        removeUserAddress: (state, action) => {
            state.userAddress = state.userAddress.filter((_, index) => index !== action.payload);
            localStorage.setItem("userAddress", JSON.stringify(state.userAddress));

            state.allUserAddresses = state.allUserAddresses.filter((_, index) => index !== action.payload);
            localStorage.setItem("allUserAddresses", JSON.stringify(state.allUserAddresses));
        },
        addUserAddress: (state, action) => {
            state.allUserAddresses.push(action.payload);
            localStorage.setItem("allUserAddresses", JSON.stringify(state.allUserAddresses)); // Save in localStorage
        },
    },
});

export const { setUserAddress, removeUserAddress, addUserAddress } = addressSlice.actions;
export default addressSlice.reducer;
