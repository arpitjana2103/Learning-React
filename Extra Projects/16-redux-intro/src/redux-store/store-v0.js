import {combineReducers, createStore} from 'redux';

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

const initialStateCustomer = {
    fullName: '',
    nationaleID: '',
    createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationaleID: action.payload.nationaleID,
                createdAt: action.payload.createdAt,
            };

        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload,
            };

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(rootReducer);

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

function createCustomer(fullName, nationaleID) {
    return {
        type: 'customer/createCustomer',
        payload: {
            fullName: fullName,
            nationaleID: nationaleID,
            createdAt: new Date().toISOString(),
        },
    };
}

function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName,
    };
}

store.dispatch(deposit(5000));
console.log(store.getState());

store.dispatch(withdraw(1000));
console.log(store.getState());

store.dispatch(requestLoan(2500, 'Buy a car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer('Arpit Jana', '12356978'));
console.log(store.getState());

store.dispatch(updateName('Sankar Jana'));
console.log(store.getState());
