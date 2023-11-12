const initialStateCustomer = {
    fullName: '',
    nationaleID: '',
    createdAt: '',
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationaleID) {
    return {
        type: 'customer/createCustomer',
        payload: {
            fullName: fullName,
            nationaleID: nationaleID,
            createdAt: new Date().toISOString(),
        },
    };
}

export function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName,
    };
}
