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
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={step}
                    onChange={(e) => setStep(+e.target.value)}
                />
                <span>Step : {step} </span>
            </div>
            <br />
            <div>
                <button onClick={plusCount}>+</button>
                <input
                    type="text"
                    value={count}
                    onChange={(e) => {
                        setCount(+e.target.value);
                    }}
                />
                <button onClick={minusCount}>-</button>
            </div>

            <p>
                {count} Days from Today is{' '}
                <span
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '0.3rem 0.4rem',
                        borderRadius: '2px',
                    }}
                >
                    {formatDate(date)}
                </span>
            </p>

            {count !== 0 || step !== 1 ? (
                <button
                    onClick={() => {
                        setCount(0);
                        setStep(1);
                    }}
                >
                    Reset
                </button>
            ) : null}
        </div>
    );
}
