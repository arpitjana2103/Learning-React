import {createContext, useContext, useReducer} from 'react';
import {useEffect} from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTON = 30;

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            };
        case 'start':
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECS_PER_QUESTON,
            };
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highScore: Math.max(state.points, state.highScore),
            };
        case 'reset':
            return {
                ...initialState,
                status: 'ready',
                questions: state.questions,
            };
        case 'newAnswer':
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? 'finished' : state.status,
            };

        default:
            throw new Error('Action Unknown');
    }
}

function QuizProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
    } = state;
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(function (prev, curr) {
        return prev + curr.points;
    }, 0);

    useEffect(function () {
        fetch('http://localhost:8000/questions')
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                dispatch({type: 'dataReceived', payload: data});
            })
            .catch(function (error) {
                dispatch({type: 'dataFailed'});
            });
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions: questions,
                question: questions[index],
                status: status,
                index: index,
                answer: answer,
                points: points,
                highScore: highScore,
                secondsRemaining: secondsRemaining,
                numQuestions: numQuestions,
                maxPossiblePoints: maxPossiblePoints,
                dispatch: dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuizes() {
    const context = useContext(QuizContext);

    if (context === undefined)
        throw new Error('QuizContext was use outside the QuizProvider');

    return context;
}

export {QuizProvider, useQuizes};
