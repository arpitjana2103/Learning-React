import {configureStore} from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import customerReducer from './customerSlice';

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    },
});

export default store;
