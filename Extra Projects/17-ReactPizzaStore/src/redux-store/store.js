import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartRecucer from './cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartRecucer,
    },
});

export default store;
