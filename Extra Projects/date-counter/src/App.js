import {useState} from 'react';
import './styles.css';

export default function App() {
    return (
        <div className="App">
            <Counter />
        </div>
    );
}

function Counter() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);
    const [date, setDate] = useState(Date.now());

    function formatDate(miliSec) {
        return new Date(miliSec).toDateString(miliSec);
    }

    function plusStep() {
        setStep((s) => s + 1);
    }

    function minusStep() {
        if (step === 1) return;
        setStep((s) => s - 1);
    }

    function plusCount() {
        setCount((c) => c + step);
        setDate((d) => d + step * 24 * 60 * 60 * 1000);
    }

    function minusCount() {
        setCount((c) => c - step);
        setDate((d) => d - step * 24 * 60 * 60 * 1000);
    }

    return (
        <div>
            <div>
                <button onClick={plusStep}>+</button>
                <span> Step : {step} </span>
                <button onClick={minusStep}>-</button>
            </div>
            <br />
            <div>
                <button onClick={plusCount}>+</button>
                <span> count : {count} </span>
                <button onClick={minusCount}>-</button>
            </div>

            <p>
                {count} Days from today is ~ {formatDate(date)}
            </p>
        </div>
    );
}
