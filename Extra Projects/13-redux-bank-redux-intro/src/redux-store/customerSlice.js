import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    fullName: '',
    nationaleID: '',
    createdAt: '',
};

const customerSlice = createSlice({
    initialState: initialState,
    name: 'customer',
    reducers: {
        createCustomer: {
            prepare: function (fullName, nationaleID) {
                return {
                    payload: {
                        fullName: fullName,
                        nationaleID: nationaleID,
                        createdAt: new Date().toISOString(),
                    },
                };
            },

            reducer: function (state, action) {
                state.fullName = action.payload.fullName;
                state.nationaleID = action.payload.nationaleID;
                state.createdAt = action.payload.createdAt;
            },
        },

        updateName: {
            reducer: function (state, action) {
                state.fullName = action.payload;
            },
        },
    },
});

export const {createCustomer, updateName} = customerSlice.actions;
export default customerSlice.reducer;
