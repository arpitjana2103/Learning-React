import {useQuizes} from '../context/QuizContext';

function Progress() {
    const {index, numQuestions, points, answer, maxPossiblePoints} =
        useQuizes();
    return (
        <div className="progress">
            <progress
                max={numQuestions}
                value={index + Number(answer !== null)}
            />
            <p>
                Question <strong>{index + 1}</strong>/{numQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </div>
    );
}

export default Progress;
