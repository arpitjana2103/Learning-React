import {useEffect} from 'react';

function Timer({dispatch, secondsRemaining}) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    useEffect(
        function () {
            const id = setInterval(function () {
                dispatch({type: 'tick'});
            }, 1000);

            return function () {
                clearInterval(id);
            };
        },
        [dispatch]
    );
    return (
        <div className="timer">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
}

export default Timer;
