import {useEffect, useState} from 'react';

import {NavBar} from './NavBar';
import {Main} from './Main';
import {Search} from './Search';
import {NumResults} from './NumResults';
import {Box} from './Box';
import {MovieList} from './MovieList';
import {WatchedMovieList} from './WatchedMovieList';
import {WatchedSummery} from './WatchedSummery';
import {Loader} from './Loader';
import {MovieDetail} from './MovieDetail';
import {ErrorMessage} from './ErrorMessage';

const KEY = '933383e2';
export const OMDBURL = `https://www.omdbapi.com/?apikey=${KEY}`;
const tempQUERY = 'spider';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState(tempQUERY);
    const [selectedId, setSelectedId] = useState();

    function handleSteQuery(query) {
        setQuery(query);
    }

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function closeMovieDetail() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((wateched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched(function (watched) {
            setWatched(
                watched.filter(function (movie) {
                    return movie.imdbID !== id;
                })
            );
        });
    }

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(`${OMDBURL}&s=${query}`, {
                        signal: controller.signal,
                    });

                    if (!res.ok)
                        throw new Error(
                            '⛔ Something went wrong in Fetching...'
                        );

                    const data = await res.json();

                    if (data.Response === 'False')
                        throw new Error('😣 Movie Not Found.');

                    setMovies(data.Search);
                } catch (error) {
                    if (error.name !== 'AbortError') setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }
            closeMovieDetail();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={handleSteQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main movies={movies}>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <MovieList
                            onSelectMovie={handleSelectMovie}
                            movies={movies}
                        />
                    )}
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetail
                            selectedId={selectedId}
                            onCloseMovieDetail={closeMovieDetail}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummery watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
