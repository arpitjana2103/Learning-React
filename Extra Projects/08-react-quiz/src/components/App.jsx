import {useEffect, useReducer} from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
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
            };
        default:
            throw new Error('Action Unknown');
    }
}

function App() {
    const [{questions, status, index}, dispatch] = useReducer(
        reducer,
        initialState
    );
    const numQuestions = questions.length;

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
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <Questions question={questions[index]} />
                )}
            </Main>
        </div>
    );
}

export default App;
