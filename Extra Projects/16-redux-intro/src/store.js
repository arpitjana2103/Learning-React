import {createStore} from 'redux';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case 'account/withdraw':
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
        default:
            return state;
    }
}

const store = createStore(reducer);

function deposit(amount) {
    return {
        type: 'account/deposit',
        payload: amount,
    };
}

function withdraw(amount) {
    return {
        type: 'account/withdraw',
        payload: amount,
    };
}

function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: {
            amount: amount,
            purpose: purpose,
        },
    };
}

function payLoan() {
    return {
        type: 'account/payLoan',
    };
}

store.dispatch(deposit(5000));
console.log(store.getState());

store.dispatch(withdraw(1000));
console.log(store.getState());

store.dispatch(requestLoan(2500, 'Buy a Car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
