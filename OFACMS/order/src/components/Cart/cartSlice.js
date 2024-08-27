import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex >= 0) {
                // Update quantity if item already exists
                state[itemIndex].quantity += action.payload.quantity;
            } else {
                // Add new item to the cart
                state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
        },
        removeFromCart: (state, action) => {
            // Remove item with specific productId
            return state.filter(item => item.productId !== action.payload);
        },
        clearCart: () => {
            // Clear the entire cart
            return [];
        },
        increaseQuantity: (state, action) => {
            const item = state.find(item => item.productId === action.payload);
            if (item) {
                item.quantity += 1; // Increase quantity by 1
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.find(item => item.productId === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1; // Decrease quantity by 1, but not below 1
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
