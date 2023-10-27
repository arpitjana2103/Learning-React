const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummery({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.Runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span className="emoji">🎬</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span className="emoji">⭐️</span>
                    <span>{avgImdbRating.toFixed(1)}</span>
                </p>
                <p>
                    <span className="emoji">🌟</span>
                    <span>{avgUserRating.toFixed(1)}</span>
                </p>
                <p>
                    <span className="emoji">⏳</span>
                    <span>{Math.floor(avgRuntime)} min</span>
                </p>
            </div>
        </div>
    );
}
