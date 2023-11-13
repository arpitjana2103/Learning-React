import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fullName: '',
    nationaleID: '',
    createdAt: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,

    reducers: {
        createCustomer: {
            prepare: function (fullName, nationaleID) {
                return {
                    payload: {fullName, nationaleID},
                };
            },

            reducer: function (state, action) {
                state.fullName = action.payload.fullName;
                state.nationaleID = action.payload.nationaleID;
                state.createdAt = new Date().toISOString();
            },
        },

        updateName: function (state, action) {
            state.fullName = action.payload;
        },
    },
});

export const {createCustomer, updateName} = customerSlice.actions;
export default customerSlice.reducer;
