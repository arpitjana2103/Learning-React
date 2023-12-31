import {useQuizes} from '../context/QuizContext';

function NextButton() {
    const {dispatch, answer, index, numQuestions} = useQuizes();
    if (answer === null) return;
    if (index + 1 < numQuestions)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: 'nextQuestion'})}
            >
                Next
            </button>
        );
    else if (index + 1 === numQuestions) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: 'finish'})}
            >
                Finish
            </button>
        );
    }
}

export default NextButton;
