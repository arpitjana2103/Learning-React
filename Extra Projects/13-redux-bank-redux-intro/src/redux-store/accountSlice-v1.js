const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false,
            };
        case 'account/withdraw':
            if (state.balance < action.payload) return state;
            return {
                ...state,
                balance: state.balance - action.payload,
            };
        case 'account/requestLoan': {
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        }
        case 'account/payLoan': {
            if (state.balance < state.loan) return state;
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: '',
            };
        }
        case 'account/convertingCurrency':
            return {...state, isLoading: true};
        default:
            return state;
    }
}

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

export function withdraw(amount) {
    return {
        type: 'account/withdraw',
        payload: amount,
    };
}

export function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: {
            amount: amount,
            purpose: purpose,
        },
    };
}

export function payLoan() {
    return {
        type: 'account/payLoan',
    };
}
