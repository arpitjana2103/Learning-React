import {useState} from 'react';

const message = [
    'Learn React ⚛',
    'Apply for jobs 👜',
    'Invest you new income 🤑',
];

function App() {
    const [step, setStep] = useState(1);

    const [isOpen, setIsOpen] = useState(true);

    function handlePrevious() {
        if (step === 1) return;
        setStep((s) => s - 1);
    }

    function handleNext() {
        if (step === message.length) return;
        setStep((s) => s + 1);
    }

    return (
        <>
            <button className="close" onClick={() => setIsOpen((is) => !is)}>
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
                        <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
                        <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
                    </div>
                    <p className="message">Hello</p>
                    <p className="message">
                        Step {step}: {message[step - 1]}
                    </p>
                    <div className="buttons">
                        <button
                            style={{backgroundColor: '#7850f2', color: '#fff'}}
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>
                        <button
                            style={{backgroundColor: '#7850f2', color: '#fff'}}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
