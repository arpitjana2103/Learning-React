export function WatchedMovie({movie, onDeleteWatched}) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span className="emoji">⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span className="emoji">🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span className="emoji">⏳</span>
                    <span>{movie.Runtime} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}
