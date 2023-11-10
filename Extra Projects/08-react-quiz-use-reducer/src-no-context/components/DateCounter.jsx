import {useReducer} from 'react';

const initialState = {count: 0, step: 1};

function reducer(state, action) {
    // console.log(state, action);
    switch (action.type) {
        case 'incCount':
            return {...state, count: state.count + state.step};

        case 'decCount':
            return {...state, count: state.count - state.step};

        case 'setCount':
            return {...state, count: action.payload};

        case 'setStep':
            return {...state, step: action.payLoad};

        case 'reset':
            return initialState;

        default:
            throw new Error('Unknown Action');
    }

    // if (action.type === 'incCount') return state + 1;
    // if (action.type === 'decCount') return state - 1;
    // if (action.type === 'setCount') return action.payload;
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);
    // const [count, disPatch] = useReducer(reducer, 0);

    const [state, disPatch] = useReducer(reducer, initialState);

    const {count, step} = state;

    // This mutates the date object.
    const date = new Date('june 21 2027');
    date.setDate(date.getDate() + count);

    const decCount = function () {
        disPatch({type: 'decCount'});
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const incCount = function () {
        disPatch({type: 'incCount'});
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        disPatch({type: 'setCount', payload: Number(e.target.value)});
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e) {
        disPatch({type: 'setStep', payLoad: Number(e.target.value)});
        // setStep(Number(e.target.value));
    };

    const reset = function () {
        disPatch({type: 'reset'});
        // setCount(0);
        // setStep(1);
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={decCount}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={incCount}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;
