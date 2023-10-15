import {useState} from 'react';
import {WatchedSummery} from './WatchedSummery';
import {tempWatchedData} from './App';
import {WatchedMovieList} from './WatchedMovieList';

export function WatchedBox() {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? '–' : '+'}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummery watched={watched} />
                    <WatchedMovieList watched={watched} />
                </>
            )}
        </div>
    );
}
