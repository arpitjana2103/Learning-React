import {createSlice} from '@reduxjs/toolkit';

const initailState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    initialState: initailState,
    name: 'account',
    reducers: {
        deposit: {
            reducer: function (state, action) {
                state.balance += action.payload;
                state.isLoading = false;
            },
        },

        withdraw: {
            reducer: function (state, action) {
                if (state.balance < action.payload) return;
                state.balance -= action.payload;
            },
        },

        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose},
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            },
        },

        payLoan: {
            reducer: function (state, action) {
                if (state.balance < state.loan) return;
                state.balance -= state.loan;
                state.loan = 0;
                state.loanPurpose = '';
            },
        },

        convertingCurrency: {
            reducer: function (state, action) {
                state.isLoading = true;
            },
        },
    },
});

export function deposit(amount, currency) {
    if (currency === 'USD')
        return {
            type: 'account/deposit',
            payload: amount,
        };

    return async function (dispatch, getState) {
        console.log(getState());
        // API Call
        const host = 'api.frankfurter.app';
        dispatch({type: 'account/convertingCurrency'});
        const res = await fetch(
            `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
        );
        const data = await res.json();
        const converted = data.rates.USD;

        // return action
        dispatch({
            type: 'account/deposit',
            payload: converted,
        });
    };
}

export const {withdraw, payLoan, requestLoan, convertingCurrency} =
    accountSlice.actions;

export default accountSlice.reducer;
