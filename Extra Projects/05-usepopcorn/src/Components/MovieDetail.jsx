import {useEffect, useState} from 'react';
import {Loader} from './Loader';
import {StarRating} from './StarRating';
import {OMDBURL} from './App';

export function MovieDetail({
    selectedId,
    onCloseMovieDetail,
    onAddWatched,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    function handleAddWatched() {
        movie.Runtime = Number(movie.Runtime.split(' ')[0]);
        movie.userRating = userRating;
        onAddWatched(movie);
        onCloseMovieDetail();
    }

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

    const watchedUserRating = watched.filter(
        (movie) => movie.imdbID === selectedId
    )[0]?.userRating;

    useEffect(
        function () {
            async function getMovieDeatils() {
                setIsLoading(true);
                const res = await fetch(`${OMDBURL}&i=${selectedId}`);
                const data = await res.json();
                setMovie(() => data);
                setIsLoading(false);
            }
            getMovieDeatils();
        },
        [selectedId]
    );

    useEffect(
        function () {
            if (!movie.Title) return;
            document.title = `Movie | ${movie.Title}`;
            return function () {
                document.title = 'Popcorn';
            };
        },
        [movie]
    );

    useEffect(
        function () {
            function callBack(e) {
                if (e.code === 'Escape') {
                    onCloseMovieDetail();
                }
            }
            document.addEventListener('keydown', callBack);
            return function () {
                document.removeEventListener('keydown', callBack);
            };
        },
        [onCloseMovieDetail]
    );

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button
                            className="btn-back"
                            onClick={onCloseMovieDetail}
                        >
                            x
                        </button>
                        <img src={movie.Poster} alt="Movie Poster" />
                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>
                                {movie.Released} &bull; {movie.Runtime}
                            </p>
                            <p>{movie.genre}</p>
                            <p>
                                <span className="emoji">⭐</span>
                                {movie.imdbRating} IMDB Rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {isWatched ? (
                                <p>
                                    You have rated this movie with{' '}
                                    {watchedUserRating}{' '}
                                    <span className="emoji">⭐</span>
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAddWatched}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        <p>
                            <em>{movie.Plot}</em>
                        </p>
                        <p>Starring {movie.Actors}</p>
                        <p>Directed by {movie.Director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
