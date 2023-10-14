import {useState} from 'react';

const message = [
    'Learn React ⚛',
    'Apply for jobs 👜',
    'Invest you new income 🤑',
];

export default function App() {
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

                    <StepMessage step={step}>{message[step - 1]}</StepMessage>

                    <div className="buttons">
                        <Button
                            textColor="#fff"
                            bgColor="#7850f2"
                            onClick={handlePrevious}
                        >
                            <span>👈</span>Previous
                        </Button>
                        <Button
                            textColor="#fff"
                            bgColor="#7850f2"
                            onClick={handleNext}
                        >
                            Next<span>👉</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

function StepMessage({step, children}) {
    return (
        <p className="message">
            Step {step}: {children}
        </p>
    );
}

function Button({textColor, bgColor, onClick, children}) {
    return (
        <button
            style={{backgroundColor: bgColor, color: textColor}}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
