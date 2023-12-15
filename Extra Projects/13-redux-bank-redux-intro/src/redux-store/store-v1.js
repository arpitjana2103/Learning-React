import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import accountReducer from './accountSlice';
import customerReducer from './customerSlice';

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
